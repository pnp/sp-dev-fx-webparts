import * as React from 'react';
import styles from './SmartSupportRequest.module.scss';
import type { ISmartSupportRequestProps } from './ISmartSupportRequestProps';
import {
  categories, contactMethods, draftSchema, emptyDraft, impacts, missingFields,
  sampleDraft, urgencies, validatePatch, type SupportDraft
} from '../supportModel';
import { getWebMcpHost, toolResult, type ToolResult } from '../webMcp';

interface SupportState {
  draft: SupportDraft;
  stage: 'edit' | 'review' | 'submitted';
  reviewed: boolean;
  status: string;
  toolStatus: string;
  toolError: boolean;
  receipt?: { id: string; created: string; draft: SupportDraft };
}

export default class SmartSupportRequest extends React.Component<ISmartSupportRequestProps, SupportState> {
  public state: SupportState = {
    draft: { ...emptyDraft }, stage: 'edit', reviewed: false, status: '',
    toolStatus: 'Checking browser support...', toolError: false
  };

  private _disposed: boolean = false;
  private _registrationAbort: AbortController | undefined;
  private _unregister: (() => Promise<void>) | undefined;
  private _heading = React.createRef<HTMLHeadingElement>();

  private get _toolName(): string {
    return `fill_support_request_${this.props.instanceId.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80)}`;
  }

