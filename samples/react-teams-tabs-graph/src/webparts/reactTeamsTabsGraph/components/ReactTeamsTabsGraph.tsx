import * as React from "react";
import { useEffect, useState } from "react";
import { Nav, INavLinkGroup } from "@fluentui/react/lib/Nav";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { SearchBox } from "@fluentui/react/lib/SearchBox";

import { IReactTeamsTabsgraphProps } from "./IReactTeamsTabsGraphProps";
import { ReactTeamsTabsHelper, IChannel, ITab } from "./ReactTeamsTabsHelper";

import styles from "./ReactTeamsTabsGraph.module.scss";

const ReactTeamsTabsgraph: React.FC<IReactTeamsTabsgraphProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allChannels, setAllChannels] = useState<IChannel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [navGroups, setNavGroups] = useState<INavLinkGroup[]>([]);

  /**
   * On mount, fetch groupId -> channels
   */
  useEffect(() => {
    const loadChannels = async () => {
      try {
        setIsLoading(true);

        // 1. Get GroupId
        const groupId = await ReactTeamsTabsHelper.getGroupId(props.context);
        if (!groupId) {
          setError("This site is not connected to a Microsoft Teams team.");
          setIsLoading(false);
          return;
        }

        // 2. Get channels
        const channels = await ReactTeamsTabsHelper.getChannels(props.context, groupId);

        // 3. Sort channels if needed
        if (props.sortGeneralFirst) {
          channels.sort((a, b) => {
            const x = (a.displayName || "").toLowerCase();
            const y = (b.displayName || "").toLowerCase();
            if (x.startsWith("general")) return -1;
            if (y.startsWith("general")) return 1;
            return x.localeCompare(y);
          });
        } else {
          channels.sort((a, b) =>
            (a.displayName || "").localeCompare(b.displayName || "")
          );
        }

        setAllChannels(channels);
        setIsLoading(false);

      } catch (err: unknown) {
        console.error(err);

        // Narrow 'err' to Error before accessing 'message'
        if (err instanceof Error) {
          setError(err.message || "Error loading channels");
        } else {
          setError("Error loading channels");
        }
        setIsLoading(false);
      }
    };

    loadChannels();
  }, [props.context, props.sortGeneralFirst]);

  /**
   * Whenever channels or searchTerm changes, fetch tabs for each channel
   * and build Fluent UI Nav groups
   */
  useEffect(() => {
    const buildNavData = async () => {
      try {
        if (allChannels.length === 0) {
          setNavGroups([]);
          return;
        }

        const groupId = await ReactTeamsTabsHelper.getGroupId(props.context);
        if (!groupId) return;

        const filtered = searchTerm
          ? allChannels.filter((chan) =>
              (chan.displayName || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          : allChannels;

        const tempNavGroups: INavLinkGroup[] = [];

        for (const chan of filtered) {
          const channelId = chan.id || "";
          const channelName = chan.displayName || "Channel";

          // 1. Fetch tabs for this channel
          const tabs: ITab[] = await ReactTeamsTabsHelper.getTabsFromChannel(
            props.context,
            groupId,
            channelId
          );

          // 2. Convert tabs to Nav links
          const navLinks = tabs.map((tab) => ({
            key: tab.id || "",
            name: tab.displayName || "",
            url: tab.webUrl || "",
            target: "_blank"
          }));

          // 3. Push each channel (as a group) with its tabs
          tempNavGroups.push({
            name: `${channelName} (${navLinks.length})`,
            links: navLinks
          });
        }

        setNavGroups(tempNavGroups);

      } catch (error: unknown) {
        console.error("Error building nav data:", error);

        if (error instanceof Error) {
          setError(error.message || "Error building nav data");
        } else {
          setError("Error building nav data");
        }
      }
    };

    buildNavData();
  }, [allChannels, searchTerm, props.context]);

  return (
    <div className={styles.reactTeamsTabsgraph}>
      <div className={styles.container}>
        {/* Web Part Title */}
        <h2 style={{ marginTop: 0 }}>{props.webPartTitle}</h2>

        {isLoading && (
          <Spinner size={SpinnerSize.large} label="Loading Teams data..." />
        )}

        {error && (
          <MessageBar messageBarType={MessageBarType.error}>
            {error}
          </MessageBar>
        )}

        {!isLoading && !error && (
          <>
            {/* Optional search for channels */}
            {props.showChannelSearch && (
              <SearchBox
                placeholder="Search channels..."
                value={searchTerm}
                onChange={(_, val) => setSearchTerm(val || "")}
                styles={{ root: { maxWidth: 300, marginBottom: 10 } }}
              />
            )}

            {/* Render the Nav with channels & tabs */}
            <Nav
              groups={navGroups}
              styles={{
                root: {
                  width: "100%",
                  boxSizing: "border-box",
                  overflowY: "auto"
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ReactTeamsTabsgraph;
