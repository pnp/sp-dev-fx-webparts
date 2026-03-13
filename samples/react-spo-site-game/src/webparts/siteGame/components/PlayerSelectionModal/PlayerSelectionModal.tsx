import * as React from 'react';
import { DefaultButton, PrimaryButton, Dialog, DialogType, DialogFooter, Stack } from '@fluentui/react';
import styles from './PlayerSelectionModal.module.scss';
import { PlayerType } from '../../game/types/IPlayer';
import { PlayerPreferences } from '../../game/constants/PlayerPreferences';

interface IPlayerSelectionModalProps {
  onPlayerSelected: (playerType: PlayerType) => void;
  onDismiss?: () => void;
}

interface IPlayerSelectionModalState {
  // eslint-disable-next-line @rushstack/no-new-null
  selectedType: PlayerType | null;
  isOpen: boolean;
}

export class PlayerSelectionModal extends React.Component<IPlayerSelectionModalProps, IPlayerSelectionModalState> {
  constructor(props: IPlayerSelectionModalProps) {
    super(props);
    const hasSelected = PlayerPreferences.hasSelectedPlayerType();
    this.state = {
      selectedType: null,
      isOpen: !hasSelected,
    };
  }

  private handleSelectPlayer = (playerType: PlayerType): void => {
    this.setState({ selectedType: playerType });
  };

  private handleConfirm = (): void => {
    if (!this.state.selectedType) return;
    PlayerPreferences.setPlayerType(this.state.selectedType);
    this.setState({ isOpen: false });
    this.props.onPlayerSelected(this.state.selectedType);
  };

  private handleDismiss = (): void => {
    // Default to male if dismissed without selection
    const selected = this.state.selectedType || 'male';
    PlayerPreferences.setPlayerType(selected);
    this.setState({ isOpen: false });
    this.props.onPlayerSelected(selected);
    this.props.onDismiss?.();
  };

  public render(): JSX.Element {
    return (
      <Dialog
        hidden={!this.state.isOpen}
        onDismiss={this.handleDismiss}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Choose Your Character',
          subText: 'Select which character you want to play as in this world.',
        }}
        modalProps={{ isBlocking: true }}
      >
        <Stack tokens={{ childrenGap: 16 }} className={styles.characterOptions}>
          {this.renderCharacterOption(
            'male',
            '👨‍💼 Male (Hat & Pants)',
            'A classic character with a blue hat and professional pants.'
          )}
          {this.renderCharacterOption(
            'female',
            '👩‍💼 Female (Long Hair & Skirt)',
            'A character with flowing long hair and a stylish skirt.'
          )}
          {this.renderCharacterOption(
            'neutral',
            '🧑‍💻 Neutral (Hoodie)',
            'A casual character in a comfortable hoodie and jeans.'
          )}
        </Stack>

        <DialogFooter>
          <DefaultButton onClick={this.handleDismiss} text="Use Default" disabled={!this.state.selectedType} />
          <PrimaryButton onClick={this.handleConfirm} text="Confirm" disabled={!this.state.selectedType} />
        </DialogFooter>
      </Dialog>
    );
  }

  private renderCharacterOption(
    type: PlayerType,
    label: string,
    description: string
  ): JSX.Element {
    const isSelected = this.state.selectedType === type;
    return (
      <div
        key={type}
        className={`${styles.characterCard} ${isSelected ? styles.selected : ''}`}
        onClick={() => this.handleSelectPlayer(type)}
      >
        <div className={styles.cardContent}>
          <div className={styles.label}>{label}</div>
          <div className={styles.description}>{description}</div>
        </div>
        {isSelected && <div className={styles.checkmark}>✓</div>}
      </div>
    );
  }
}
