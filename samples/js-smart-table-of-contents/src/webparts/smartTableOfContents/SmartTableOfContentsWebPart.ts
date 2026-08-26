import { Version } from "@microsoft/sp-core-library";
import {
  PropertyPaneTextField,
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneCheckbox,
  PropertyPaneToggle,
  PropertyPaneSlider,
} from "@microsoft/sp-webpart-base";

import styles from "./SmartTableOfContentsWebPart.module.scss";

export interface ISmartTableOfContentsWebPartProps {
  title: string;
  maxHeadingLevel: number;
  includeH1: boolean;
  sticky: boolean;
  showNumbers: boolean;
  showReadingTime: boolean;
  showEmptyMessage: boolean;
  scrollOffset: number;
  showSearchFilter: boolean;
}

interface IHeadingItem {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
  numberPath: number[];
  parentId?: string;
  slug: string;
}

export default class SmartTableOfContentsWebPart extends BaseClientSideWebPart<ISmartTableOfContentsWebPartProps> {
  private _headingIdPrefix: string = `smart-toc-${Date.now().toString(36)}-${Math.floor(Math.random() * 100000).toString(36)}`;
  private _headings: IHeadingItem[] = [];
  private _observer?: IntersectionObserver;
  private _isRendering: boolean = false;
  private _tocClickHandler?: EventListener;
  private _tocFocusInHandler?: EventListener;
  private _tocFocusOutHandler?: EventListener;
  private _tocSearchHandler?: EventListener;
  private _pageObserver?: MutationObserver;
  private _refreshTimeout?: number;
  private _lastHeadingSignature: string = "";
  public render(): void {
    if (this._isRendering) {
      return;
    }

    this._isRendering = true;

    try {
      this._disconnectObserver();
      this._unbindEvents();

      this._headings = this._collectHeadings();
      this._lastHeadingSignature = this._getHeadingSignature();
      const defaultActiveId =
        this._headings.length > 0 ? this._headings[0].id : "";

      const tocHtml =
        this._headings.length > 0
          ? this._renderHeadings(defaultActiveId)
          : this.properties.showEmptyMessage
            ? `<div class="${styles.emptyMessage}">No headings found on this page.</div>`
            : "";

      const drawerMode = this.properties.sticky;
      const metadataHtml = this.properties.showReadingTime
        ? `<div class="${styles.metadata}">${this._getMetadataText()}</div>`
        : "";
      const searchHtml = this.properties.showSearchFilter
        ? `<input class="${styles.searchBox}" id="tocSearchBox" type="search" placeholder="Search headings..." aria-label="Search headings" />`
        : "";

      this.domElement.innerHTML = `
  <div class="${styles.smartTocWrapper}">
    ${
      drawerMode
        ? `
      <button class="${styles.floatingButton}" id="tocOpenButton" aria-label="Open Table of Contents" type="button">
        ☰
      </button>
    `
        : ""
    }

    <div class="${styles.smartToc} ${drawerMode ? styles.drawer : ""}" id="tocDrawer">
      <div class="${styles.header}">
        <div class="${styles.headerTopRow}">
          <div class="${styles.title}">
            ${this.properties.title || "Contents"}
          </div>

          ${
            drawerMode
              ? `
            <button class="${styles.nativeClose}" id="tocCloseButton" aria-label="Close Table of Contents" type="button">
              ×
            </button>
          `
              : ""
          }
        </div>

        ${metadataHtml}
        ${searchHtml}
      </div>

      <div class="${styles.tocList}">
        ${tocHtml}
      </div>
    </div>
  </div>
`;

      this._bindEvents();
      this._setupObserver();
      this._setupPageObserver();
    } finally {
      this._isRendering = false;
    }
  }

