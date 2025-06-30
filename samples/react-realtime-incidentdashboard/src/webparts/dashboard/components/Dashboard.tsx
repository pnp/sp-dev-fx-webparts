import * as React from "react";
import styles from "./Dashboard.module.scss";
import { AppContext } from "../hooks/AppContext";
import { WebPartTitle } from "./webPartTitle";
import SupportTickets from "./SupportTickets/SupportTickets";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

export const Dashboard: React.FunctionComponent = () => {
  const { appContext } = React.useContext(AppContext);
  const needsConfiguration: boolean = !appContext.properties.libraryId;
  return (
    <section className={`${styles.root}`}>
      <div className={styles.container}>
        <WebPartTitle
          title={appContext.properties.title}
          description={appContext.properties.description}
        />
        {needsConfiguration && (
          <Placeholder
            iconName="Edit"
            iconText="Configure your web part"
            description="Please configure the web part."
            buttonLabel="Configure"
            onConfigure={() => {
              appContext.webpartContext.propertyPane.open();
            }}
          />
        )}
        {!needsConfiguration && <div>{<SupportTickets />}</div>}
      </div>
    </section>
  );
};
