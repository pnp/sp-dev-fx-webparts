import * as React from "react";

import { IHubSiteNavigatorState, type IHubSiteNavigatorProps, type ISiteNode } from "./IHubSiteNavigator";
import { IHubSiteInfo } from "@pnp/sp/hubsites";
import {
  FlatTree,
  FluentProvider,
  IdPrefixProvider,
  Spinner,
  TreeItem,
  TreeItemPersonaLayout,
  TreeOpenChangeData,
  useHeadlessFlatTree_unstable,
  useRestoreFocusTarget,
  webLightTheme,
  SearchBox,
  SearchBoxProps,
} from "@fluentui/react-components";
import { NodeActions } from "./NodeActions";
import { WebInfo } from "./WebInfo/WebInfo";
import { DocumentFolder16Color, GlobeColor } from "@fluentui/react-icons";

const HubSiteNavigator = (props: IHubSiteNavigatorProps): JSX.Element => {
  const { spService, height } = props;

  const [state, setState] = React.useState<IHubSiteNavigatorState>({
    treeData: [],
    loading: false,
    showWebDetail: false,
    webDetails: undefined,
    openItems: new Set(),
    searchTerm: "",
    allTreeData: [],
  });

  const loadHubSites = async (): Promise<void> => {
    setState((prevState) => ({ ...prevState, loading: true }));
    const [hubs, associatedSites] = await Promise.all([spService.getHubSites(), spService.getAssociatedHubSites()]);

    const nodes: ISiteNode[] = hubs.map((h: IHubSiteInfo) => {
      return {
        value: h.SiteId,
        content: h.Title,
        data: h,
        isHubSite: true,
      };
    });

    for (const site of associatedSites) {
      const found = nodes.find((node) => site.SiteId === node.value);
      if (!found) {
        nodes.push({
          value: site.SiteId,
          content: site.Title,
          parentValue: site.DepartmentId?.replaceAll(/[{}]/g, ""),
          data: site,
          isHubSite: false,
        });
      }
    }
    const defaultOpen = hubs.map((h) => h.SiteId);
    setState((prevState) => ({ ...prevState, openItems: new Set(defaultOpen), treeData: nodes, loading: false, allTreeData: nodes }));
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await loadHubSites();
    })();
  }, []);

  const handleOpenChange = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>, data: TreeOpenChangeData): void => {
    const next = new Set(state.openItems);
    if (data.open) next.add(data.value as string);
    else next.delete(data.value as string);

    setState((prevState) => ({ ...prevState, openItems: next }));
  };

  const flatTree = useHeadlessFlatTree_unstable(state.treeData, { openItems: state.openItems, onOpenChange: handleOpenChange });
  const focusTargetAttribute = useRestoreFocusTarget();

  const handleMoreInfo = async (node: string): Promise<void> => {
    const details = await spService.getWebDetails(node);
    setState((prevState) => ({ ...prevState, webDetails: details, showWebDetail: true }));
  };
  const handleWebDetailsClose = (): void => {
    setState((prevState) => ({ ...prevState, webDetails: undefined, showWebDetail: false }));
  };

  const handleSearchChange: SearchBoxProps["onChange"] = (event, data) => {
    setState((prevState) => ({ ...prevState, searchTerm: data?.value || "" }));
  };

  React.useEffect(() => {
    const term = state.searchTerm.toLowerCase().trim();

    // Helper function to recursively collect all descendant IDs
    const collectDescendants = (parentId: string, allNodes: ISiteNode[], accumulator: Set<string>): void => {
      // Find children whose parentValue matches the current parentId
      const children = allNodes.filter((n) => n.parentValue === parentId);

      for (const child of children) {
        accumulator.add(child.value as string);
        collectDescendants(child.value as string, allNodes, accumulator); // Recurse
      }
    };

    if (!term) {
      // If search is empty, show all sites
      setState(
        (prevState) =>
          ({
            ...prevState,
            treeData: prevState.allTreeData,
            // Restore default open: all Hub Sites
            openItems: new Set(prevState.allTreeData.filter((n) => n.isHubSite).map((n) => n.value)),
          } as IHubSiteNavigatorState)
      );
      return;
    }

    // 1. Identify all matching nodes
    const matchingNodes = state.allTreeData.filter((node) => node.content.toLowerCase().includes(term));

    // 2. Collect IDs of matching nodes and their ancestors/descendants
    const requiredIds = new Set<string>();

    for (const match of matchingNodes) {
      requiredIds.add(match.value as string); // Add the match itself

      // A. TRACE UP: Add all parent Hub IDs (Ancestors)
      let currentNode = match;
      while (currentNode.parentValue) {
        requiredIds.add(currentNode.parentValue as string);

        const parentNode = state.allTreeData.find((n) => n.value === currentNode.parentValue);
        if (!parentNode) break;
        currentNode = parentNode;
      }

      // B. TRACE DOWN: If the match is a Hub Site (or any parent node), include ALL its descendants
      if (match.isHubSite || match.parentValue === null) {
        // Check if it's a Hub or a root node
        collectDescendants(match.value as string, state.allTreeData, requiredIds);
      }
    }

    // 3. Build the final filtered tree data array
    const newTreeData = state.allTreeData.filter((node) => requiredIds.has(node.value as string));

    // 4. Update state:
    setState((prevState) => ({
      ...prevState,
      treeData: newTreeData,
      // IMPORTANT: Open all nodes in the filtered set to display the hierarchy paths
      openItems: new Set(requiredIds),
    }));
  }, [state.searchTerm, state.allTreeData]); // Rerun whenever search term or master data changes

  return (
    <IdPrefixProvider value="App-HubsiteNavigator">
      <FluentProvider id="HubsiteNavigatorFluentProvider" theme={webLightTheme}>
        {state.loading ? (
          <Spinner label="Loading hub sites..." />
        ) : (
          <div style={{ height: height ?? 500, overflowY: "auto" }}>
            <SearchBox placeholder="Search" onChange={handleSearchChange} style={{ marginBottom: "16px", maxWidth: "400px" }} />
            <FlatTree {...flatTree.getTreeProps()} aria-label="HubSites">
              {Array.from(flatTree.items(), (flatTreeItem) => {
                const { content, data, isHubSite, ...treeItemProps } = flatTreeItem.getTreeItemProps();
                return (
                  <TreeItem aria-description="has actions" {...focusTargetAttribute} {...treeItemProps} key={flatTreeItem.value}>
                    <TreeItemPersonaLayout
                      media={isHubSite ? <GlobeColor style={{ height: 24, width: 24 }} /> : <DocumentFolder16Color style={{ height: 24, width: 24 }} />}
                      actions={<NodeActions node={data} isHubSite={isHubSite} onMoreInfoClick={handleMoreInfo} />}
                    >
                      {content}
                    </TreeItemPersonaLayout>
                  </TreeItem>
                );
              })}
            </FlatTree>
          </div>
        )}
        {state.showWebDetail && <WebInfo webDetails={state.webDetails} onClose={handleWebDetailsClose} />}
      </FluentProvider>
    </IdPrefixProvider>
  );
};

export default HubSiteNavigator;