  private _collectHeadings(): IHeadingItem[] {
    const levels: string[] = [];

    if (this.properties.includeH1) {
      levels.push("h1");
    }

    for (let i = 2; i <= this.properties.maxHeadingLevel; i++) {
      levels.push(`h${i}`);
    }

    const selector = levels.join(",");

    const roots = Array.prototype.slice.call(
      document.querySelectorAll('[data-automation-id="textBox"]'),
    ) as HTMLElement[];

    const searchRoots =
      roots.length > 0
        ? roots
        : (Array.prototype.slice.call(
            document.querySelectorAll(
              '[data-automation-id="CanvasZone"], main, body',
            ),
          ) as HTMLElement[]);

    const rawHeadings = searchRoots.reduce(
      (items: HTMLElement[], root: HTMLElement) => {
        const found = Array.prototype.slice.call(
          root.querySelectorAll(selector),
        ) as HTMLElement[];
        return items.concat(found);
      },
      [],
    );

    const seen: { [key: string]: boolean } = {};

    const filteredHeadings = rawHeadings.filter((heading: HTMLElement) => {
      const text = (heading.textContent || "").trim();

      if (!text) {
        return false;
      }

      if (this.domElement.contains(heading)) {
        return false;
      }

      if (text === (this.properties.title || "").trim()) {
        return false;
      }

      if (heading.closest('[data-sp-feature-tag*="SmartTableOfContents"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="TitleText"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="TitleTextId"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="pageTitleInput"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="PageHeader"]')) {
        return false;
      }

      if (heading.closest('[data-automation-id="pageHeader"]')) {
        return false;
      }

      if (heading.closest('[aria-hidden="true"]')) {
        return false;
      }

      if (heading.closest('[role="toolbar"]')) {
        return false;
      }

      const rect = heading.getBoundingClientRect();
      const key = `${heading.tagName}|${text}|${Math.round(rect.top)}|${Math.round(rect.left)}`;

      if (seen[key]) {
        return false;
      }

      seen[key] = true;
      return true;
    });

    const counters: number[] = [0, 0, 0, 0, 0, 0];
    let lastLevel1Id: string | undefined;
    let lastLevel2Id: string | undefined;

    return filteredHeadings.map(
      (heading: HTMLElement, index: number): IHeadingItem => {
        const level = parseInt(heading.tagName.substring(1), 10);
        const text = (heading.textContent || "").trim();

        if (!heading.getAttribute("data-smart-toc-original-id")) {
          heading.setAttribute("data-smart-toc-original-id", heading.id || "");
        }

        const safeText = this._makeSafeId(text);
        const uniqueId = `${this._headingIdPrefix}-${index}-${safeText}`;
        const slug = safeText || `section-${index}`;

        heading.setAttribute("data-smart-toc-id", uniqueId);

        let parentId: string | undefined;

        if (level >= 3) {
          parentId = lastLevel2Id || lastLevel1Id;
        }

        if (level === 1) {
          lastLevel1Id = uniqueId;
          lastLevel2Id = undefined;
        }

        if (level === 2) {
          lastLevel2Id = uniqueId;
        }

        counters[level - 1]++;

        for (let i = level; i < counters.length; i++) {
          counters[i] = 0;
        }

        return {
          id: uniqueId,
          text,
          level,
          element: heading,
          numberPath: counters.slice(0, level).filter((n) => n > 0),
          parentId,
          slug,
        };
      },
    );
  }

  private _makeSafeId(text: string): string {
    return (
      text
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .substring(0, 80) || "section"
    );
  }

  private _getReadingTimeRootElements(): HTMLElement[] {
    const textBoxRoots = Array.prototype.slice.call(
      document.querySelectorAll('[data-automation-id="textBox"]'),
    ) as HTMLElement[];

    if (textBoxRoots.length > 0) {
      return textBoxRoots;
    }

    const fallbackSelectors = [
      '[data-automation-id="CanvasZone"]',
      "main",
      "body",
    ];

    for (let i = 0; i < fallbackSelectors.length; i++) {
      const roots = Array.prototype.slice.call(
        document.querySelectorAll(fallbackSelectors[i]),
      ) as HTMLElement[];

      if (roots.length > 0) {
        return roots;
      }
    }

    return [];
  }

  private _getRootText(root: HTMLElement): string {
    if (this.domElement.contains(root)) {
      return "";
    }

    if (!root.contains(this.domElement)) {
      return root.textContent || "";
    }

    const clone = root.cloneNode(true) as HTMLElement;
    const tocMatches = Array.prototype.slice.call(
      clone.querySelectorAll('[data-sp-feature-tag*="SmartTableOfContents"]'),
    ) as HTMLElement[];

    tocMatches.forEach((tocElement: HTMLElement) => {
      if (tocElement.parentNode) {
        tocElement.parentNode.removeChild(tocElement);
      }
    });

    return clone.textContent || "";
  }

