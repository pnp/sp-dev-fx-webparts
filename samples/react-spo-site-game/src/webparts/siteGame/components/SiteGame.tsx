import * as React from 'react';
import { Spinner, SpinnerSize } from '@fluentui/react';
import styles from './SiteGame.module.scss';
import type { ISiteGameProps } from './ISiteGameProps';
import { InfoPanel } from './InfoPanel/InfoPanel';
import { SharePointService } from '../services/SharePointService';
import { MapGenerator } from '../game/MapGenerator';
import { GameEngine } from '../game/GameEngine';
import { IInfoTarget } from '../game/types/IInfoTarget';
import { IGameState } from '../game/types/IGameState';
import { GameConfig } from '../game/constants/GameConfig';
import { MusicEngine } from '../game/audio/MusicEngine';
import { PlayerType } from '../game/types/IPlayer';

interface ISiteGameState {
  loading: boolean;
  // eslint-disable-next-line @rushstack/no-new-null
  error: string | null;
  // eslint-disable-next-line @rushstack/no-new-null
  infoTarget: IInfoTarget | null;
  toasts: Array<{ id: number; text: string }>;
  tooNarrow: boolean;
  // eslint-disable-next-line @rushstack/no-new-null
  playerType: PlayerType | null;
}

const GAME_HEIGHT = 480;
let toastCounter = 0;

export default class SiteGame extends React.Component<ISiteGameProps, ISiteGameState> {
  private canvasRef = React.createRef<HTMLCanvasElement>();
  private containerRef = React.createRef<HTMLDivElement>();
  private engine: GameEngine | null = null;
  private musicEngine: MusicEngine | null = null;
  private spService: SharePointService;
  private resizeObserver: ResizeObserver | null = null;
  private gameState: IGameState | null = null;
  private _lastResizeW: number = 0;
  private _resizeRAF: number = 0;

