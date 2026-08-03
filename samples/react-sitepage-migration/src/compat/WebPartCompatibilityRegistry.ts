import { CompatibilityOverride } from '../models/CompatibilityOverride';
import { CompatibilityLevel } from '../models/NormalizedPage';

export interface WebPartCompatibilityEntry {
  readonly id: string;
  readonly title: string;
  readonly compatibility: CompatibilityLevel;
  readonly notes: string;
}

const registry: Record<string, WebPartCompatibilityEntry> = {
  'd1d91016-032f-456d-98a4-721247c305e8': {
    id: 'd1d91016-032f-456d-98a4-721247c305e8',
    title: 'Image',
    compatibility: 'FullySupported',
    notes: 'The image is copied into the destination Site Assets library, and both the URL and the embedded identifiers are repointed.'
  },
  'af8be689-990e-492a-81f7-ba3e4cd3ed9c': {
    id: 'af8be689-990e-492a-81f7-ba3e4cd3ed9c',
    title: 'Image gallery',
    compatibility: 'FullySupported',
    notes: 'Every image in the gallery is copied and repointed in the same way as a single image.'
  },
  'b7dd04e1-19ce-4b24-9132-b60a1c2b910d': {
    id: 'b7dd04e1-19ce-4b24-9132-b60a1c2b910d',
    title: 'File viewer',
    compatibility: 'PartiallySupported',
    notes: 'The embedded file is copied when it lives in the source site. A file held in another site or in OneDrive is left pointing where it was.'
  },
  'c70391ea-0b10-4ee9-b2b4-006d3fcad0cd': {
    id: 'c70391ea-0b10-4ee9-b2b4-006d3fcad0cd',
    title: 'Quick links',
    compatibility: 'PartiallySupported',
    notes: 'Layout and tiles are preserved. Links are repointed only where the destination is part of the same migration.'
  },
  'c4bd7b2f-7b6e-4599-8485-16504575f590': {
    id: 'c4bd7b2f-7b6e-4599-8485-16504575f590',
    title: 'Hero',
    compatibility: 'PartiallySupported',
    notes: 'Tiles, layout and images survive. Check the link target of each tile: anything outside the migrated set still points at the source site.'
  },
  '7f718435-ee4d-431c-bdbf-9c4ff326f46e': {
    id: '7f718435-ee4d-431c-bdbf-9c4ff326f46e',
    title: 'People',
    compatibility: 'PartiallySupported',
    notes: 'The chosen people are preserved by account. They render only if those accounts are resolvable from the destination site.'
  },
  '6410b3b6-d440-4663-8744-378976dc041e': {
    id: '6410b3b6-d440-4663-8744-378976dc041e',
    title: 'Link preview',
    compatibility: 'PartiallySupported',
    notes: 'The link is preserved. SharePoint regenerates the preview card at the destination, so it can look different.'
  },
  '490d7c76-1824-45b2-9de3-676421c997fa': {
    id: '490d7c76-1824-45b2-9de3-676421c997fa',
    title: 'Embed',
    compatibility: 'PartiallySupported',
    notes: 'The embed code is copied exactly as written and is never rewritten. An embed of an external site works; one pointing at the source site does not.'
  },
  '544dd15b-cf3c-441b-96da-004d5a8cea1d': {
    id: '544dd15b-cf3c-441b-96da-004d5a8cea1d',
    title: 'YouTube',
    compatibility: 'FullySupported',
    notes: 'The configuration holds only an external video reference.'
  },
  'e377ea37-9047-43b9-8cdb-a761be2f8e09': {
    id: 'e377ea37-9047-43b9-8cdb-a761be2f8e09',
    title: 'Bing maps',
    compatibility: 'FullySupported',
    notes: 'The location and zoom level are self-contained.'
  },
  '2161a1c6-db61-4731-b97c-3cdb303f7cbb': {
    id: '2161a1c6-db61-4731-b97c-3cdb303f7cbb',
    title: 'Divider',
    compatibility: 'FullySupported',
    notes: 'Presentational only.'
  },
  '8654b779-4886-46d4-8ffb-b5ed960ee986': {
    id: '8654b779-4886-46d4-8ffb-b5ed960ee986',
    title: 'Spacer',
    compatibility: 'FullySupported',
    notes: 'Presentational only.'
  },
  '1ef5ed11-ce7b-44be-bc5e-4abd55101d16': {
    id: '1ef5ed11-ce7b-44be-bc5e-4abd55101d16',
    title: 'Markdown',
    compatibility: 'FullySupported',
    notes: 'The markdown source is copied verbatim, and any site URLs inside it are rewritten.'
  },
  '7b317bca-c919-4982-af2f-8399173e5a1e': {
    id: '7b317bca-c919-4982-af2f-8399173e5a1e',
    title: 'Code snippet',
    compatibility: 'FullySupported',
    notes: 'The snippet is copied verbatim.'
  },
  '62cac389-787f-495d-beca-e11786162ef4': {
    id: '62cac389-787f-495d-beca-e11786162ef4',
    title: 'Countdown timer',
    compatibility: 'FullySupported',
    notes: 'The target date and styling are self-contained.'
  },
  '868ac3c3-cad7-4bd6-9a1c-14dc5cc8e823': {
    id: '868ac3c3-cad7-4bd6-9a1c-14dc5cc8e823',
    title: 'Weather',
    compatibility: 'FullySupported',
    notes: 'The configured locations are self-contained.'
  },
  '0f087d7f-520e-42b7-89c0-496aaf979d58': {
    id: '0f087d7f-520e-42b7-89c0-496aaf979d58',
    title: 'Button',
    compatibility: 'PartiallySupported',
    notes: 'The label survives. The link is repointed only when its destination is part of the same migration.'
  },
  'df8e44e7-edd5-46d5-90da-aca1539313b8': {
    id: 'df8e44e7-edd5-46d5-90da-aca1539313b8',
    title: 'Call to action',
    compatibility: 'PartiallySupported',
    notes: 'Text and image survive. Check the link target after migrating.'
  },
  'e84a8ca2-f63c-4fb9-bc0b-d8eef5ccb22b': {
    id: 'e84a8ca2-f63c-4fb9-bc0b-d8eef5ccb22b',
    title: 'Org chart',
    compatibility: 'PartiallySupported',
    notes: 'The root person is preserved. The chart is rebuilt from the directory, so it reflects the organization rather than the source page.'
  },
  '91a50c94-865f-4f5c-8b4e-e49659e69772': {
    id: '91a50c94-865f-4f5c-8b4e-e49659e69772',
    title: 'Quick chart',
    compatibility: 'PartiallySupported',
    notes: 'A chart with values typed into it survives. A chart bound to a list does not, because the list stays behind.'
  },
  '58fcd18b-e1af-4b0a-b23b-422c2c52d5a2': {
    id: '58fcd18b-e1af-4b0a-b23b-422c2c52d5a2',
    title: 'Power BI',
    compatibility: 'PartiallySupported',
    notes: 'The report reference is preserved. Viewers of the destination site need their own access to that report.'
  },
  'b19b3b9e-8d13-4fec-a93c-401a091c0707': {
    id: 'b19b3b9e-8d13-4fec-a93c-401a091c0707',
    title: 'Microsoft Forms',
    compatibility: 'PartiallySupported',
    notes: 'The form reference is preserved. The form itself stays where it was and keeps collecting to the same place.'
  },
  '275c0095-a77e-4f6d-a2a0-6a7626911518': {
    id: '275c0095-a77e-4f6d-a2a0-6a7626911518',
    title: 'Stream video',
    compatibility: 'PartiallySupported',
    notes: 'A video held in the source site is copied only if it is small enough to pass through the browser; otherwise the reference is left as written.'
  },
  '9d7e898c-f1bb-473a-9ace-8b415036578b': {
    id: '9d7e898c-f1bb-473a-9ace-8b415036578b',
    title: 'Power Apps',
    compatibility: 'PartiallySupported',
    notes: 'The app reference is preserved. An app bound to a list in the source site keeps writing to that list.'
  },
  'daf0b71c-6de8-4ef7-b511-faae7c388708': {
    id: 'daf0b71c-6de8-4ef7-b511-faae7c388708',
    title: 'Highlighted content',
    compatibility: 'Unsupported',
    notes: 'The web part runs a content query scoped to the source site. Copied as-is it either shows the source site’s content or nothing at all, and the query has to be re-pointed by hand.'
  },
  'f92bf067-bc19-489e-a556-7fe95f508720': {
    id: 'f92bf067-bc19-489e-a556-7fe95f508720',
    title: 'List',
    compatibility: 'Unsupported',
    notes: 'Bound to a list by id in the source site. This tool migrates pages, not lists, so the binding cannot be satisfied at the destination.'
  },
  'a8cd4347-f996-48c1-bcfb-75373fed2a27': {
    id: 'a8cd4347-f996-48c1-bcfb-75373fed2a27',
    title: 'List properties',
    compatibility: 'Unsupported',
    notes: 'Bound to a list item in the source site.'
  },
  'cf91cf5d-ac23-4a7a-9dbc-cd9ea2a4e859': {
    id: 'cf91cf5d-ac23-4a7a-9dbc-cd9ea2a4e859',
    title: 'Page properties',
    compatibility: 'Unsupported',
    notes: 'Displays custom Site Pages columns, which are not migrated with the page.'
  },
  '20745d7d-8581-4a6c-bf26-68279bc123fc': {
    id: '20745d7d-8581-4a6c-bf26-68279bc123fc',
    title: 'Events',
    compatibility: 'Unsupported',
    notes: 'Reads an events list in the source site.'
  },
  '6676088b-e28e-4a90-b9cb-d0d0303cd2eb': {
    id: '6676088b-e28e-4a90-b9cb-d0d0303cd2eb',
    title: 'Group calendar',
    compatibility: 'Unsupported',
    notes: 'Bound to the Microsoft 365 group behind the source site.'
  },
  'a5df8fdf-b508-4b66-98a6-d83bc2597f63': {
    id: 'a5df8fdf-b508-4b66-98a6-d83bc2597f63',
    title: 'News',
    compatibility: 'Unsupported',
    notes: 'Runs a news query scoped to the source site. Migrated news posts are not automatically picked up by a copy of this web part.'
  },
  'eb95c819-ab8f-4689-bd03-0c2d65d47b1f': {
    id: 'eb95c819-ab8f-4689-bd03-0c2d65d47b1f',
    title: 'Site activity',
    compatibility: 'Unsupported',
    notes: 'Reports activity for the site it sits on. It will describe the destination site, not the source.'
  },
  '39c4c1c2-63fa-41be-8cc2-f6c0b49b253d': {
    id: '39c4c1c2-63fa-41be-8cc2-f6c0b49b253d',
    title: 'Planner',
    compatibility: 'Unsupported',
    notes: 'Bound to a plan owned by the group behind the source site.'
  },
  '31e9537e-f9dc-40a4-8834-0e3b7df418bc': {
    id: '31e9537e-f9dc-40a4-8834-0e3b7df418bc',
    title: 'Viva Engage highlights',
    compatibility: 'Unsupported',
    notes: 'Bound to a community tied to the source site.'
  },
  'cb3bfe97-a47f-47ca-bffb-bb9a5ff83d75': {
    id: 'cb3bfe97-a47f-47ca-bffb-bb9a5ff83d75',
    title: 'Viva Engage conversations',
    compatibility: 'Unsupported',
    notes: 'Bound to a community tied to the source site.'
  },
  '243166f5-4dc3-4fe2-9df2-a7971b546a0a': {
    id: '243166f5-4dc3-4fe2-9df2-a7971b546a0a',
    title: 'SharePoint add-in',
    compatibility: 'Unsupported',
    notes: 'Hosts a classic add-in that must be installed on the destination site before the web part can render.'
  }
};