  private _getEstimatedReadingMinutes(): number {
    const roots = this._getReadingTimeRootElements();
    const text = roots
      .map((root: HTMLElement) => {
        return this._getRootText(root);
      })
      .join(" ");
    const words = text.match(/\S+/g);
    const wordCount = words ? words.length : 0;

    return Math.max(1, Math.ceil(wordCount / 200));
  }

  private _getMetadataText(): string {
    const sectionCount = this._headings.length;
    const sectionLabel = sectionCount === 1 ? "section" : "sections";

    return `${sectionCount} ${sectionLabel} • ${this._getEstimatedReadingMinutes()} min read`;
  }

  private _getHeadingSignature(): string {
    return this._headings
      .map((heading: IHeadingItem) => {
        return `${heading.level}:${heading.text}`;
      })
      .join("|");
  }
  private _scheduleHeadingRefresh(): void {
    if (this._refreshTimeout) {
      window.clearTimeout(this._refreshTimeout);
    }

    this._refreshTimeout = window.setTimeout(() => {
      if (this._isRendering) {
        return;
      }

      const previousSignature = this._lastHeadingSignature;

      const refreshedHeadings = this._collectHeadings();

      const refreshedSignature = refreshedHeadings
        .map((heading: IHeadingItem) => {
          return `${heading.level}:${heading.text}`;
        })
        .join("|");

      if (previousSignature === refreshedSignature) {
        return;
      }

      this._headings = refreshedHeadings;
      this._lastHeadingSignature = refreshedSignature;

      this.render();
    }, 800);
  }
  private _setupPageObserver(): void {
    if (this._pageObserver) {
      this._pageObserver.disconnect();
    }

    const canvas = document.querySelector('[data-automation-id="CanvasZone"]');

    if (!canvas) {
      return;
    }

    this._pageObserver = new MutationObserver((mutations: MutationRecord[]) => {
      const relevantMutation = mutations.some((mutation: MutationRecord) => {
        const target = mutation.target as HTMLElement;

        if (!target) {
          return false;
        }

        if (this.domElement.contains(target)) {
          return false;
        }

        return true;
      });

      if (relevantMutation) {
        this._scheduleHeadingRefresh();
      }
    });

    this._pageObserver.observe(canvas, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
  private _unbindEvents(): void {
    if (this._tocClickHandler) {
      this.domElement.removeEventListener("click", this._tocClickHandler);
      this._tocClickHandler = undefined;
    }

    if (this._tocFocusInHandler) {
      this.domElement.removeEventListener("focusin", this._tocFocusInHandler);
      this._tocFocusInHandler = undefined;
    }

    if (this._tocFocusOutHandler) {
      this.domElement.removeEventListener("focusout", this._tocFocusOutHandler);
      this._tocFocusOutHandler = undefined;
    }
    if (this._tocSearchHandler) {
      const searchBox = this.domElement.querySelector("#tocSearchBox");

      searchBox?.removeEventListener("input", this._tocSearchHandler);

      this._tocSearchHandler = undefined;
    }
  }

  private _getLevelClass(level: number): string {
    switch (level) {
      case 1:
        return styles.level1;
      case 2:
        return styles.level2;
      case 3:
        return styles.level3;
      case 4:
        return styles.level4;
      default:
        return styles.level2;
    }
  }

  private _renderHeadings(defaultActiveId: string): string {
    return this._headings
      .map((heading: IHeadingItem) => {
        const numbering = this.properties.showNumbers
          ? `${heading.numberPath.join(".")} `
          : "";

        const isCollapsedChild = this.properties.sticky && heading.level >= 3;
        const parentAttribute = heading.parentId
          ? `data-parent-id="${heading.parentId}"`
          : "";

        return `
          <button
            class="${styles.tocItem} ${this._getLevelClass(heading.level)} ${heading.id === defaultActiveId ? styles.active : ""} ${isCollapsedChild ? styles.collapsedChild : ""}"
            data-target="${heading.id}"
            ${parentAttribute}
            data-level="${heading.level}"
            type="button"
          >
            ${numbering}${heading.text}
          </button>
        `;
      })
      .join("");
  }

  private _expandChildGroup(parentId?: string): void {
    if (!parentId) {
      return;
    }

    const childItems = this.domElement.querySelectorAll(
      `[data-parent-id="${parentId}"]`,
    );

    childItems.forEach((item: Element) => {
      item.classList.add(styles.childVisible);
    });
  }

  private _expandActiveParentGroup(activeId: string): void {
    const activeHeadingMatches = this._headings.filter(
      (heading: IHeadingItem) => heading.id === activeId,
    );

    const activeHeading =
      activeHeadingMatches.length > 0 ? activeHeadingMatches[0] : undefined;

    if (!activeHeading) {
      return;
    }

    if (activeHeading.level <= 2) {
      this._expandChildGroup(activeHeading.id);
      return;
    }

    if (activeHeading.parentId) {
      this._expandChildGroup(activeHeading.parentId);
    }
  }

  private _collapseInactiveChildGroups(): void {
    const childItems = this.domElement.querySelectorAll(
      `.${styles.collapsedChild}`,
    );

    childItems.forEach((item: Element) => {
      const htmlItem = item as HTMLElement;
      const isActive = htmlItem.classList.contains(styles.active);

      if (!isActive) {
        htmlItem.classList.remove(styles.childVisible);
      }
    });
  }
  private _bindSearchFilter(): void {
    const searchBox = this.domElement.querySelector(
      "#tocSearchBox",
    ) as HTMLInputElement | null;

    if (!searchBox) {
      return;
    }

    this._tocSearchHandler = (): void => {
      const searchText = searchBox.value.trim().toLowerCase();

      const tocItems = this.domElement.querySelectorAll(`.${styles.tocItem}`);

      tocItems.forEach((item: Element) => {
        const htmlItem = item as HTMLElement;
        const itemText = (htmlItem.textContent || "").toLowerCase();
        const isMatch = !searchText || itemText.indexOf(searchText) >= 0;

        if (isMatch) {
          htmlItem.classList.remove(styles.searchHidden);

          if (
            searchText &&
            htmlItem.classList.contains(styles.collapsedChild)
          ) {
            htmlItem.classList.add(styles.childVisible);
          }
        } else {
          htmlItem.classList.add(styles.searchHidden);
        }
      });

      if (!searchText) {
        this._collapseInactiveChildGroups();

        const activeButton = this.domElement.querySelector(
          `.${styles.active}`,
        ) as HTMLElement | null;

        const activeId = activeButton
          ? activeButton.getAttribute("data-target")
          : undefined;

        if (activeId) {
          this._expandActiveParentGroup(activeId);
        }
      }
    };

    searchBox.addEventListener("input", this._tocSearchHandler);
  }
  private _bindEvents(): void {
    this._unbindEvents();

    this._tocClickHandler = (event: Event): void => {
      const target = event.target as HTMLElement;

      const tocButton = target.closest(`.${styles.tocItem}`) as HTMLElement;
      const openButton = target.closest("#tocOpenButton") as HTMLElement;
      const closeButton = target.closest("#tocCloseButton") as HTMLElement;

      if (openButton) {
        event.preventDefault();
        event.stopPropagation();

        const drawer = this.domElement.querySelector("#tocDrawer");

        if (drawer) {
          drawer.classList.toggle(styles.drawerOpen);
        }

        return;
      }

      if (closeButton) {
        event.preventDefault();
        event.stopPropagation();

        const drawer = this.domElement.querySelector("#tocDrawer");
        drawer?.classList.remove(styles.drawerOpen);
        return;
      }

      if (!tocButton) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const targetId = tocButton.getAttribute("data-target");

      if (!targetId) {
        return;
      }

      const matches = this._headings.filter(
        (heading: IHeadingItem) => heading.id === targetId,
      );
      const targetItem = matches.length > 0 ? matches[0] : undefined;

      if (!targetItem || !targetItem.element) {
        return;
      }

      this.domElement
        .querySelectorAll(`.${styles.active}`)
        .forEach((el: Element) => {
          el.classList.remove(styles.active);
        });

      tocButton.classList.add(styles.active);
      this._collapseInactiveChildGroups();
      this._expandActiveParentGroup(targetId);

      targetItem.element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const offset = this.properties.scrollOffset || 0;

      if (offset > 0) {
        window.setTimeout(() => {
          window.scrollBy({
            top: -offset,
            behavior: "smooth",
          });
        }, 250);
      }

      if (this.properties.sticky) {
        const drawer = this.domElement.querySelector("#tocDrawer");

        if (drawer) {
          drawer.classList.remove(styles.drawerOpen);
        }
      }
    };

    this._tocFocusInHandler = (event: Event): void => {
      const target = event.target as HTMLElement;
      const tocButton = target.closest(`.${styles.tocItem}`) as HTMLElement;

      if (!tocButton) {
        return;
      }

      const targetId = tocButton.getAttribute("data-target");

      if (!targetId) {
        return;
      }

      this._collapseInactiveChildGroups();
      this._expandActiveParentGroup(targetId);
    };

    this._tocFocusOutHandler = (): void => {
      window.setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement;

        if (activeElement && this.domElement.contains(activeElement)) {
          return;
        }

        const activeButton = this.domElement.querySelector(
          `.${styles.active}`,
        ) as HTMLElement;
        const activeId = activeButton
          ? activeButton.getAttribute("data-target")
          : undefined;

        this._collapseInactiveChildGroups();

        if (activeId) {
          this._expandActiveParentGroup(activeId);
        }
      }, 0);
    };

    this.domElement.addEventListener("click", this._tocClickHandler);
    this.domElement.addEventListener("focusin", this._tocFocusInHandler);
    this.domElement.addEventListener("focusout", this._tocFocusOutHandler);
    this._bindSearchFilter();
  }