  private _reportToolError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Smart Support Request WebMCP:', error);
    if (!this._disposed) this.setState({ toolStatus: `WebMCP error: ${message}. You can still fill the form manually.`, toolError: true });
  }

  private async _registerTool(): Promise<void> {
    try {
      const host = getWebMcpHost();
      if (!host) {
        this.setState({ toolStatus: 'Manual mode. WebMCP is not available in this browser.' });
        return;
      }
      const name = this._toolName;
      const controller = new AbortController();
      this._registrationAbort = controller;
      await host.context.registerTool({
        name,
        description: 'Fill or update the visible Smart Support Request draft from the user request. ' +
          'Provide only known fields; omitted fields stay unchanged. This does NOT submit a ticket. ' +
          'The user must review the form and explicitly submit a MOCK request using the page. ' +
          'Do not invent missing details or include passwords, credentials, or sensitive data.',
        inputSchema: draftSchema,
        execute: this._fillFromAgent
      }, { signal: controller.signal });
      this._unregister = async () => {
        controller.abort();
        if (host.context.unregisterTool) await host.context.unregisterTool(name);
      };
      if (this._disposed) {
        await this._unregister();
        return;
      }
      this.setState({ toolStatus: `WebMCP ready via ${host.surface}. Draft-only tool registered.` });
    } catch (error) {
      if (!this._disposed) this._reportToolError(error);
    }
  }

  public componentDidMount(): void {
    this._registerTool().catch(error => this._reportToolError(error));
  }

  public componentWillUnmount(): void {
    this._disposed = true;
    this._registrationAbort?.abort();
    if (this._unregister) this._unregister().catch(error => this._reportToolError(error));
  }

  private _fillFromAgent = async (input: unknown): Promise<ToolResult> => {
    if (this._disposed) return toolResult({ error: 'This form is no longer mounted.' }, true);
    const validation = validatePatch(input);
    if (!validation.valid) {
      this.setState({ status: `Agent draft rejected: ${validation.errors.join(' ')}` });
      return toolResult({ errors: validation.errors, updated: false }, true);
    }
    const patch = validation.patch;
    return new Promise<ToolResult>(resolve => {
      this.setState(previous => ({
        draft: { ...previous.draft, ...patch }, stage: 'edit', reviewed: false,
        status: 'Agent updated your draft. Check every field, then review and submit the mock request.'
      }), () => {
        resolve(toolResult({
          status: 'draft_updated', submitted: false, requiresHumanReview: true,
          changedFields: Object.keys(patch), missingRequiredFields: missingFields(this.state.draft)
        }));
      });
    });
  };

  private _change<K extends keyof SupportDraft>(key: K, value: SupportDraft[K]): void {
    this.setState(previous => ({
      draft: { ...previous.draft, [key]: value }, stage: 'edit', reviewed: false, status: ''
    }));
  }

  private _loadSample = (): void => {
    this.setState({
      draft: { ...sampleDraft }, stage: 'edit', reviewed: false,
      status: 'Sample draft loaded. No AI or network request was used.'
    });
  };

  private _reset = (): void => {
    this.setState({ draft: { ...emptyDraft }, stage: 'edit', reviewed: false, receipt: undefined, status: 'Draft cleared.' });
  };

  private _review = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const missing = missingFields(this.state.draft);
    if (missing.length) {
      this.setState({ status: `Complete the required fields: ${missing.join(', ')}.` });
      return;
    }
    this.setState({ stage: 'review', reviewed: false, status: '' }, () => this._heading.current?.focus());
  };

  private _submit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (this.state.stage !== 'review' || !this.state.reviewed || missingFields(this.state.draft).length) {
      this.setState({ status: 'Review the current draft and confirm it before submitting.' });
      return;
    }
    this.setState({
      stage: 'submitted', reviewed: false, status: '',
      receipt: {
        id: `MOCK-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        created: new Date().toLocaleString(), draft: { ...this.state.draft }
      }
    }, () => this._heading.current?.focus());
  };

  private _summary(draft: SupportDraft): React.ReactElement {
    const fields: [string, string][] = [
      ['Summary', draft.title], ['Description', draft.description], ['Category', draft.category],
      ['Urgency', draft.urgency], ['Impact', draft.impact], ['Device', draft.device || 'Not specified'],
      ['Location', draft.location || 'Not specified'], ['Contact preference', draft.contactMethod]
    ];
    return <dl className={styles.summary}>{fields.map(([label, value]) =>
      <React.Fragment key={label}><dt>{label}</dt><dd>{value}</dd></React.Fragment>
    )}</dl>;
  }

  public render(): React.ReactElement<ISmartSupportRequestProps> {
    const { draft, stage, receipt } = this.state;
    const id = (field: string): string => `support-${this.props.instanceId}-${field}`;
    return (
      <section className={`${styles.smartSupportRequest} ${this.props.isDarkTheme ? styles.dark : ''}`} aria-label="Smart Support Request">
        <header className={styles.header}>
          <div className={styles.eyebrow}>IT SERVICE DESK <span>MOCK DEMO</span></div>
          <h1>Smart Support Request</h1>
          <p>{this.props.description || 'A little help, without the back-and-forth. Tell IT what is getting in your way.'}</p>
        </header>
        <div className={styles.notice}><strong>You are in a safe demo.</strong> No real tickets, email, or Teams messages are sent. Drafts and mock receipts live only in this page until you reload it. Use fictional details only.</div>
        <div className={styles.layout}>
          <main className={styles.card}>
            <div className={styles.steps} aria-label="Request progress">
              <span aria-current={stage === 'edit' ? 'step' : undefined}>1. Describe</span>
              <span aria-current={stage === 'review' ? 'step' : undefined}>2. Review</span>
              <span aria-current={stage === 'submitted' ? 'step' : undefined}>3. Mock receipt</span>
            </div>
            <p role="status" className={styles.status}>{this.state.status}</p>
            {stage === 'edit' && <form onSubmit={this._review}>
              <h2>What can we help with?</h2>
              <p className={styles.hint}>Fields marked * are required. You can type or let a WebMCP agent fill a draft.</p>
              <label htmlFor={id('title')}>Issue summary *</label>
              <input id={id('title')} name="title" value={draft.title} required maxLength={120} placeholder="e.g. My VPN keeps disconnecting" onChange={event => this._change('title', event.target.value)} />
              <label htmlFor={id('description')}>What is happening? *</label>
              <textarea id={id('description')} name="description" rows={5} value={draft.description} required maxLength={2000} placeholder="Include symptoms, when it started, and anything you have tried. Never include passwords." onChange={event => this._change('description', event.target.value)} />
              <div className={styles.fields}>
                <div><label htmlFor={id('category')}>Category</label>
                  <select id={id('category')} value={draft.category} onChange={event => this._change('category', event.target.value as SupportDraft['category'])}>{categories.map(value => <option key={value}>{value}</option>)}</select></div>
                <div><label htmlFor={id('urgency')}>Urgency</label>
                  <select id={id('urgency')} value={draft.urgency} onChange={event => this._change('urgency', event.target.value as SupportDraft['urgency'])}>{urgencies.map(value => <option key={value}>{value}</option>)}</select></div>
                <div><label htmlFor={id('impact')}>Who is affected?</label>
                  <select id={id('impact')} value={draft.impact} onChange={event => this._change('impact', event.target.value as SupportDraft['impact'])}>{impacts.map(value => <option key={value}>{value}</option>)}</select></div>
                <div><label htmlFor={id('contact')}>Contact preference</label>
                  <select id={id('contact')} value={draft.contactMethod} onChange={event => this._change('contactMethod', event.target.value as SupportDraft['contactMethod'])}>{contactMethods.map(value => <option key={value}>{value}</option>)}</select></div>
                <div><label htmlFor={id('device')}>Device <span>(optional)</span></label>
                  <input id={id('device')} value={draft.device} maxLength={100} placeholder="e.g. DEMO-LAPTOP-042" onChange={event => this._change('device', event.target.value)} /></div>
                <div><label htmlFor={id('location')}>Location <span>(optional)</span></label>
                  <input id={id('location')} value={draft.location} maxLength={100} placeholder="e.g. Remote" onChange={event => this._change('location', event.target.value)} /></div>
              </div>
              <div className={styles.actions}><button type="submit" className={styles.primary}>Review request</button><button type="button" onClick={this._reset}>Clear draft</button></div>
            </form>}
            {stage === 'review' && <form onSubmit={this._submit}>
              <h2 tabIndex={-1} ref={this._heading}>Review your request</h2>
              <p className={styles.hint}>Check the details below. Nothing has been submitted.</p>
              {this._summary(draft)}
              <label className={styles.confirm}><input type="checkbox" checked={this.state.reviewed} required onChange={event => this.setState({ reviewed: event.target.checked })} />I have reviewed these details and want to create a mock receipt.</label>
              <div className={styles.actions}><button type="submit" className={styles.primary} disabled={!this.state.reviewed}>Submit mock request</button><button type="button" onClick={() => this.setState({ stage: 'edit', reviewed: false })}>Back to edit</button></div>
            </form>}
            {stage === 'submitted' && receipt && <div>
              <div className={styles.successTag}>MOCK REQUEST COMPLETE</div>
              <h2 tabIndex={-1} ref={this._heading}>Your demo receipt is ready</h2>
              <p><strong>{receipt.id}</strong> <span className={styles.hint}>{receipt.created}</span></p>
              <p>No ticket was created in an IT system. This receipt is temporary and disappears on reload.</p>
              {this._summary(receipt.draft)}
              <button type="button" className={styles.primary} onClick={this._reset}>Start a new request</button>
            </div>}
          </main>
          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <div className={styles.eyebrow}>YOUR DRAFT, YOUR CONTROL</div>
              <h2>Describe it. Let an agent draft it.</h2>
              <p>In WebMCP Explorer, try this fictional request:</p>
              <blockquote>&quot;My demo laptop VPN keeps disconnecting during Teams calls. I work remotely and it is blocking my work. I already tried restarting. Contact me in Teams.&quot;</blockquote>
              <p>The agent fills the same form you see. You can change anything before reviewing it.</p>
              <button type="button" onClick={this._loadSample}>Load sample draft</button>
              <p className={styles.hint}>Sample only, not an AI call.</p>
            </div>
            <div className={styles.card}>
              <h3>Agent connection</h3>
              <p role="status" className={this.state.toolError ? styles.error : styles.connection}>{this.state.toolStatus}</p>
              <code className={styles.toolName}>{this._toolName}</code>
              <p className={styles.hint}>Only draft filling is exposed. There is no submit tool.</p>
              <details><summary>Connect WebMCP Explorer</summary>
                <p>Use an up-to-date Edge Canary or Dev build. Enable <code>edge://flags/#enable-webmcp-testing</code> and restart Edge.</p>
                <p>Load <a href="https://github.com/MicrosoftEdge/webmcp-labs/tree/main/webmcp-explorer" target="_blank" rel="noreferrer">WebMCP Explorer</a>, then configure a tool-capable AI provider in its Config tab. Keep API keys in the extension, not this web part.</p>
                <p>Copilot in Edge does not currently offer public WebMCP integration. Use Explorer&apos;s Tools, Chat, or Agent tab instead.</p>
              </details>
            </div>
            <p className={styles.hint}>AI providers may receive prompts and tool metadata through Explorer. Use fictional data and a trusted provider.</p>
          </aside>
        </div>
      </section>
    );
  }
}
