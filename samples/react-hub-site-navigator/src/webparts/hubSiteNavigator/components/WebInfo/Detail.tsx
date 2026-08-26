import { Button, Text } from "@fluentui/react-components";
import { CheckmarkFilled, CopyRegular } from "@fluentui/react-icons";
import * as React from "react";

export const Detail = (props: { value: string | undefined; label: string; showCopy?: boolean }): JSX.Element => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const { value, label, showCopy } = props;

  React.useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const onCopyClick = async (): Promise<void> => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch (error_) {
      console.error(error_);
      setCopied(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "8px 0",
          gap: 16,
        }}
      >
        <Text weight="semibold" style={{ minWidth: 160, color: "#323130" }}>
          {label}
        </Text>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Text wrap style={{ wordBreak: "break-word" }}>
            {value ?? "—"}
          </Text>
          {value && showCopy && <Button icon={copied ? <CheckmarkFilled /> : <CopyRegular />} appearance="subtle" size="small" onClick={onCopyClick} />}
        </div>
      </div>

      <hr
        style={{
          border: "none",
          borderBottom: "1px solid #e0e0e0",
          margin: "4px 0",
        }}
      />
    </>
  );
};
