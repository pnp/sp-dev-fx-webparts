export class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private enabled = false;
  private lastStepTime = -1000;
  private stepToggle = false;

  private static readonly STEP_INTERVAL_MS = 300;

  // ── Public API ─────────────────────────────────────────────────────────────

  public setEnabled(on: boolean): void {
    this.enabled = on;
  }

  /**
   * Call every game frame while the player is moving. Internally throttled.
   * Uses the sync path: if context not ready yet it's a no-op and retries
   * automatically on the next interval.
   */
  public tickFootstep(gameTimeMs: number): void {
    if (!this.enabled) return;
    if (gameTimeMs - this.lastStepTime < SoundEngine.STEP_INTERVAL_MS) return;
    const ctx = this.getCtxSync();
    if (!ctx) return;

    this.lastStepTime = gameTimeMs;
    this.stepToggle = !this.stepToggle;

    const now = ctx.currentTime;
    // Alternating tap: higher freq = right foot, lower = left foot
    const startFreq = this.stepToggle ? 420 : 360;
    const endFreq   = this.stepToggle ? 180 : 140;
    const dur = 0.08;

    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.connect(g);
    g.connect(this.masterGain!);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + dur);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.7, now + 0.006);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.start(now);
    osc.stop(now + dur + 0.01);
  }

  /**
   * Play the ascending discovery jingle.
   * Uses the async path so the jingle is guaranteed to play even if this is
   * the very first audio event (context suspended → resumed → notes scheduled).
   */
  public playEggDiscovery(): void {
    if (!this.enabled) return;
    this.getCtxAsync((ctx) => {
      const now = ctx.currentTime;

      // C5 → E5 → G5 → C6 arpeggio + E6 harmony on the last note
      const schedule = [
        { freq: 261.63, at: 0.00, dur: 0.12, vol: 0.8 },
        { freq: 329.63, at: 0.13, dur: 0.12, vol: 0.8 },
        { freq: 392.00, at: 0.26, dur: 0.12, vol: 0.8 },
        { freq: 523.25, at: 0.39, dur: 0.40, vol: 0.8 },
        { freq: 659.25, at: 0.39, dur: 0.35, vol: 0.4 }, // E6 harmony
      ];

      for (const note of schedule) {
        const osc = ctx.createOscillator();
        const g   = ctx.createGain();
        osc.connect(g);
        g.connect(this.masterGain!);

        osc.type = 'triangle';
        osc.frequency.value = note.freq;

        const t = now + note.at;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(note.vol, t + 0.012);
        g.gain.setValueAtTime(note.vol, t + note.dur - 0.04);
        g.gain.linearRampToValueAtTime(0, t + note.dur);

        osc.start(t);
        osc.stop(t + note.dur + 0.01);
      }
    });
  }

  public dispose(): void {
    this.enabled = false;
    if (this.ctx) {
      this.ctx.close().catch(() => undefined);
      this.ctx = null;
      this.masterGain = null;
    }
  }

  // ── Private ────────────────────────────────────────────────────────────────

  /**
   * Create the AudioContext on demand once, then return it synchronously if
   * it is already 'running'. If still 'suspended', triggers resume() and
   * returns null so the caller can retry on the next interval.
   */
  private getCtxSync(): AudioContext | null {
    this.initCtxIfNeeded();
    if (!this.ctx) return null;
    if (this.ctx.state === 'running') return this.ctx;
    // Kick off async resume; caller will retry on the next throttle interval
    this.ctx.resume().catch(() => undefined);
    return null;
  }

  /**
   * Like getCtxSync but for one-shot events: if context is suspended it
   * waits for resume() to settle before invoking the callback, so the
   * sound is never silently dropped.
   */
  private getCtxAsync(callback: (ctx: AudioContext) => void): void {
    this.initCtxIfNeeded();
    if (!this.ctx) return;
    const ctx = this.ctx;
    if (ctx.state === 'running') {
      callback(ctx);
    } else {
      ctx.resume()
        .then(() => { if (ctx.state === 'running') callback(ctx); })
        .catch(() => undefined);
    }
  }

  private initCtxIfNeeded(): void {
    if (this.ctx) return;
    try {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.9;
      this.masterGain.connect(this.ctx.destination);
    } catch {
      // AudioContext unavailable (e.g. server-side render)
    }
  }
}
