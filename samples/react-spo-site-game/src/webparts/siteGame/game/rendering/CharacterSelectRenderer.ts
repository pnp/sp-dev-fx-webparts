import { PlayerType } from '../types/IPlayer';

export interface ICharacterSelectState {
  // eslint-disable-next-line @rushstack/no-new-null
  selectedType: PlayerType | null;
  // eslint-disable-next-line @rushstack/no-new-null
  hoverType: PlayerType | null;
}

export class CharacterSelectRenderer {
  private state: ICharacterSelectState = {
    selectedType: null,
    hoverType: null,
  };

  private characterOptions: Array<{ type: PlayerType; label: string; emoji: string }> = [
    { type: 'male', label: 'MALE', emoji: '👨' },
    { type: 'female', label: 'FEMALE', emoji: '👩' },
    { type: 'neutral', label: 'NEUTRAL', emoji: '🧑' },
  ];

  // eslint-disable-next-line @rushstack/no-new-null
  public getSelectedType(): PlayerType | null {
    return this.state.selectedType;
  }

  // eslint-disable-next-line @rushstack/no-new-null
  public setHoverType(type: PlayerType | null): void {
    this.state.hoverType = type;
  }

  public selectType(type: PlayerType): void {
    this.state.selectedType = type;
  }

  public resetSelection(): void {
    this.state.selectedType = null;
    this.state.hoverType = null;
  }

  public render(ctx: CanvasRenderingContext2D, viewportW: number, viewportH: number): void {
    // Semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, viewportW, viewportH);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('CHOOSE YOUR CHARACTER', viewportW / 2, 60);

    ctx.font = '14px monospace';
    ctx.fillStyle = '#cccccc';
    ctx.fillText('[ Click a character to select ]', viewportW / 2, 90);

    // Character boxes
    const boxCount = this.characterOptions.length;
    const boxWidth = 120;
    const boxHeight = 160;
    const spacing = 40;
    const totalWidth = boxCount * boxWidth + (boxCount - 1) * spacing;
    const startX = (viewportW - totalWidth) / 2;
    const startY = (viewportH - boxHeight) / 2;

    this.characterOptions.forEach((char, idx) => {
      const x = startX + idx * (boxWidth + spacing);
      const y = startY;

      const isSelected = this.state.selectedType === char.type;
      const isHover = this.state.hoverType === char.type;

      // Box border
      if (isSelected) {
        ctx.fillStyle = '#2ecc71'; // Green for selected
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#2ecc71';
      } else if (isHover) {
        ctx.fillStyle = '#3498db'; // Blue for hover
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#3498db';
      } else {
        ctx.fillStyle = '#7f8c8d'; // Gray for normal
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#7f8c8d';
      }

      // Draw box
      ctx.fillRect(x, y, boxWidth, boxHeight);
      ctx.strokeRect(x + 2, y + 2, boxWidth - 4, boxHeight - 4);

      // Draw emoji
      ctx.font = 'bold 60px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(char.emoji, x + boxWidth / 2, y + 70);

      // Draw label
      ctx.font = 'bold 12px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(char.label, x + boxWidth / 2, y + 130);

      // Draw checkmark if selected
      if (isSelected) {
        ctx.font = 'bold 20px monospace';
        ctx.fillStyle = '#2ecc71';
        ctx.textAlign = 'right';
        ctx.fillText('✓', x + boxWidth - 10, y + 20);
      }
    });

    // Instructions
    ctx.font = '12px monospace';
    ctx.fillStyle = '#95a5a6';
    ctx.textAlign = 'center';
    ctx.fillText('Press ENTER or click to start', viewportW / 2, viewportH - 40);

    // Save character box positions for click detection
    this.characterBoxes = this.characterOptions.map((char, idx) => ({
      type: char.type,
      x: startX + idx * (boxWidth + spacing),
      y: startY,
      w: boxWidth,
      h: boxHeight,
    }));
  }

  private characterBoxes: Array<{ type: PlayerType; x: number; y: number; w: number; h: number }> = [];

  // eslint-disable-next-line @rushstack/no-new-null
  public getCharacterAtMouse(mouseX: number, mouseY: number): PlayerType | null {
    for (const box of this.characterBoxes) {
      if (mouseX >= box.x && mouseX <= box.x + box.w && mouseY >= box.y && mouseY <= box.y + box.h) {
        return box.type;
      }
    }
    return null;
  }
}
