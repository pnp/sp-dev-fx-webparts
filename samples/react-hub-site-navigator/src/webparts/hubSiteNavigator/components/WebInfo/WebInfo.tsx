import { Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle } from "@fluentui/react-components";
import * as React from "react";
import { Detail } from "./Detail";
import { IWebInfo } from "@pnp/sp/webs";

export const WebInfo = ({ webDetails, onClose }: { webDetails: IWebInfo | undefined; onClose: () => void }): JSX.Element => {
  return (
    <Dialog modalType="non-modal" open={true} onOpenChange={onClose}>
      <DialogSurface style={{ maxWidth: 850 }}>
        <DialogBody>
          <DialogTitle>Details</DialogTitle>
          <DialogContent style={{ paddingTop: 8, paddingBottom: 8 }}>
            <Detail label="Id" value={webDetails?.Id} showCopy={true} />
            <Detail label="Title" value={webDetails?.Title} showCopy={true} />
            <Detail label="Description" value={webDetails?.Description} showCopy={true} />
            <Detail label="NoCrawl" value={String(webDetails?.NoCrawl)} showCopy={false} />
            <Detail label="ServerRelativeUrl" value={webDetails?.ServerRelativeUrl} showCopy={true} />
            <Detail label="Url" value={webDetails?.Url} showCopy={true} />
            <Detail label="Welcome Page Path" value={webDetails?.WelcomePage} showCopy={true} />
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
