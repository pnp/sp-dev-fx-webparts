import { Button, Text } from "@fluentui/react-components";
import { CheckmarkFilled, CopyRegular } from "@fluentui/react-icons";
import * as React from "react";

export const Detail = (props: { value: string | undefined; label: string; showCopy?: boolean }): JSX.Element => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const { value, label, showCopy } = props;
  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  }, [copied]);

  const onCopyClick = async (): Promise<void> => {
    await navigator.clipboard
      .writeText(value!)
      .then(() => {
        setCopied(true);
      })
      .catch((reason) => {
        console.log(reason);
        setCopied(false);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        marginTop: 10,
        alignItems: "center",
      }}
    >
      <Text weight="bold" style={{ minWidth: 120 }}>{`${label}`}</Text>
      <div style={{ display: "flex", alignItems: "center", paddingLeft: 20 }}>
        <Text>{value}</Text>
        {value && showCopy && <Button icon={!copied ? <CopyRegular /> : <CheckmarkFilled />} appearance="transparent" onClick={onCopyClick} />}
      </div>
    </div>
  );
};
