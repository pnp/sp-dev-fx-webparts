import * as React from 'react';
import styles from './ModernLinkPresenter.module.scss';
import type { IModernLinkPresenterProps, IModernLinkPresenterLinkItem } from './IModernLinkPresenterProps';
import { Icon } from '@fluentui/react/lib/Icon';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { TextField } from '@fluentui/react/lib/TextField';
import * as strings from 'ModernLinkPresenterWebPartStrings';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton } from '@fluentui/react/lib/Button';

// Add a helper function to determine contrast color
function getContrastYIQ(hexcolor: string | undefined): string {
  if (!hexcolor) return '#222';
  let color = hexcolor.replace('#', '');
  if (color.length === 3) color = color.split('').map(x => x + x).join('');
  if (color.length !== 6) return '#222';
  const r = parseInt(color.substr(0,2),16);
  const g = parseInt(color.substr(2,2),16);
  const b = parseInt(color.substr(4,2),16);
  const yiq = ((r*299)+(g*587)+(b*114))/1000;
  return (yiq >= 180) ? '#222' : '#fff';
}

export default class ModernLinkPresenter extends React.Component<IModernLinkPresenterProps, { search: string, dialogOpen: boolean, dialogUrl: string, dialogTitle: string, dialogMaximized: boolean }> {
  constructor(props: IModernLinkPresenterProps) {
    super(props);
    this.state = { search: '', dialogOpen: false, dialogUrl: '', dialogTitle: '', dialogMaximized: false };
  }

  private openDialog = (url: string, title: string) => {
    this.setState({ dialogOpen: true, dialogUrl: url, dialogTitle: title, dialogMaximized: false });
  };

  private closeDialog = () => {
    this.setState({ dialogOpen: false, dialogUrl: '', dialogTitle: '', dialogMaximized: false });
  };

  private toggleDialogMaximize = () => {
    this.setState(s => ({ dialogMaximized: !s.dialogMaximized }));
  };

  private filterLinks(links: IModernLinkPresenterLinkItem[]): IModernLinkPresenterLinkItem[] {
    const { search } = this.state;
    if (!search) return links;
    const s = search.toLowerCase();
    return links.filter(link =>
      (link.title && link.title.toLowerCase().includes(s)) ||
      (link.description && link.description.toLowerCase().includes(s)) ||
      (link.url && link.url.toLowerCase().includes(s))
    );
  }

