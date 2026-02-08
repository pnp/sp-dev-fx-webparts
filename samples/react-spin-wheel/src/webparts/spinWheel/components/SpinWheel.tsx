import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import styles from './SpinWheel.module.scss';
import { ISpinWheelProps } from './ISpinWheelProps';
import { spinWheelService } from '../../../services/SpinWheelService';
import { IWheelReward } from '../../../models/ISpinWheelModels';
import { PrimaryButton, Spinner, SpinnerSize, MessageBar, MessageBarType, Dialog, DialogType, DialogFooter } from '@fluentui/react';

const SpinWheel: React.FC<ISpinWheelProps> = (props) => {
  const [rewards, setRewards] = useState<IWheelReward[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedReward, setSelectedReward] = useState<IWheelReward | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [canSpinToday, setCanSpinToday] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Audio refs for sound effects
  const winSoundRef = useRef<HTMLAudioElement | null>(null);
  const tickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadWheel();
    initializeSounds();
  }, []);

  const initializeSounds = (): void => {
    // Create audio context for spinning sound (continuous)
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Spinning sound - create a synthesized ticking sound
    const createTickSound = (): void => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    };

    tickSoundRef.current = { play: createTickSound } as any;

    const createWinSound = (): void => {
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator1.frequency.value = 523.25; // C5
      oscillator2.frequency.value = 659.25; // E5
      oscillator1.type = 'sine';
      oscillator2.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.5);
      oscillator2.stop(audioContext.currentTime + 0.5);
      
      setTimeout(() => {
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioContext.destination);
        
        osc1.frequency.value = 659.25; // E5
        osc2.frequency.value = 783.99; // G5
        osc1.type = 'sine';
        osc2.type = 'sine';
        
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        
        osc1.start(audioContext.currentTime);
        osc2.start(audioContext.currentTime);
        osc1.stop(audioContext.currentTime + 0.6);
        osc2.stop(audioContext.currentTime + 0.6);
      }, 200);
    };

    winSoundRef.current = { play: createWinSound } as any;
  };

  const loadWheel = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      const [wheelRewards, canSpin] = await Promise.all([
        spinWheelService.getWheelRewards(),
        spinWheelService.canSpinToday()
      ]);

      if (wheelRewards.length === 0) {
        setError('No active rewards found. Please add rewards to the WheelRewards list.');
        setLoading(false);
        return;
      }

      setRewards(wheelRewards);
      setCanSpinToday(canSpin);
      setLoading(false);
    } catch (err) {
      console.error('Error loading wheel:', err);
      setError('Failed to load wheel. Please check if the WheelRewards list exists.');
      setLoading(false);
    }
  };

  const selectRewardByProbability = (): IWheelReward => {
    const totalProbability = rewards.reduce((sum, r) => sum + r.Probability, 0);
    let random = Math.random() * totalProbability;

    for (const reward of rewards) {
      random -= reward.Probability;
      if (random <= 0) {
        return reward;
      }
    }

    return rewards[0];
  };

  const playTickingSounds = (): number => {
    // Play ticking sounds during spin
    let tickCount = 0;
    const maxTicks = 50; // Total number of ticks
    
    const tickInterval = setInterval(() => {
      if (tickCount >= maxTicks) {
        clearInterval(tickInterval);
        return;
      }
      
      if (tickSoundRef.current && tickSoundRef.current.play) {
        tickSoundRef.current.play();
      }
      
      tickCount++;
    }, 100); // Tick every 100ms

    // Return interval to clear it if needed
    return tickInterval as any;
  };

  const handleSpin = async (): Promise<void> => {
    if (spinning || !canSpinToday) return;

    setSpinning(true);
    
    // Play ticking sounds
    const tickInterval = playTickingSounds();
    
    const selectedReward = selectRewardByProbability();
    const rewardIndex = rewards.findIndex((r: IWheelReward) => r.Id === selectedReward.Id);
    const segmentAngle = 360 / rewards.length;
    
    const segmentCenterAngle = (rewardIndex * segmentAngle) + (segmentAngle / 2);
    
    const targetRotation = 270 - segmentCenterAngle;
    
    // Add multiple full spins for effect (6-7 rotations)
    const spins = 6 + Math.floor(Math.random() * 2);
    const finalRotation = (spins * 360) + targetRotation;
    
    setRotation(finalRotation);

    setTimeout(async () => {
      // Clear ticking sounds
      clearInterval(tickInterval);
      
      // Play win sound
      if (winSoundRef.current && winSoundRef.current.play) {
        winSoundRef.current.play();
      }
      
      setSelectedReward(selectedReward);
      setShowResult(true);
      setSpinning(false);
      setCanSpinToday(false);

      try {
        await spinWheelService.saveScore({
          Player: props.userDisplayName,
          GameName: 'Spin Wheel',
          Score: selectedReward.Points,
          CorrectCount: 1,
          TimeTakenSeconds: 0,
          Timestamp: new Date()
        });
      } catch (err) {
        console.error('Error saving score:', err);
      }
    }, 5000); // Spin duration
  };

  const closeDialog = (): void => {
    setShowResult(false);
  };

  if (loading) {
    return (
      <div className={styles.spinWheel}>
        <div className={styles.container}>
          <Spinner size={SpinnerSize.large} label="Loading wheel..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.spinWheel}>
        <div className={styles.container}>
          <MessageBar messageBarType={MessageBarType.error}>
            {error}
          </MessageBar>
        </div>
      </div>
    );
  }

  const segmentAngle = 360 / rewards.length;

  return (
    <div className={styles.spinWheel}>
      <div className={styles.container}>
        <h1 className={styles.title}>Spin & Win</h1>
        <p className={styles.subtitle}>Try your luck, win amazing rewards</p>

        {!canSpinToday && (
          <MessageBar messageBarType={MessageBarType.warning} className={styles.warningMessage}>
            You've already spun today! Come back tomorrow for another chance.
          </MessageBar>
        )}

        <div className={`${styles.wheelContainer} ${!canSpinToday ? styles.disabled : ''}`}>
          <div className={styles.pointer}></div>
          
          <div 
            className={styles.wheel}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: spinning 
                ? 'transform 5s cubic-bezier(0.15, 0.65, 0.05, 1)' 
                : 'none'
            }}
          >
            {rewards.map((reward, index) => (
              <div
                key={reward.Id}
                className={styles.segment}
                style={{
                  transform: `rotate(${index * segmentAngle}deg)`,
                  backgroundColor: reward.Color || `hsl(${(index * 360) / rewards.length}, 65%, 55%)`
                }}
              >
                <div className={styles.segmentContent}>
                  <span className={styles.rewardTitle}>{reward.Title}</span>
                  <span className={styles.rewardPoints}>{reward.Points} pts</span>
                </div>
              </div>
            ))}
            <div className={styles.centerCircle}>
              <span className={styles.centerText}>SPIN</span>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <PrimaryButton
            text={canSpinToday ? (spinning ? "SPINNING..." : "SPIN NOW") : "Come Back Tomorrow"}
            onClick={handleSpin}
            disabled={spinning || !canSpinToday}
            className={styles.spinButton}
          />
        </div>

        <Dialog
          hidden={!showResult}
          onDismiss={closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: ' Congratulations!'
          }}
          modalProps={{
            isBlocking: false,
            styles: { main: { maxWidth: 500 } }
          }}
        >
          <div className={styles.dialogContent}>
            <div className={styles.rewardDisplay}>
              <h2>{selectedReward?.Title}</h2>
              <div className={styles.pointsWon}>{selectedReward?.Points}</div>
              <div className={styles.pointsLabel}>Points Earned</div>
            </div>
          </div>
          <DialogFooter>
            <PrimaryButton onClick={closeDialog} text="Awesome!" />
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default SpinWheel;