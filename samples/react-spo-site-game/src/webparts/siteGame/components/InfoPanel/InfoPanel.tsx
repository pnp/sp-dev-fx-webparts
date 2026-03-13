import * as React from 'react';
import {
  Panel,
  PanelType,
  Text,
  Link,
  Stack,
  Spinner,
  SpinnerSize,
  DefaultButton,
  Icon,
  mergeStyleSets,
} from '@fluentui/react';
import { IInfoPanelProps } from './IInfoPanelProps';
import { SharePointService } from '../../services/SharePointService';
import { IBuilding } from '../../game/types/IBuilding';
import { INPC } from '../../game/types/INPC';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPnpjs: string        = require('../../../../../assets/logos/pnpjs-library.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoCli: string          = require('../../../../../assets/logos/pnp-microsoft-365-cli.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoSpfxToolkit: string  = require('../../../../../assets/logos/pnp-spfx-toolkit.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPowershell: string   = require('../../../../../assets/logos/pnp-powershell.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPowerAutomate: string = require('../../../../../assets/logos/power-automate.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoSPFxSamples: string      = require('../../../../../assets/logos/pnp-samples-social.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPowerBI: string         = require('../../../../../assets/logos/power-bi.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPowerPages: string    = require('../../../../../assets/logos/power-pages.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPnpCore: string          = require('../../../../../assets/logos/pnp-core-library.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoPowerApps: string = require('../../../../../assets/logos/power-apps.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoMSLists: string      = require('../../../../../assets/logos/ms-lists-logo.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoMSTeams: string      = require('../../../../../assets/logos/ms-teams-logo.png');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const logoCopilot: string      = require('../../../../../assets/logos/copilot-logo.png');

interface IFolderEntry { url: string; name: string; }

interface IPanelState {
  items: Array<{
    Id: number;
    Title: string;
    FileLeafRef: string;
    FSObjType: number;
    FileDirRef: string;
    Modified: string;
    Editor?: { Title: string };
    File?: { ServerRelativeUrl: string };
  }>;
  loading: boolean;
  /** Stack of visited folders; empty = library root */
  folderStack: IFolderEntry[];
  /** Randomly chosen bio for the current NPC target */
  activeBio?: string;
}

const styles = mergeStyleSets({
  header: { padding: '12px 16px', borderBottom: '1px solid #e1dfdd' },
  buildingType: { fontSize: 11, color: '#8a8886', textTransform: 'uppercase', letterSpacing: 1 },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 16px',
    background: '#f8f8f8',
    borderBottom: '1px solid #e1dfdd',
    fontSize: 12,
    flexWrap: 'wrap' as const,
  },
  breadcrumbSep: { color: '#bbb', margin: '0 2px' },
  folderRow: {
    padding: '7px 16px',
    borderBottom: '1px solid #f3f2f1',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
    selectors: { ':hover': { background: '#f3f2f1' } },
  },
  itemRow: {
    padding: '8px 16px',
    borderBottom: '1px solid #f3f2f1',
    selectors: { ':hover': { background: '#f3f2f1' } },
  },
  itemTitle: { fontSize: 13, color: '#323130' },
  itemMeta: { fontSize: 11, color: '#8a8886' },
  eggBio: { padding: '16px', fontSize: 13, lineHeight: '1.6', whiteSpace: 'pre-wrap' },
  eggIcon: { fontSize: 40, textAlign: 'center', padding: '16px 0' },
  eggLogo: {
    display: 'block',
    maxWidth: 180,
    maxHeight: 50,
    height: 'auto',
    margin: '16px auto 8px',
  },
  userBio: { padding: '16px', fontSize: 13 },
  userGroup: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 12,
    fontSize: 11,
    fontWeight: 600,
  },
});

const GROUP_COLORS: Record<string, { bg: string; text: string }> = {
  Owners: { bg: '#fff4ce', text: '#7a5900' },
  Members: { bg: '#dce6f0', text: '#0e3d77' },
  Visitors: { bg: '#d7f0dd', text: '#1a5a24' },
};

export class InfoPanel extends React.Component<IInfoPanelProps, IPanelState> {
  private spService: SharePointService;

  constructor(props: IInfoPanelProps) {
    super(props);
    this.state = { items: [], loading: false, folderStack: [] };
    this.spService = new SharePointService(props.spHttpClient, props.siteAbsoluteUrl);
  }

  public componentDidUpdate(prevProps: IInfoPanelProps): void {
    const { target } = this.props;
    if (target !== prevProps.target) {
      if (target?.kind === 'building') {
        this.setState({ folderStack: [], activeBio: undefined }, () => {
          this.loadItems(target.data, undefined).catch(() => undefined);
        });
      } else if (target?.kind === 'npc') {
        const npc = target.data;
        const pool = npc.bios && npc.bios.length > 0 ? npc.bios : undefined;
        const activeBio = pool
          ? pool[Math.floor(Math.random() * pool.length)]
          : undefined;
        this.setState({ activeBio });
      } else {
        this.setState({ activeBio: undefined });
      }
    }
  }
  private async loadItems(building: IBuilding, folderServerRelativeUrl: string | undefined): Promise<void> {
    this.setState({ loading: true, items: [] });
    try {
      const items = await this.spService.fetchListItems(building.listId, 100, folderServerRelativeUrl);
      this.setState({ items, loading: false });
    } catch {
      this.setState({ loading: false });
    }
  }

  private navigateIntoFolder(building: IBuilding, folderUrl: string, folderName: string): void {
    this.setState(
      (prev) => ({ folderStack: [...prev.folderStack, { url: folderUrl, name: folderName }] }),
      () => this.loadItems(building, folderUrl).catch(() => undefined)
    );
  }

  private navigateToRoot(building: IBuilding): void {
    this.setState(
      { folderStack: [] },
      () => this.loadItems(building, undefined).catch(() => undefined)
    );
  }

  private navigateToBreadcrumb(building: IBuilding, idx: number): void {
    this.setState(
      (prev) => ({ folderStack: prev.folderStack.slice(0, idx + 1) }),
      () => {
        const { folderStack } = this.state;
        const entry = folderStack[folderStack.length - 1];
        this.loadItems(building, entry?.url).catch(() => undefined);
      }
    );
  }

  public render(): React.ReactElement {
    const { target, onDismiss } = this.props;
    const isOpen = target !== null;

    const headerText =
      target?.kind === 'building'
        ? `🏛 ${target.data.name}`
        : target?.kind === 'npc' && (target.data.kind === 'easteregg' || target.data.kind === 'm365egg')
        ? target.data.name
        : target?.kind === 'npc'
        ? `👤 ${target.data.name}`
        : '';

    return (
      <Panel
        isOpen={isOpen}
        onDismiss={onDismiss}
        type={PanelType.smallFixedFar}
        headerText={headerText}
        closeButtonAriaLabel="Close"
        isLightDismiss
        styles={{
          main: { boxShadow: '-4px 0 16px rgba(0,0,0,0.15)' },
          header: { paddingTop: 12 },
        }}
      >
        {target?.kind === 'building' && this.renderBuilding(target.data)}
        {target?.kind === 'npc' && target.data.kind === 'user' && this.renderUser(target.data)}
        {target?.kind === 'npc' && (target.data.kind === 'easteregg' || target.data.kind === 'm365egg') && this.renderEgg(target.data)}
      </Panel>
    );
  }

  private renderBuilding(b: IBuilding): React.ReactElement {
    const { items, loading, folderStack } = this.state;
    const siteOrigin = new URL(this.props.siteAbsoluteUrl).origin;
    const inFolder = folderStack.length > 0;

    return (
      <Stack>
        <div className={styles.header}>
          <Text className={styles.buildingType}>{b.buildingType.replace(/_/g, ' ')}</Text>
          <Stack horizontal tokens={{ childrenGap: 16 }} style={{ marginTop: 6 }}>
            <Text variant="small">{b.itemCount} items</Text>
            {b.url && (
              <Link href={b.url} target="_blank">
                Open in SharePoint →
              </Link>
            )}
          </Stack>
        </div>

        {/* Breadcrumb bar — only shown inside a folder */}
        {inFolder && (
          <div className={styles.breadcrumb}>
            <Link onClick={() => this.navigateToRoot(b)} style={{ fontSize: 12, cursor: 'pointer' }}>
              🏠 Root
            </Link>
            {folderStack.map((entry, idx) => (
              <React.Fragment key={entry.url}>
                <span className={styles.breadcrumbSep}>›</span>
                {idx < folderStack.length - 1 ? (
                  <Link onClick={() => this.navigateToBreadcrumb(b, idx)} style={{ fontSize: 12, cursor: 'pointer' }}>
                    {entry.name}
                  </Link>
                ) : (
                  <Text style={{ fontSize: 12, fontWeight: 600 }}>{entry.name}</Text>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {loading && (
          <Stack horizontalAlign="center" style={{ padding: 24 }}>
            <Spinner size={SpinnerSize.medium} label="Loading..." />
          </Stack>
        )}

        {!loading && items.length === 0 && b.itemCount > 0 && (
          <Text style={{ padding: 16, color: '#8a8886' }}>
            Unable to load items — check your permissions.
          </Text>
        )}

        {!loading && items.length === 0 && b.itemCount === 0 && (
          <Text style={{ padding: 16, color: '#8a8886', fontStyle: 'italic' }}>
            This building is empty.
          </Text>
        )}

        {!loading && items.map((item) => {
          const isFolder = item.FSObjType === 1;

          if (isFolder) {
            const folderName = item.FileLeafRef || item.Title || '(Folder)';
            // Build the folder's server-relative URL from its parent + its own name
            const folderUrl = item.FileDirRef
              ? `${item.FileDirRef}/${folderName}`
              : undefined;
            return (
              <div
                key={item.Id}
                className={styles.folderRow}
                onClick={() => folderUrl && this.navigateIntoFolder(b, folderUrl, folderName)}
                role="button"
                aria-label={`Open folder ${folderName}`}
              >
                <Icon iconName="FolderHorizontal" style={{ fontSize: 16, color: '#c8a000' }} />
                <Text className={styles.itemTitle} style={{ color: '#106ebe' }}>{folderName}</Text>
              </div>
            );
          }

          // File or list item
          const isFile = !!item.File?.ServerRelativeUrl;
          const displayName = isFile
            ? (item.FileLeafRef || item.Title || '(Unnamed file)')
            : (item.Title || item.FileLeafRef || '(No title)');
          const itemUrl = isFile
            ? siteOrigin + item.File!.ServerRelativeUrl
            : b.url.replace(/\/[^/]*\.aspx.*/i, `/DispForm.aspx?ID=${item.Id}`);

          return (
            <div key={item.Id} className={styles.itemRow}>
              <Link href={itemUrl} target="_blank" styles={{ root: { textDecoration: 'none' } }}>
                <Text className={styles.itemTitle}>{displayName}</Text>
              </Link>
              <Text className={styles.itemMeta}>
                {item.Modified ? new Date(item.Modified).toLocaleDateString() : ''}{' '}
                {item.Editor?.Title ? `· ${item.Editor.Title}` : ''}
              </Text>
            </div>
          );
        })}
      </Stack>
    );
  }

  private renderUser(npc: INPC): React.ReactElement {
    const groupName = npc.title.split(' — ')[0];
    const gc = GROUP_COLORS[groupName] || { bg: '#e8e8e8', text: '#333' };

    return (
      <Stack className={styles.userBio} tokens={{ childrenGap: 10 }}>
        {/* Avatar placeholder */}
        <Stack horizontalAlign="center">
          <Icon
            iconName="Contact"
            styles={{
              root: {
                fontSize: 64,
                color: npc.groupColor || '#555',
                width: 80,
                height: 80,
                background: '#f3f2f1',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                lineHeight: '80px',
              },
            }}
          />
        </Stack>

        <span
          className={styles.userGroup}
          style={{ background: gc.bg, color: gc.text, alignSelf: 'flex-start' }}
        >
          {groupName}
        </span>

        {npc.email && (
          <Stack horizontal tokens={{ childrenGap: 6 }}>
            <Icon iconName="Mail" />
            <Link href={`mailto:${npc.email}`}>{npc.email}</Link>
          </Stack>
        )}

        {npc.profileUrl && (
          <DefaultButton
            text="View Profile"
            iconProps={{ iconName: 'Contact' }}
            href={npc.profileUrl}
            target="_blank"
          />
        )}
      </Stack>
    );
  }

  private renderEgg(npc: INPC): React.ReactElement {
    const emojiMap: Record<string, string> = {
      pnp_rabbit: '🐇',
      vesa_npc: '🧑‍💻',
      warrior_horse: '🐴',
      campfire: '🔥',
      m365_chilli:    '🌶️',
      spfx_toolkit:   '🧩',
      pnp_spfx_samples: '📚',
      pnp_powershell: '🖥️',
      power_automate: '⚡',
      power_bi: '📊',
      power_pages: '🧱',
      julie: '🌟',
      luise: '👑',
      pnp_core: '🔷',
      power_apps: '📱',
      ms_lists: '✓',
      hugo: '☕',
      ms_teams: '💬',
      ms_copilot: '✨',
    };

    const logoMap: Record<string, string> = {
      pnp_rabbit:       logoPnpjs,
      m365_chilli:      logoCli,
      spfx_toolkit:     logoSpfxToolkit,
      pnp_powershell:   logoPowershell,
      power_automate:   logoPowerAutomate,
      power_pages:      logoPowerPages,
      pnp_spfx_samples: logoSPFxSamples,
      power_bi:         logoPowerBI,
      pnp_core:         logoPnpCore,
      power_apps:       logoPowerApps,
      ms_lists:         logoMSLists,
      ms_teams:         logoMSTeams,
      ms_copilot:       logoCopilot,
    };

    const bioText = this.state.activeBio ?? npc.bio;
    const logo = logoMap[npc.spriteKey];
    const icon = emojiMap[npc.spriteKey] ?? '🥚';

    return (
      <Stack>
        {logo
          ? <img
              src={logo}
              alt={npc.name}
              className={styles.eggLogo}
            />
          : icon && <div className={styles.eggIcon}>{icon}</div>
        }
        <Text
          variant="mediumPlus"
          style={{ paddingLeft: 16, paddingRight: 16, color: '#8b00c8', fontWeight: 600 }}
        >
          {npc.title}
        </Text>
        <div className={styles.eggBio}>
          {this.renderBioWithLinks(bioText)}
        </div>
        {npc.profileUrl && (
          <Stack style={{ padding: '0 16px 16px' }}>
            <Link href={npc.profileUrl} target="_blank">
              Learn more →
            </Link>
          </Stack>
        )}
      </Stack>
    );
  }

  /** Renders bio text as JSX, turning bare URLs and well-known domains into clickable links. */
  private renderBioWithLinks(text: string): React.ReactNode {
    const URL_RE = /(https?:\/\/[^\s]+|(?:pnp\.github\.io|aka\.ms|github\.com|adoption\.microsoft\.com)[\w./%-]*)/g;
    const lines = text.split('\n');
    return lines.map((line, li) => {
      const parts: React.ReactNode[] = [];
      let last = 0;
      let m: RegExpExecArray | null;
      URL_RE.lastIndex = 0;
      while ((m = URL_RE.exec(line)) !== null) {
        if (m.index > last) parts.push(line.slice(last, m.index));
        const raw = m[1];
        const href = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
        parts.push(
          <Link key={`${li}-${m.index}`} href={href} target="_blank" style={{ color: '#0078d4' }}>
            {raw}
          </Link>
        );
        last = m.index + raw.length;
      }
      if (last < line.length) parts.push(line.slice(last));
      return (
        <React.Fragment key={li}>
          {parts}
          {li < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  }
}