  public render(): React.ReactElement<IModernLinkPresenterProps> {
    const {
      description,
      hasTeamsContext,
      links,
      outputFormat,
      displayMode,
      onTitleUpdate,
      tileWidth,
      tileHeight,
      tileHoverEffect,
      direction,
      tileButtonText,
      showTileButton,
      showSearchField = true
    } = this.props;

    const filteredLinks = this.filterLinks(links);
    const isSearching = !!this.state.search;

    return (
      <section className={`${styles.modernLinkPresenter} ${hasTeamsContext ? styles.teams : ''}`}>
        <WebPartTitle
          displayMode={displayMode}
          title={description}
          updateProperty={onTitleUpdate}
        />
        {showSearchField && (
          <div style={{ position: 'relative', width: '100%', marginBottom: 16 }}>
            <TextField
              placeholder={strings.SearchLinksPlaceholder}
              value={this.state.search}
              onChange={(_, v) => this.setState({ search: v || '' })}
              styles={{ root: { width: '100%' }, field: { paddingLeft: 36, paddingRight: 36 } }}
            />
            <span
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
                ...(isSearching ? { transform: 'translateY(-50%) scale(1.2) rotate(20deg)' } : {})
              }}
            >
              <Icon iconName="Search" style={{ fontSize: 18, color: '#888' }} />
            </span>
            {isSearching && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => this.setState({ search: '' })}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.setState({ search: '' });
                  }
                }}
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  margin: 0,
                  cursor: 'pointer',
                  outline: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 24,
                  width: 24
                }}
              >
                <Icon iconName="Clear" style={{ fontSize: 18, color: '#888' }} />
              </button>
            )}
          </div>
        )}
        <div>          
          {outputFormat === 'links' && (
            <div className={direction === 'horizontal' ? styles.horizontalList : styles.verticalList}>
              {filteredLinks && filteredLinks.length > 0 ? (
                filteredLinks.map((link: IModernLinkPresenterLinkItem, idx: number) => (
                  <div key={idx} className={styles.linkItem}>
                    {/* Only Links */}
                    <a
                      href={link.target === 'dialog' ? undefined : link.url}
                      target={link.target !== 'dialog' ? (link.target || '_blank') : undefined}
                      rel="noreferrer"
                      className={styles.inlineLinkTitle}
                      onClick={link.target === 'dialog' ? (e) => { e.preventDefault(); this.openDialog(link.url, link.title); } : undefined}
                    >
                      {link.title}
                    </a>
                  </div>
                ))
              ) : (
                <div>No links configured.</div>
              )}
            </div>
          )}
          {outputFormat === 'linksWithIcon' && (
            <div className={direction === 'horizontal' ? styles.horizontalList : styles.verticalList}>
              {filteredLinks && filteredLinks.length > 0 ? (
                filteredLinks.map((link: IModernLinkPresenterLinkItem, idx: number) => (
                  <div key={idx} className={styles.linkItem}>
                    {/* Links with Icon */}
                    <a
                      href={link.target === 'dialog' ? undefined : link.url}
                      target={link.target !== 'dialog' ? (link.target || '_blank') : undefined}
                      rel="noreferrer"
                      className={styles.inlineLinkTitle}
                      onClick={link.target === 'dialog' ? (e) => { e.preventDefault(); this.openDialog(link.url, link.title); } : undefined}
                    >
                      {link.icon && <Icon iconName={link.icon} style={{ marginRight: '0.5em' }} />}
                      {link.title}
                    </a>
                  </div>
                ))
              ) : (
                <div>No links configured.</div>
              )}
            </div>
          )}
          {outputFormat === 'linkDescriptionIcon' && (
            <div className={styles.inlineLinkGrid}>
              {filteredLinks && filteredLinks.length > 0 ? (
                filteredLinks.map((link: IModernLinkPresenterLinkItem, idx: number) => (
                  <div
                    key={idx}
                    className={styles.inlineLinkTile}
                    style={{ background: link.color || '#ddd', color: getContrastYIQ(link.color) }}
                  >
                    <div>
                      {link.icon && <span className={styles.inlineLinkIcon}><Icon iconName={link.icon} /></span>}
                      <a
                        href={link.target === 'dialog' ? undefined : link.url}
                        target={link.target !== 'dialog' ? (link.target || '_blank') : undefined}
                        rel="noreferrer"
                        className={styles.inlineLinkTitle}
                        style={{ color: getContrastYIQ(link.color) }}
                        onClick={link.target === 'dialog' ? (e) => { e.preventDefault(); this.openDialog(link.url, link.title); } : undefined}
                      >
                        {link.title}
                      </a>
                    </div>
                    {link.description && (
                      <div className={styles.inlineLinkDescription} style={{ color: getContrastYIQ(link.color) }}>{link.description}</div>
                    )}
                  </div>
                ))
              ) : (
                <div>No links configured.</div>
              )}
            </div>
          )}
          {outputFormat === 'tile' && (
            <div className={styles.tileGrid}>
              {filteredLinks && filteredLinks.length > 0 ? (
                filteredLinks.map((link: IModernLinkPresenterLinkItem, idx: number) => {
                  const tileContent = (
                    <>
                      <div className={styles.tileIcon}>
                        {link.icon && <Icon iconName={link.icon} />}
                      </div>
                      <div className={styles.tileTitle}>{link.title}</div>
                      {link.description && (
                        <div className={styles.tileDescription} style={{ color: getContrastYIQ(link.color) }}>{link.description}</div>
                      )}
                    </>
                  );
                  if (showTileButton !== false) {
                    return (
                      <div
                        key={idx}
                        className={
                          styles.tile + ' ' +
                          (tileHoverEffect && styles[`tile--${tileHoverEffect}`] ? styles[`tile--${tileHoverEffect}`] : styles['tile--lift'])
                        }
                        style={{
                          width: tileWidth,
                          minHeight: tileHeight,
                          background: link.color || undefined,
                          color: getContrastYIQ(link.color)
                        }}
                      >
                        {tileContent}
                        <a
                          href={link.target === 'dialog' ? undefined : link.url}
                          target={link.target !== 'dialog' ? (link.target || '_blank') : undefined}
                          rel="noreferrer"
                          className={styles.tileButton}
                          onClick={link.target === 'dialog' ? (e) => { e.preventDefault(); this.openDialog(link.url, link.title); } : undefined}
                        >
                          {tileButtonText}
                        </a>
                      </div>
                    );
                  } else {
                    return (
                      <a
                        key={idx}
                        href={link.target === 'dialog' ? undefined : link.url}
                        target={link.target !== 'dialog' ? (link.target || '_blank') : undefined}
                        rel="noreferrer"
                        className={
                          styles.tile + ' ' +
                          (tileHoverEffect && styles[`tile--${tileHoverEffect}`] ? styles[`tile--${tileHoverEffect}`] : styles['tile--lift'])
                        }
                        style={{
                          width: tileWidth,
                          minHeight: tileHeight,
                          background: link.color || undefined,
                          color: getContrastYIQ(link.color),
                          textDecoration: 'none'
                        }}
                        onClick={link.target === 'dialog' ? (e) => { e.preventDefault(); this.openDialog(link.url, link.title); } : undefined}
                      >
                        {tileContent}
                      </a>
                    );
                  }
                })
              ) : (
                <div>No links configured.</div>
              )}
            </div>
          )}
        </div>
        <Dialog
          hidden={!this.state.dialogOpen}
          onDismiss={this.closeDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: this.state.dialogTitle,
            topButtonsProps: [
              {
                ariaLabel: this.state.dialogMaximized ? 'Restore' : 'Maximize',
                iconProps: { iconName: this.state.dialogMaximized ? 'BackToWindow' : 'FullScreen' },
                onClick: this.toggleDialogMaximize
              }
            ]
          }}
          minWidth={this.state.dialogMaximized ? '100vw' : 600}
          maxWidth={this.state.dialogMaximized ? '100vw' : 900}
          styles={this.state.dialogMaximized ? { main: { maxWidth: '100vw', width: '100vw', height: '100vh', top: 0, left: 0, margin: 0, padding: 0 } } : {}}
        >
          <iframe src={this.state.dialogUrl} style={{ width: '100%', height: this.state.dialogMaximized ? '80vh' : '60vh', border: 'none' }} title={this.state.dialogTitle} />
          <DialogFooter>
            <PrimaryButton onClick={this.closeDialog} text="Close" />
          </DialogFooter>
        </Dialog>
      </section>
    );
  }
}