export const createCompatibilityResolver = (
  overrides: ReadonlyArray<CompatibilityOverride> = []
): ((webPartId: string) => WebPartCompatibilityEntry) => {
  const overrideMap = new Map<string, WebPartCompatibilityEntry>(
    overrides.map((entry) => [entry.id.toLowerCase(), entry])
  );

  return (webPartId: string): WebPartCompatibilityEntry => {
    const normalizedId = webPartId.toLowerCase();
    const override = overrideMap.get(normalizedId);

    if (override) {
      return override;
    }

    return registry[normalizedId] ?? {
      id: normalizedId,
      title: 'Unknown web part',
      compatibility: 'Unsupported',
      notes: 'No first-party compatibility mapping exists for this web part. Configuration is captured in the migration report.'
    };
  };
};

export const getCompatibility = (webPartId: string): WebPartCompatibilityEntry => {
  const normalizedId = webPartId.toLowerCase();
  return registry[normalizedId] ?? {
    id: normalizedId,
    title: 'Unknown web part',
    compatibility: 'Unsupported',
    notes: 'No first-party compatibility mapping exists for this web part. Configuration is captured in the migration report.'
  };
};

export const getCompatibilityMatrix = (
  overrides: ReadonlyArray<CompatibilityOverride> = []
): ReadonlyArray<WebPartCompatibilityEntry> => {
  const overrideIds = new Set(overrides.map((entry) => entry.id.toLowerCase()));
  return [...Object.values(registry).filter((entry) => !overrideIds.has(entry.id.toLowerCase())), ...overrides];
};