  private _setupObserver(): void {
    if (!("IntersectionObserver" in window)) {
      return;
    }

    if (this._headings.length === 0) {
      return;
    }

    const options = {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    this._observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const id = (entry.target as HTMLElement).getAttribute(
            "data-smart-toc-id",
          );

          if (!id) {
            return;
          }

          this.domElement
            .querySelectorAll(`.${styles.active}`)
            .forEach((el: Element) => {
              el.classList.remove(styles.active);
            });

          const activeButton = this.domElement.querySelector(
            `[data-target="${id}"]`,
          );

          if (activeButton) {
            activeButton.classList.add(styles.active);
            this._collapseInactiveChildGroups();
            this._expandActiveParentGroup(id);
          }
        });
      },
      options,
    );

    this._headings.forEach((heading: IHeadingItem) => {
      this._observer?.observe(heading.element);
    });
  }

  private _disconnectObserver(): void {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = undefined;
    }
  }

  protected onDispose(): void {
    this._unbindEvents();
    this._disconnectObserver();

    if (this._pageObserver) {
      this._pageObserver.disconnect();
      this._pageObserver = undefined;
    }

    if (this._refreshTimeout) {
      window.clearTimeout(this._refreshTimeout);
    }
  }
  protected get dataVersion(): Version {
    return Version.parse("2.3.4");
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title",
                }),

                PropertyPaneDropdown("maxHeadingLevel", {
                  label: "Maximum heading level",
                  options: [
                    { key: 2, text: "Heading 2" },
                    { key: 3, text: "Heading 3" },
                    { key: 4, text: "Heading 4" },
                  ],
                }),

                PropertyPaneCheckbox("includeH1", {
                  text: "Include Heading 1",
                }),

                PropertyPaneToggle("showNumbers", {
                  label: "Show section numbers",
                  onText: "Yes",
                  offText: "No",
                }),

                PropertyPaneToggle("showReadingTime", {
                  label: "Show estimated reading time",
                  onText: "Yes",
                  offText: "No",
                }),

                PropertyPaneToggle("showSearchFilter", {
                  label: "Show heading search filter",
                  onText: "Yes",
                  offText: "No",
                }),

                PropertyPaneToggle("sticky", {
                  label: "Display as floating navigation drawer",
                  onText: "Floating drawer",
                  offText: "Inline web part",
                }),

                PropertyPaneSlider("scrollOffset", {
                  label: "Scroll offset in pixels",
                  min: 0,
                  max: 180,
                  step: 10,
                }),

                PropertyPaneToggle("showEmptyMessage", {
                  label: "Show message when no headings are found",
                  onText: "Yes",
                  offText: "No",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
