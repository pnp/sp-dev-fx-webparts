export interface IInputSnapshot {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
  escape: boolean;
  mouseClick?: { x: number; y: number };
}

export class InputController {
  private pressed = new Set<string>();
  private interactConsumed = false;
  private escapeConsumed = false;
  private mouseClick: { x: number; y: number } | undefined = undefined;
  private canvas: HTMLCanvasElement | null = null;

  constructor(private target: EventTarget, canvas?: HTMLCanvasElement) {
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onMouseClick = this.onMouseClick.bind(this);
    target.addEventListener('keydown', this.onKeyDown as EventListener);
    target.addEventListener('keyup', this.onKeyUp as EventListener);
    
    if (canvas) {
      this.canvas = canvas;
      canvas.addEventListener('click', this.onMouseClick as EventListener);
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    this.pressed.add(e.key.toLowerCase());
    // Prevent page scroll
    const scrollKeys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '];
    if (scrollKeys.indexOf(e.key.toLowerCase()) !== -1) {
      e.preventDefault();
    }
    if (e.key.toLowerCase() === 'e' || e.key === 'Enter') {
      this.interactConsumed = false;
    }
    if (e.key === 'Escape') {
      this.escapeConsumed = false;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.pressed.delete(e.key.toLowerCase());
  }

  private onMouseClick(e: MouseEvent): void {
    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseClick = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  }

  public getSnapshot(): IInputSnapshot {
    const up = this.pressed.has('w') || this.pressed.has('arrowup');
    const down = this.pressed.has('s') || this.pressed.has('arrowdown');
    const left = this.pressed.has('a') || this.pressed.has('arrowleft');
    const right = this.pressed.has('d') || this.pressed.has('arrowright');

    const interactRaw =
      (this.pressed.has('e') || this.pressed.has('enter')) && !this.interactConsumed;
    const escapeRaw = this.pressed.has('escape') && !this.escapeConsumed;

    if (interactRaw) this.interactConsumed = true;
    if (escapeRaw) this.escapeConsumed = true;

    const mouseClick = this.mouseClick;
    this.mouseClick = undefined; // Consume the click

    return { up, down, left, right, interact: interactRaw, escape: escapeRaw, mouseClick };
  }

  public dispose(): void {
    this.target.removeEventListener('keydown', this.onKeyDown as EventListener);
    this.target.removeEventListener('keyup', this.onKeyUp as EventListener);
    if (this.canvas) {
      this.canvas.removeEventListener('click', this.onMouseClick as EventListener);
    }
  }
}
