import { GameTheme } from '../constants/GameThemes';

interface Step {
  freq: number; // Hz, 0 = rest
  beats: number;
}

interface IThemeMusic {
  bpm: number;
  melodyWave: OscillatorType;
  bassWave: OscillatorType;
  gain: number;
  melody: Step[];
  bass: Step[];
}

const F: Record<string, number> = {
  C2: 65.41, G2: 98.00, Ab2: 103.83,
  C3: 130.81, D3: 146.83, Eb3: 155.56, F3: 174.61,
  G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08,
  C4: 261.63, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23,
  G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46,
  G5: 783.99, A5: 880.00, Bb5: 932.33,
};

const n = (freq: number, beats: number): Step => ({ freq, beats });
const r = (beats: number): Step => ({ freq: 0, beats });

const MUSIC: Record<GameTheme, IThemeMusic> = {
  // ── Village: bright, upbeat medieval folk, triangle lead + square bass ────
  village: {
    bpm: 130,
    melodyWave: 'triangle',
    bassWave: 'square',
    gain: 0.15,
    melody: [
      n(F.C5, 0.5), n(F.E5, 0.5), n(F.G5, 0.5), n(F.E5, 0.5),
      n(F.D5, 0.5), n(F.F5, 0.5), n(F.E5, 1),
      n(F.A4, 0.5), n(F.C5, 0.5), n(F.E5, 0.5), n(F.D5, 0.5),
      n(F.C5, 0.5), n(F.G4, 0.5), n(F.A4, 1),
      n(F.C5, 0.5), n(F.D5, 0.5), n(F.E5, 0.5), n(F.G5, 0.5),
      n(F.A5, 0.5), n(F.G5, 0.5), n(F.E5, 0.5), n(F.D5, 0.5),
      n(F.C5, 0.5), n(F.E5, 0.5), n(F.G5, 1),
      r(1),
    ],
    bass: [
      n(F.C3, 1), n(F.G3, 1), n(F.F3, 1), n(F.G3, 1),
      n(F.C3, 1), n(F.G3, 1), n(F.F3, 1), n(F.G3, 1),
    ],
  },

  // ── Space: slow, mysterious minor arpeggios, sine lead + sine bass ────────
  space: {
    bpm: 72,
    melodyWave: 'sine',
    bassWave: 'sine',
    gain: 0.12,
    melody: [
      n(F.C4, 2), n(F.Eb4, 2), n(F.G4, 2), n(F.Bb4, 2),
      n(F.Ab4, 2), n(F.G4, 2), n(F.Eb4, 2), n(F.C4, 2),
      n(F.F4, 2), n(F.Ab4, 2), n(F.C5, 2), n(F.Eb5, 2),
      n(F.D5, 2), n(F.C5, 2), n(F.Bb4, 2), n(F.G4, 2),
    ],
    bass: [
      n(F.C2, 4), n(F.G2, 4),
      n(F.Ab2, 4), n(F.G2, 4),
    ],
  },

  // ── SP 2013 Retro: 8-bit office chiptune, square lead + square bass ───────
  retro2013: {
    bpm: 110,
    melodyWave: 'square',
    bassWave: 'square',
    gain: 0.10,
    melody: [
      n(F.E5, 0.5), n(F.D5, 0.5), n(F.E5, 0.5), n(F.G5, 0.5),
      n(F.A5, 0.5), n(F.G5, 0.5), n(F.E5, 0.5), r(0.5),
      n(F.C5, 0.5), n(F.D5, 0.5), n(F.E5, 0.5), n(F.F5, 0.5),
      n(F.G5, 1), n(F.E5, 1),
      n(F.A5, 0.5), n(F.G5, 0.5), n(F.E5, 0.5), n(F.D5, 0.5),
      n(F.C5, 0.5), n(F.D5, 0.5), n(F.E5, 0.5), n(F.G5, 0.5),
      n(F.E5, 0.5), n(F.D5, 0.5), n(F.C5, 1),
      r(1),
    ],
    bass: [
      n(F.C3, 1), n(F.C3, 1), n(F.G3, 1), n(F.G3, 1),
      n(F.F3, 1), n(F.F3, 1), n(F.G3, 1), n(F.G3, 1),
    ],
  },

  // ── Big City Life: jazzy urban blues, sawtooth lead + triangle bass ───────
  bigcity: {
    bpm: 100,
    melodyWave: 'sawtooth',
    bassWave: 'triangle',
    gain: 0.12,
    melody: [
      n(F.C4, 0.5), n(F.Eb4, 0.5), n(F.F4, 0.5), n(F.G4, 0.5),
      n(F.Bb4, 1), n(F.G4, 0.5), n(F.F4, 0.5),
      n(F.Eb4, 0.5), n(F.C4, 0.5), n(F.D4, 0.5), n(F.Eb4, 0.5),
      n(F.F4, 1), r(1),
      n(F.G4, 0.5), n(F.Bb4, 0.5), n(F.C5, 0.5), n(F.Bb4, 0.5),
      n(F.Ab4, 1), n(F.G4, 0.5), n(F.F4, 0.5),
      n(F.Eb4, 0.5), n(F.D4, 0.5), n(F.C4, 1),
      r(1),
    ],
    bass: [
      n(F.C3, 1), n(F.Eb3, 1), n(F.F3, 1), n(F.G3, 1),
      n(F.Bb3, 1), n(F.Ab3, 1), n(F.G3, 1), n(F.F3, 1),
    ],
  },
};

