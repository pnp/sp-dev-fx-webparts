import * as React from 'react';
import styles from './GameCharacterSelector.module.scss';
import { PlayerType } from '../../game/types/IPlayer';

interface IGameCharacterSelectorProps {
  onSelect: (playerType: PlayerType) => void;
  isVisible: boolean;
}

interface IGameCharacterSelectorState {
  // eslint-disable-next-line @rushstack/no-new-null
  selectedType: PlayerType | null;
}

export class GameCharacterSelector extends React.Component<IGameCharacterSelectorProps, IGameCharacterSelectorState> {
  constructor(props: IGameCharacterSelectorProps) {
    super(props);
    this.state = {
      selectedType: null,
    };
  }

  private handleSelect = (playerType: PlayerType): void => {
    this.setState({ selectedType: playerType });
  };

  private handleConfirm = (): void => {
    if (this.state.selectedType) {
      this.props.onSelect(this.state.selectedType);
    }
  };

  public render(): JSX.Element {
    if (!this.props.isVisible) return <></>;

    return (
      <div className={styles.overlay}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <h1 className={styles.title}>Choose Your Character</h1>
            <p className={styles.subtitle}>Select your character to begin</p>
          </div>

          <div className={styles.charactersGrid}>
            {this.renderCharacter(
              'male',
              '👨‍💼',
              'Male',
              'Hat & Pants'
            )}
            {this.renderCharacter(
              'female',
              '👩‍💼',
              'Female',
              'Hair & Skirt'
            )}
            {this.renderCharacter(
              'neutral',
              '🧑‍💻',
              'Neutral',
              'Hoodie & Jeans'
            )}
          </div>

          <button
            className={`${styles.confirmButton} ${this.state.selectedType ? styles.enabled : styles.disabled}`}
            onClick={this.handleConfirm}
            disabled={!this.state.selectedType}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  private renderCharacter(
    type: PlayerType,
    emoji: string,
    label: string,
    description: string
  ): JSX.Element {
    const isSelected = this.state.selectedType === type;
    return (
      <div
        key={type}
        className={`${styles.characterCard} ${isSelected ? styles.selected : ''}`}
        onClick={() => this.handleSelect(type)}
      >
        <div className={styles.emoji}>{emoji}</div>
        <div className={styles.label}>{label}</div>
        <div className={styles.description}>{description}</div>
        {isSelected && <div className={styles.checkmark}>✓</div>}
      </div>
    );
  }
}
