import * as React from 'react';
import type { ILegalLensProps } from './ILegalLensProps';
import {
  Library24Regular,
  ArrowUpload24Regular,
  DocumentSearch24Regular,
  LocalLanguage24Regular,
  Alert24Regular,
  Alert24Filled,
  ScalesRegular,
  Signature24Regular,
} from '@fluentui/react-icons';
import { LibraryView } from './Tabs/Library/LibraryView';
import { ILegalLensState } from './ILegalLensState';
import { AlertsView } from './Tabs/Alerts/AlertsView';
import { TranslateView } from './Tabs/Translate/TranslateView';
import { ClassificationView } from './Tabs/Classification/ClassificationView';
import { ESignatureView } from './Tabs/ESignature/ESignatureView';
import { UploadView } from './Tabs/Upload/UploadView';
import styles from './LegalLens.module.scss';

export default class LegalLens extends React.Component<ILegalLensProps, ILegalLensState> {
  private pulseInterval: any;
  private _isMounted: boolean;

  constructor(props: ILegalLensProps) {
    super(props);
    this.state = {
      view: 'library',
      contracts: [],
      loading: true,
      error: null,
      uploadedFile: null,
      fullAnalysis: null,
      pulseAlert: false
    };
    this._isMounted = false;
  }

  public componentDidMount(): void {
    this._isMounted = true;
    this.loadContracts();
    this.pulseInterval = setInterval(() => {
      if (this._isMounted) {
        this.setState(prev => ({ pulseAlert: !prev.pulseAlert }));
      }
    }, 2200);
  }

  public componentWillUnmount(): void {
    this._isMounted = false;
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
  }

  private async loadContracts(silent = false): Promise<void> {
    try {
      if (!silent && this._isMounted) this.setState({ loading: true, error: null });
      const contracts = await this.props.sharePointService.getContracts();
      if (this._isMounted) this.setState({ contracts, loading: false });
    } catch (error) {
      console.error('Error loading contracts:', error);
      if (this._isMounted) {
        this.setState({
          loading: false,
          error: 'Failed to load contracts. Please check configuration and try again.'
        });
      }
    }
  }

  private handleAnalysisComplete = (
    file: File,
    fullAnalysis: { contractType?: any; riskAssessment?: any; compliance?: any; entities?: any }
  ): void => {
    if (this._isMounted) this.setState({ uploadedFile: file, fullAnalysis });
  };

  public render(): React.ReactElement<ILegalLensProps> {
    const { loading, error } = this.state;

    if (loading) {
      return (
        <div className={styles.loadingWrap}>
          <div className={styles.loadingCenter}>
            <div className={styles.loadingSpinner} />
            <div className={styles.loadingText}>Loading contracts...</div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.errorWrap}>
          <div className={styles.errorCenter}>
            <div className={styles.errorEmoji}>Warning</div>
            <div className={styles.errorTitle}>Error Loading Contracts</div>
            <div className={styles.errorMessage}>{error}</div>
            <button onClick={() => this.loadContracts()} className={styles.errorRetry}>Retry</button>
          </div>
        </div>
      );
    }

    const themeClass =
      { dark: styles.themeDark, light: styles.themeLight, site: styles.themeSite }[this.props.colorScheme]
      ?? styles.themeDark;

