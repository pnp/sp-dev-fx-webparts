import { newGuid } from '../util/guid';
import type { SharePointDataService } from '../sharePointData/SharePointDataService';
import type { TelemetryService } from '../telemetry/TelemetryService';
import type { IAuditEntry, IAuditInput } from '../../models';

const SECRET_KEY_PATTERN: RegExp = /pass|tap|secret|credential|token/i;

export function redactSecrets(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(redactSecrets);
  }
  if (value && typeof value === 'object') {
    const source: Record<string, unknown> = value as Record<string, unknown>;
    const clone: Record<string, unknown> = {};
    for (const key of Object.keys(source)) {
      clone[key] = SECRET_KEY_PATTERN.test(key) ? '***redacted***' : redactSecrets(source[key]);
    }
    return clone;
  }
  return value;
}

export function summarizeRequest(method: string, endpoint: string, body?: unknown): string {
  const summary: { method: string; endpoint: string; body?: unknown } = { method, endpoint };
  if (body !== undefined) {
    summary.body = redactSecrets(body);
  }
  return JSON.stringify(summary).slice(0, 4000);
}

export class AuditService {
  private readonly _data: SharePointDataService;
  private readonly _actorUpn: string;
  private _telemetry: TelemetryService | undefined;

  public constructor(data: SharePointDataService, actorUpn: string) {
    this._data = data;
    this._actorUpn = actorUpn;
  }

  public setTelemetry(telemetry: TelemetryService): void {
    this._telemetry = telemetry;
  }

  public async log(input: IAuditInput): Promise<void> {
    const entry: IAuditEntry = {
      ...input,
      entryId: newGuid(),
      actor: this._actorUpn,
      timestampUtc: new Date().toISOString()
    };
    try {
      await this._data.addAuditEntry(entry);
    } catch (err) {
      console.warn('[UPC] audit write failed', err);
      this._telemetry?.trackError(err, { scope: 'audit.write', jobId: input.jobId, action: input.action });
    }
  }
}
