import * as React from "react";
import styles from "./CopilotChatTab.module.scss";

export interface IReferenceItem {
  url: string;
  label: string;
  domain: string;
  citationNumber?: number;
  occurrences: number;
}

interface IReferencesBlockProps {
  text: string;
}

export default class ReferencesBlock extends React.Component<IReferencesBlockProps> {
  public static extractReferences(text: string): IReferenceItem[] {
    if (!text) return [];

    const referencesByUrl = new Map<string, IReferenceItem>();

    const normalizeUrl = (raw: string): string =>
      raw
        .trim()
        .replace(/[),.;:!?]+$/g, "")
        .replace(/^<|>$/g, "");

    const getDomain = (rawUrl: string): string => {
      try {
        return new URL(rawUrl).hostname.replace(/^www\./, "");
      } catch {
        return "unknown source";
      }
    };

    const getDefaultLabel = (rawUrl: string): string => {
      try {
        const urlObj = new URL(rawUrl);
        const path = decodeURIComponent(urlObj.pathname || "")
          .split("/")
          .filter(Boolean);
        return path.length > 0 ? path[path.length - 1] : urlObj.hostname;
      } catch {
        return rawUrl;
      }
    };

    const addReference = (
      rawUrl: string,
      label?: string,
      citationNumber?: number,
    ): void => {
      const normalized = normalizeUrl(rawUrl);
      if (!normalized) return;

      const existing = referencesByUrl.get(normalized);
      if (existing) {
        existing.occurrences += 1;
        if (label && !/^\d+$/.test(label.trim())) {
          existing.label = label.trim();
        }
        if (
          citationNumber !== undefined &&
          (existing.citationNumber === undefined ||
            citationNumber < existing.citationNumber)
        ) {
          existing.citationNumber = citationNumber;
        }
        return;
      }

      const labelTrimmed = label?.trim();
      const resolvedLabel =
        labelTrimmed && !/^\d+$/.test(labelTrimmed)
          ? labelTrimmed
          : getDefaultLabel(normalized);

      referencesByUrl.set(normalized, {
        url: normalized,
        label: resolvedLabel || normalized,
        domain: getDomain(normalized),
        citationNumber,
        occurrences: 1,
      });
    };

    // Match numeric citations like [1](url)
    const numericCitationRegex = /\[(\d+)\]\((https?:\/\/[^\s)]+)\)/g;
    let numericCitationMatch: RegExpExecArray | null;
    while ((numericCitationMatch = numericCitationRegex.exec(text)) !== null) {
      addReference(
        numericCitationMatch[2],
        numericCitationMatch[1],
        parseInt(numericCitationMatch[1], 10),
      );
    }

    // Match named markdown links like [label](url)
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    let markdownMatch: RegExpExecArray | null;
    while ((markdownMatch = markdownLinkRegex.exec(text)) !== null) {
      const label = markdownMatch[1];
      if (!/^\d+$/.test(label.trim())) {
        addReference(markdownMatch[2], label);
      }
    }

    // Match bare URLs
    const bareUrlRegex = /https?:\/\/[^\s<>()]+/g;
    let bareUrlMatch: RegExpExecArray | null;
    while ((bareUrlMatch = bareUrlRegex.exec(text)) !== null) {
      addReference(bareUrlMatch[0]);
    }

    const references = Array.from(referencesByUrl.values());
    references.sort((a, b) => {
      if (a.citationNumber !== undefined && b.citationNumber !== undefined) {
        return a.citationNumber - b.citationNumber;
      }
      if (a.citationNumber !== undefined) return -1;
      if (b.citationNumber !== undefined) return 1;
      return a.label.localeCompare(b.label);
    });

    return references;
  }

  public render(): React.ReactElement {
    const references = ReferencesBlock.extractReferences(this.props.text);

    if (references.length === 0) return <></>;

    return (
      <div className={styles.referencesBlock}>
        <div className={styles.referencesTitle}>References</div>
        <ol className={styles.referencesList}>
          {references.map((ref, refIndex) => (
            <li key={`${ref.url}-${refIndex}`}>
              <div className={styles.referenceRow}>
                <span className={styles.referenceBadge}>
                  {ref.citationNumber !== undefined
                    ? `[${ref.citationNumber}]`
                    : "SRC"}
                </span>
                <div>
                  <a href={ref.url} target="_blank" rel="noreferrer noopener">
                    {ref.label}
                  </a>
                  <div className={styles.referenceMeta}>
                    {ref.domain}
                    {ref.occurrences > 1
                      ? ` • cited ${ref.occurrences} times`
                      : ""}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