    return (
      <div className={`legallens-wp ${styles.appWrap} ${themeClass}`}>
        <style>{`
          @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
          @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
          @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(0.95)}}
          @keyframes spin{to{transform:rotate(360deg)}}
          @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
          .legallens-wp .card-row:hover{background:rgba(255,255,255,0.05);transform:translateX(4px);}
          .legallens-wp .card-row{transition:all 0.3s cubic-bezier(0.4,0,0.2,1);}
        `}</style>

        {this.renderHeader()}

        <main className={styles.appMain}>
          <div className={styles.appContent}>
            {this.renderView()}
          </div>
        </main>
      </div>
    );
  }

  // ─── Header ─────────────────────────────────────────────────────────────────
  // Responsive layout:
  //   Mobile  (<769px): Row-1 = [Logo .............. Alert]
  //                     Row-2 = [Tab1][Tab2][Tab3]→ scroll
  //   Desktop (≥769px): Single row = [Logo][Tab1][Tab2][Tab3]...[Alert]
  // ─────────────────────────────────────────────────────────────────────────────
  private renderHeader(): React.ReactElement {
    const { view } = this.state;

    const tabs = [
      { key: 'library',    label: 'Library',         highlight: false, visible: true },
      { key: 'upload',     label: 'Upload & Analyze', highlight: true,  visible: true },
      { key: 'classify',   label: 'Classification',  highlight: false, visible: true },
      { key: 'translate',  label: 'TranslatePro',    highlight: false, visible: this.props.showTranslateTab },
      { key: 'esignature', label: 'E-Signature',     highlight: true,  visible: this.props.showESignatureTab },
    ].filter(t => t.visible);

    const icon = (key: string): React.ReactElement => {
      const c = styles.navIcon;
      if (key === 'library')    return <Library24Regular    className={c} />;
      if (key === 'upload')     return <ArrowUpload24Regular className={c} />;
      if (key === 'classify')   return <DocumentSearch24Regular className={c} />;
      if (key === 'translate')  return <LocalLanguage24Regular  className={c} />;
      if (key === 'esignature') return <Signature24Regular  className={c} />;
      return <Library24Regular className={c} />;
    };

    return (
      <header className={styles.appHeader}>

        {/* ── Top bar: logo (left) + alert (right) ── */}
        <div className={styles.headerTop}>
          <div className={styles.headerLogo}>
            <ScalesRegular className={styles.headerIcon} />
            <span className={styles.headerTitle}>LegalLens</span>
          </div>

          <button
            className={[
              styles.navBtn,
              styles.navBtnAlert,
              view === 'alerts' ? styles.navBtnActive : ''
            ].filter(Boolean).join(' ')}
            onClick={() => this.setState({ view: 'alerts' as any })}
            title="Alerts"
            aria-label="Alerts"
          >
            {view === 'alerts'
              ? <Alert24Filled  className={styles.navIcon} />
              : <Alert24Regular className={styles.navIcon} />}
          </button>
        </div>

        {/* ── Tabs row: horizontally scrollable on mobile ── */}
        <nav className={styles.headerNav} aria-label="Main navigation">
          <div className={styles.navScrollArea}>
            <div className={styles.navGroup}>
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  className={[
                    styles.navBtn,
                    view === tab.key
                      ? (tab.highlight ? styles.navBtnActiveHighlight : styles.navBtnActive)
                      : ''
                  ].filter(Boolean).join(' ')}
                  onClick={() => this.setState({ view: tab.key as any })}
                  aria-current={view === tab.key ? 'page' : undefined}
                >
                  {icon(tab.key)}
                  <span className={styles.navLabel}>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

      </header>
    );
  }

  // ─── View router ─────────────────────────────────────────────────────────────
  private renderView(): React.ReactElement {
    switch (this.state.view) {
      case 'library':
        return <LibraryView sharePointService={this.props.sharePointService} aiFoundryService={this.props.aiFoundryService} langs={this.props.langs} />;
      case 'upload':
        return (
          <UploadView
            contracts={this.state.contracts}
            sharePointService={this.props.sharePointService}
            aiFoundryService={this.props.aiFoundryService}
            onAnalysisComplete={this.handleAnalysisComplete}
            onContractSaved={() => this.loadContracts(true)}
          />
        );
      case 'classify':
        return <ClassificationView contracts={this.state.contracts} sharePointService={this.props.sharePointService} aiFoundryService={this.props.aiFoundryService} uploadedFile={this.state.uploadedFile} fullAnalysis={this.state.fullAnalysis} />;
      case 'translate':
        return <TranslateView contracts={this.state.contracts} aiFoundryService={this.props.aiFoundryService} langs={this.props.langs} />;
      case 'alerts':
        return <AlertsView contracts={this.state.contracts} />;
      case 'esignature':
        return (
          <ESignatureView
            contracts={this.state.contracts}
            sharePointService={this.props.sharePointService}
            userDisplayName={this.props.userDisplayName}
            userEmail={this.props.userEmail}
            context={this.props.context}
          />
        );
      default:
        return <LibraryView sharePointService={this.props.sharePointService} aiFoundryService={this.props.aiFoundryService} langs={this.props.langs} />;
    }
  }
}