  constructor(props: ISiteGameProps) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      infoTarget: null,
      toasts: [],
      tooNarrow: false,
      playerType: null,
    };
    this.spService = new SharePointService(props.spHttpClient, props.siteAbsoluteUrl);
  }

  public async componentDidMount(): Promise<void> {
    // Check width
    const containerEl = this.containerRef.current;
    if (!containerEl) return;
    const width = containerEl.clientWidth;
    if (width < 400) {
      this.setState({ loading: false, tooNarrow: true });
      return;
    }

    // Always initialize game—GameEngine will show character selector if needed
    await this.initializeGame(width);

    // Pause when tab hidden
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private async initializeGame(width: number): Promise<void> {
    const containerEl = this.containerRef.current;
    try {
      const data = await this.spService.fetchAll();
      const generator = new MapGenerator();
      const state = generator.buildWorld(data, width, GAME_HEIGHT, {
        maxBots: this.props.maxBots,
        enableEasterEggs: this.props.enableEasterEggs,
        enableM365EasterEggs: this.props.enableM365EasterEggs,
        showEmptyLists: this.props.showEmptyLists,
      });
      this.gameState = state;

      const canvas = this.canvasRef.current;
      if (!canvas) return;

      canvas.width = width;
      canvas.height = GAME_HEIGHT;
      canvas.focus();

      this.engine = new GameEngine(
        canvas,
        state,
        (target) => this.setState({ infoTarget: target }),
        (eggId, name) => this.showEggToast(eggId, name),
        (playerType) => this.setState({ playerType })
      );
      this.engine.start();
      this.engine.setTheme(this.props.gameTheme || 'village');
      this.engine.setSoundEnabled(this.props.enableMusic);
      this.engine.setUfoAbductions(this.props.enableUfoAbductions);

      if (this.props.enableMusic) {
        this.musicEngine = new MusicEngine();
        this.musicEngine.setTheme(this.props.gameTheme || 'village');
        this.musicEngine.start();
      }

      // ResizeObserver for responsive canvas
      this.resizeObserver = new ResizeObserver((entries) => {
        // Debounce via rAF to avoid triggering during React's own re-render
        cancelAnimationFrame(this._resizeRAF);
        this._resizeRAF = requestAnimationFrame(() => {
          for (const entry of entries) {
            const newW = Math.round(entry.contentRect.width);
            // Skip if width hasn't meaningfully changed to break potential loops
            if (Math.abs(newW - this._lastResizeW) < 2) continue;
            this._lastResizeW = newW;

            if (newW > 0 && newW < 400) {
              if (!this.state.tooNarrow) {
                this.setState({ tooNarrow: true });
              }
              this.engine?.stop();
              this.musicEngine?.stop();
            } else if (newW >= 400) {
              if (this.state.tooNarrow) {
                this.setState({ tooNarrow: false });
              }
              this.engine?.resizeViewport(newW, GAME_HEIGHT);
              this.engine?.start();
              if (this.props.enableMusic) this.musicEngine?.start();
            }
          }
        });
      });
      this._lastResizeW = width;
      this.resizeObserver.observe(containerEl!);

      this.setState({ loading: false });
    } catch (err) {
      this.setState({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load site data.',
      });
    }
  }

  public componentDidUpdate(prevProps: ISiteGameProps): void {
    if (prevProps.gameTheme !== this.props.gameTheme) {
      this.engine?.setTheme(this.props.gameTheme || 'village');
      this.musicEngine?.setTheme(this.props.gameTheme || 'village');
    }
    if (prevProps.enableMusic !== this.props.enableMusic) {
      this.engine?.setSoundEnabled(this.props.enableMusic);
      if (this.props.enableMusic) {
        if (!this.musicEngine) this.musicEngine = new MusicEngine();
        this.musicEngine.setTheme(this.props.gameTheme || 'village');
        this.musicEngine.start();
      } else {
        this.musicEngine?.stop();
      }
    }
    if (prevProps.enableUfoAbductions !== this.props.enableUfoAbductions) {
      this.engine?.setUfoAbductions(this.props.enableUfoAbductions);
    }
    if (
      prevProps.enableEasterEggs !== this.props.enableEasterEggs ||
      prevProps.enableM365EasterEggs !== this.props.enableM365EasterEggs ||
      prevProps.maxBots !== this.props.maxBots ||
      prevProps.showEmptyLists !== this.props.showEmptyLists
    ) {
      const containerEl = this.containerRef.current;
      if (containerEl) {
        const width = containerEl.clientWidth;
        this.initializeGame(width).catch(() => undefined);
      }
    }
  }

  public componentWillUnmount(): void {
    cancelAnimationFrame(this._resizeRAF);
    this.engine?.destroy();
    this.musicEngine?.dispose();
    this.resizeObserver?.disconnect();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleVisibilityChange = (): void => {
    // GameEngine's delta cap handles resume; stop/start is clean enough for SPFx
    if (document.hidden) {
      this.engine?.stop();
      this.musicEngine?.stop();
    } else if (!this.state.loading && !this.state.error && this.engine) {
      this.engine.start();
      if (this.props.enableMusic) this.musicEngine?.start();
    }
  };

  private showEggToast(_eggId: string, name: string): void {
    const id = ++toastCounter;
    const text = `🥚 Easter Egg Discovered: ${name}!`;
    this.setState((prev) => ({ toasts: [...prev.toasts, { id, text }] }));
    setTimeout(() => {
      this.setState((prev) => ({
        toasts: prev.toasts.filter((t) => t.id !== id),
      }));
    }, 3200);
  }

  private async handleRefresh(): Promise<void> {
    this.engine?.destroy();
    this.engine = null;
    this.gameState = null;
    this.setState({ loading: true, error: null, infoTarget: null, toasts: [] });

    const containerEl = this.containerRef.current;
    if (!containerEl) return;
    const width = containerEl.clientWidth;

    try {
      const data = await this.spService.fetchAll();
      const generator = new MapGenerator();
      const state = generator.buildWorld(data, width, GAME_HEIGHT, {
        maxBots: this.props.maxBots,
        enableEasterEggs: this.props.enableEasterEggs,
        enableM365EasterEggs: this.props.enableM365EasterEggs,
        showEmptyLists: this.props.showEmptyLists,
      });
      this.gameState = state;

      const canvas = this.canvasRef.current;
      if (!canvas) return;

      canvas.width = width;
      canvas.height = GAME_HEIGHT;
      canvas.focus();

      this.engine = new GameEngine(
        canvas,
        state,
        (target) => this.setState({ infoTarget: target }),
        (_eggId, name) => this.showEggToast(_eggId, name)
      );
      this.engine.start();
      this.engine.setTheme(this.props.gameTheme || 'village');
      this.engine.setSoundEnabled(this.props.enableMusic);
      this.engine.setUfoAbductions(this.props.enableUfoAbductions);

      if (this.props.enableMusic) {
        if (!this.musicEngine) this.musicEngine = new MusicEngine();
        this.musicEngine.setTheme(this.props.gameTheme || 'village');
        this.musicEngine.start();
      }

      this.setState({ loading: false });
    } catch (err) {
      this.setState({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to reload site data.',
      });
    }
  }

  public render(): React.ReactElement {
    const { hasTeamsContext, description } = this.props;
    const { loading, error, infoTarget, toasts, tooNarrow } = this.state;
    const siteTitle = this.gameState?.siteTitle;

    return (
      <section
        className={`${styles.siteGame} ${hasTeamsContext ? styles.teams : ''}`}
        aria-label={description || 'Site World — Interactive SharePoint Town'}
        role="application"
      >
        <div ref={this.containerRef} className={styles.gameContainer}>
          {/* Too narrow */}
          {tooNarrow && (
            <div className={styles.tooNarrow}>
              <p>🏙️ Site World requires at least 400px width to display.</p>
              <p style={{ fontSize: 12 }}>Try widening this web part zone.</p>
            </div>
          )}

          {/* Site title + refresh bar */}
          {!loading && !error && !tooNarrow && (
            <div className={styles.titleBar}>
              <span className={styles.siteTitleLabel}>{siteTitle || 'Site World'}</span>
              <button
                className={styles.refreshButton}
                // eslint-disable-next-line no-void
                onClick={() => { void this.handleRefresh(); }}
                title="Refresh world from SharePoint"
                aria-label="Refresh world"
              >
                ↺ Refresh
              </button>
            </div>
          )}

          {/* Canvas (always in DOM so ref resolves) */}
          {!tooNarrow && (
            <canvas
              ref={this.canvasRef}
              className={styles.gameCanvas}
              tabIndex={0}
              aria-label="Site World game canvas. Use WASD or arrow keys to move. Press E or Enter to interact."
              style={{ height: GAME_HEIGHT }}
            />
          )}

          {/* Loading overlay */}
          {loading && !tooNarrow && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingTitle}>
                {GameConfig.TILE_SIZE > 0 ? '🏙️ Building Your Town...' : ''}
              </div>
              <Spinner size={SpinnerSize.large} />
              <div className={styles.loadingSubtitle}>
                Scanning site lists, libraries &amp; members...
              </div>
            </div>
          )}

          {/* Error overlay */}
          {error && !tooNarrow && (
            <div className={styles.errorOverlay}>
              <p>⚠️ Could not load Site World</p>
              <p style={{ fontSize: 12 }}>{error}</p>
            </div>
          )}

          {/* Toast notifications */}
          <div className={styles.toastContainer} aria-live="polite">
            {toasts.map((t) => (
              <div key={t.id} className={styles.toast}>
                {t.text}
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel (Fluent UI slide-in) */}
        {!loading && !error && (
          <InfoPanel
            target={infoTarget}
            siteAbsoluteUrl={this.props.siteAbsoluteUrl}
            spHttpClient={this.props.spHttpClient}
            onDismiss={() => {
              this.engine?.clearInfoTarget();
              this.setState({ infoTarget: null });
            }}
          />
        )}
      </section>
    );
  }
}