export class MusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private schedulerTimer: ReturnType<typeof setInterval> | null = null;
  private activeTheme: GameTheme = 'village';
  private melodyStep = 0;
  private bassStep = 0;
  private nextMelodyTime = 0;
  private nextBassTime = 0;
  private running = false;
  private resumeHandler: (() => void) | null = null;

  private static readonly LOOK_AHEAD_SEC = 0.1;
  private static readonly SCHEDULE_INTERVAL_MS = 25;

  public start(): void {
    if (this.running) return;
    this.running = true;
    this.ensureContext();
    this.startScheduler();
  }

  public stop(): void {
    if (!this.running) return;
    this.running = false;
    this.stopScheduler();
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0, now + 0.1);
    }
  }

  public setTheme(theme: GameTheme): void {
    if (this.activeTheme === theme) return;
    this.activeTheme = theme;
    this.melodyStep = 0;
    this.bassStep = 0;
    if (this.ctx && this.masterGain && this.running) {
      const now = this.ctx.currentTime;
      this.nextMelodyTime = now + 0.15;
      this.nextBassTime = now + 0.15;
      const targetGain = MUSIC[theme].gain;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0, now + 0.05);
      this.masterGain.gain.linearRampToValueAtTime(targetGain, now + 0.2);
    }
  }

  public dispose(): void {
    this.stop();
    this.removeResumeHandler();
    if (this.ctx) {
      this.ctx.close().catch(() => undefined);
      this.ctx = null;
      this.masterGain = null;
    }
  }

  private ensureContext(): void {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = MUSIC[this.activeTheme].gain;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => undefined);
      // Fallback: resume on next user gesture (e.g. if autoplay blocked)
      if (!this.resumeHandler) {
        this.resumeHandler = () => {
          this.ctx?.resume().catch(() => undefined);
          this.removeResumeHandler();
        };
        document.addEventListener('click', this.resumeHandler);
        document.addEventListener('keydown', this.resumeHandler);
      }
    }
  }

  private removeResumeHandler(): void {
    if (this.resumeHandler) {
      document.removeEventListener('click', this.resumeHandler);
      document.removeEventListener('keydown', this.resumeHandler);
      this.resumeHandler = null;
    }
  }

  private startScheduler(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.nextMelodyTime = now;
    this.nextBassTime = now;
    this.schedulerTimer = setInterval(() => this.schedule(), MusicEngine.SCHEDULE_INTERVAL_MS);
  }

  private stopScheduler(): void {
    if (this.schedulerTimer !== null) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
  }

  private schedule(): void {
    if (!this.ctx || !this.masterGain) return;
    const music = MUSIC[this.activeTheme];
    const beatSec = 60 / music.bpm;
    const ahead = this.ctx.currentTime + MusicEngine.LOOK_AHEAD_SEC;

    while (this.nextMelodyTime < ahead) {
      const step = music.melody[this.melodyStep % music.melody.length];
      const dur = step.beats * beatSec;
      if (step.freq > 0) {
        this.scheduleNote(step.freq, music.melodyWave, this.nextMelodyTime, dur * 0.88, 0.7);
      }
      this.nextMelodyTime += dur;
      this.melodyStep = (this.melodyStep + 1) % music.melody.length;
    }

    while (this.nextBassTime < ahead) {
      const step = music.bass[this.bassStep % music.bass.length];
      const dur = step.beats * beatSec;
      if (step.freq > 0) {
        this.scheduleNote(step.freq, music.bassWave, this.nextBassTime, dur * 0.82, 0.5);
      }
      this.nextBassTime += dur;
      this.bassStep = (this.bassStep + 1) % music.bass.length;
    }
  }

  private scheduleNote(
    freq: number,
    wave: OscillatorType,
    startTime: number,
    duration: number,
    amplitude: number,
  ): void {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.type = wave;
    osc.frequency.value = freq;

    const attack = Math.min(0.01, duration * 0.1);
    const release = Math.min(0.05, duration * 0.15);

    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(amplitude, startTime + attack);
    noteGain.gain.setValueAtTime(amplitude, startTime + duration - release);
    noteGain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration);
    // Oscillator + gain node are GC'd automatically after osc.stop() fires
  }
}
