import * as React from "react";
import { Dialog, DialogSurface, DialogTitle, DialogBody, DialogContent } from "@fluentui/react-components";
import { Drive } from "@microsoft/microsoft-graph-types";
import { Detail } from "./Detail";

interface IDriveInfoProps {
  driveDetails: Drive;
  onClose: () => void;
}

export const DriveInfo = (props: IDriveInfoProps): JSX.Element => {
  const { driveDetails, onClose } = props;

  return (
    <Dialog modalType="non-modal" open={true} onOpenChange={onClose}>
      <DialogSurface style={{ maxWidth: 850 }}>
        <DialogBody>
          <DialogTitle>Details</DialogTitle>
          <DialogContent>
            <Detail value={driveDetails.description ?? ""} label="Description" showCopy={true} />
            <Detail value={driveDetails.id} label={"Drive Id"} showCopy={true} />
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
