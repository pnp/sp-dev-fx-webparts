import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './DragMatch.module.scss';
import { IDragMatchProps } from './IDragMatchProps';
import { gameService } from '../../../services/SharePointGameService';
import { IMatchQuestion } from '../../../models/IGameModels';
import { PrimaryButton, Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';

const GAME_NAME = 'Drag Match';

interface IMatchPair {
  questionId: number;
  answerId: number | null;
  isCorrect: boolean | null;
}

interface IUserGameStats {
  hasPlayed: boolean;
  score: number;
  correctCount: number;
  timeTaken: number;
  completedDate: string;
  basePoints: number;
  timeBonus: number;
  rankBonus: number;
  rank: number;
}

const DragMatch: React.FC<IDragMatchProps> = (props) => {
  const [questions, setQuestions] = useState<IMatchQuestion[]>([]);
  const [shuffledAnswers, setShuffledAnswers] = useState<IMatchQuestion[]>([]);
  const [matches, setMatches] = useState<IMatchPair[]>([]);
  const [draggedAnswer, setDraggedAnswer] = useState<IMatchQuestion | null>(null);

  const [score, setScore] = useState<number>(0);
  const [basePoints, setBasePoints] = useState<number>(0);
  const [timeBonus, setTimeBonus] = useState<number>(0);
  const [rankBonus, setRankBonus] = useState<number>(0);
  const [completionRank, setCompletionRank] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  const [startTime, setStartTime] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<number | null>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [gameReady, setGameReady] = useState<boolean>(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState<number[]>([]);
  const [userStats, setUserStats] = useState<IUserGameStats | null>(null);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submissionProgress, setSubmissionProgress] = useState<string>('');

  incorrectQuestions;

  useEffect(() => {
    loadGame();
  }, []);

  useEffect(() => {
    if (startTime > 0 && !gameCompleted && gameReady) {
      const interval = window.setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      setTimerInterval(interval);

      return () => {
        if (interval) {
          window.clearInterval(interval);
        }
      };
    } else if (gameCompleted && timerInterval) {
      window.clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [startTime, gameCompleted, gameReady]);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setGameReady(true);
      setStartTime(Date.now());
    }
  }, [countdown]);

  const loadGame = async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      setGameCompleted(false);
      setGameReady(false);

      if (timerInterval) {
        window.clearInterval(timerInterval);
        setTimerInterval(null);
      }

      // Check if user has already played
      const hasPlayedBefore = await checkIfUserHasPlayed();
      
      if (hasPlayedBefore) {
        setLoading(false);
        return;
      }

      const matchQuestions = await gameService.getMatchQuestions();
      if (matchQuestions.length === 0) {
        setError('No active questions found. Please add questions to the MatchQuestions list.');
        setLoading(false);
        return;
      }

      const questionsToUse = matchQuestions.slice(0, 8);
      setQuestions(questionsToUse);
      setShuffledAnswers(shuffleArray([...questionsToUse]));

      const initialMatches = questionsToUse.map((q) => ({
        questionId: q.Id,
        answerId: null,
        isCorrect: null,
      }));

      setMatches(initialMatches);
      setScore(0);
      setBasePoints(0);
      setTimeBonus(0);
      setRankBonus(0);
      setCorrectCount(0);
      setElapsedTime(0);
      setIncorrectQuestions([]);

      setLoading(false);
      setCountdown(3);

    } catch (err) {
      console.error('Error loading game:', err);
      setError('Failed to load game. Please check if the MatchQuestions list exists.');
      setLoading(false);
    }
  };

  const checkIfUserHasPlayed = async (): Promise<boolean> => {
    try {
      const allScores = await gameService.getCurrentUserScores();
      const dragMatchScores = allScores.filter(s => s.GameName === GAME_NAME);

      if (dragMatchScores.length > 0) {
        const lastGame = dragMatchScores[0];
        
        setUserStats({
          hasPlayed: true,
          score: lastGame.Score,
          correctCount: lastGame.CorrectCount || 8,
          timeTaken: lastGame.TimeTakenSeconds,
          completedDate: new Date().toLocaleDateString(),
          basePoints: 100,
          timeBonus: 0,
          rankBonus: 0,
          rank: 0
        });
        return true;
      }

      return false;
    } catch (err) {
      console.error('Error checking user game history:', err);
      return false;
    }
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleDragStartFromPool = (e: React.DragEvent, answer: IMatchQuestion): void => {
    if (!gameReady || gameCompleted) return;
    setDraggedAnswer(answer);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent): void => {
    if (!gameReady || gameCompleted) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetQuestion: IMatchQuestion): void => {
    if (!gameReady || gameCompleted) return;
    e.preventDefault();
    if (!draggedAnswer) return;

    const existingMatch = matches.find(m => m.questionId === targetQuestion.Id);
    if (existingMatch?.isCorrect === true) {
      return;
    }

    const isCorrect = draggedAnswer.Answer === targetQuestion.Answer;

    const updatedMatches = matches.map(m => {
      if (m.questionId === targetQuestion.Id) {
        return {
          ...m,
          answerId: draggedAnswer.Id,
          isCorrect
        };
      }
      if (m.answerId === draggedAnswer.Id) {
        return {
          ...m,
          answerId: null,
          isCorrect: null
        };
      }
      return m;
    });

    setMatches(updatedMatches);

    
    if (!isCorrect) {
      setIncorrectQuestions(prev =>
        prev.includes(targetQuestion.Id)
          ? prev
          : [...prev, targetQuestion.Id]
      );
      

      setTimeout(() => {
        setMatches(current => current.map(m => {
          if (m.questionId === targetQuestion.Id && m.answerId === draggedAnswer.Id) {
            return {
              ...m,
              answerId: null,
              isCorrect: null
            };
          }
          return m;
        }));
      }, 1000);
    } else {
      setShuffledAnswers(current => current.filter(a => a.Id !== draggedAnswer.Id));
      setCorrectCount(prev => prev + 1);
    }

    setDraggedAnswer(null);
  };

  const handleReturnAnswer = (questionId: number): void => {
    if (!gameReady || gameCompleted) return;
    
    const match = matches.find(m => m.questionId === questionId);
    if (!match || match.isCorrect) return;

    if (match.answerId) {
      const answer = questions.find(q => q.Id === match.answerId);
      if (answer) {
        setShuffledAnswers(prev => [...prev, answer]);
      }
    }

    const updatedMatches = matches.map(m => {
      if (m.questionId === questionId) {
        return {
          ...m,
          answerId: null,
          isCorrect: null
        };
      }
      return m;
    });

    setMatches(updatedMatches);
  };

  const submitGame = async (): Promise<void> => {
    if (!allCorrect || submitting) return;

    try {
      setSubmitting(true);
      setSubmissionProgress('Calculating score...');

      const timeTakenSeconds = elapsedTime;
      const baseGamePoints = 100;
      let calculatedTimeBonus = 0;

      if (timeTakenSeconds <= 60) {
        calculatedTimeBonus = 100;
      } else if (timeTakenSeconds <= 120) {
        calculatedTimeBonus = 80;
      } else {
        calculatedTimeBonus = 60;
      }

      setBasePoints(baseGamePoints);
      setTimeBonus(calculatedTimeBonus);

      setSubmissionProgress('Checking completion rank...');
      const rank = await gameService.getDragMatchCompletionRank();
      setCompletionRank(rank);

      let calculatedRankBonus = 0;
      if (rank <= 100) {
        calculatedRankBonus = 100;
      }
      setRankBonus(calculatedRankBonus);

      const totalScore = baseGamePoints + calculatedTimeBonus + calculatedRankBonus;
      setScore(totalScore);

      setSubmissionProgress('Saving score...');
      await gameService.saveScore({
        GameName: GAME_NAME,
        Score: totalScore,
        CorrectCount: 8,
        TimeTakenSeconds: timeTakenSeconds
      });

      setSubmissionProgress('Complete!');
      setGameCompleted(true);
      
    } catch (err) {
      console.error('Error submitting game:', err);
      setError('Failed to submit score. Please try again.');
    } finally {
      setSubmitting(false);
      setSubmissionProgress('');
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMatchStatus = (questionId: number): 'pending' | 'correct' | 'incorrect' => {
    const match = matches.find(m => m.questionId === questionId);
    if (!match || match.answerId === null) return 'pending';
    if (match.isCorrect === true) return 'correct';
    if (match.isCorrect === false) return 'incorrect';
    return 'pending';
  };

  const getMatchedAnswer = (questionId: number): IMatchQuestion | null => {
    const match = matches.find(m => m.questionId === questionId);
    if (!match || !match.answerId) return null;
    return questions.find(q => q.Id === match.answerId) || null;
  };

  const getStatusClassName = (status: string): string => {
    if (status === 'correct') return styles.correct;
    if (status === 'incorrect') return styles.incorrect;
    return '';
  };

  const allCorrect = matches.every(m => m.isCorrect === true);


  if (loading) {
    return (
      <div className={styles.dragMatch}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Spinner size={SpinnerSize.large} label="Loading game..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dragMatch}>
        <MessageBar messageBarType={MessageBarType.error}>
          {error}
        </MessageBar>
      </div>
    );
  }

  if (userStats && userStats.hasPlayed) {
    return (
      <div className={styles.dragMatch}>
        <div className={styles.completionScreen}>
          <div className={styles.completionIcon}>✅</div>
          <h2 className={styles.completionTitle}>You've Already Played!</h2>
          <p className={styles.completionMessage}>
            You completed the Drag & Match Game on {userStats.completedDate}
          </p>
          
          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>Your Final Score</h3>
            
            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              borderRadius: '10px',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', marginBottom: '5px' }}>Total Score</div>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>{userStats.score} Points</div>
            </div>
          </div>

          <p className={styles.completionNote} style={{ marginTop: '20px' }}>
            Thank you for playing! This game can only be played once per user.
          </p>
        </div>
      </div>
    );
  }

  if (countdown !== null) {
    return (
      <div className={styles.countdownOverlay}>
        <div className={styles.countdownNumber}>{countdown}</div>
        <div className={styles.countdownText}>Get Ready!</div>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className={styles.dragMatch}>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Spinner size={SpinnerSize.large} label={submissionProgress || "Submitting..."} />
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const isTop100 = completionRank <= 100;

    return (
      <div className={styles.dragMatch}>
        <div className={styles.completionScreen}>
          <div className={styles.completionIcon}>🎉</div>
          <h2 className={styles.completionTitle}>Congratulations!</h2>
          <p className={styles.completionMessage}>
            You've successfully completed the Drag & Match Game!
          </p>
          
          <div className={styles.statsCard}>
            <h3 className={styles.statsTitle}>Score Breakdown</h3>
            
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>🎯</div>
                <div className={styles.statLabel}>Base Points</div>
                <div className={styles.statValue}>{basePoints}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>⚡</div>
                <div className={styles.statLabel}>Time Bonus</div>
                <div className={styles.statValue}>+{timeBonus}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statIcon}>⏱️</div>
                <div className={styles.statLabel}>Your Time</div>
                <div className={styles.statValue}>{formatTime(elapsedTime)}</div>
              </div>
            </div>

            {isTop100 && (
              <div style={{ marginTop: '20px' }}>
                <div className={styles.rewardBanner}>
                  <span className={styles.rewardIcon}>🌟</span>
                  <span className={styles.rewardText}>
                    Top 100 Finisher Bonus: +{rankBonus} Points!
                  </span>
                </div>
              </div>
            )}

            <div style={{
              marginTop: '20px',
              padding: '16px',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              borderRadius: '10px',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', marginBottom: '5px' }}>Total Score</div>
              <div style={{ fontSize: '32px', fontWeight: '700' }}>{score} Points</div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className={styles.dragMatch}>
      <div className={styles.header}>
        <h1 className={styles.title}>Drag & Match Game</h1>

        <div className={styles.scorePanel}>
          <div className={styles.scoreItem}>
            <span className={styles.label}>⏱️ Time:</span>
            <span className={styles.value}>{formatTime(elapsedTime)}</span>
          </div>

          <div className={styles.scoreItem}>
            <span className={styles.label}>Correct:</span>
            <span className={styles.value}>
              {correctCount}/{questions.length}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.instructionBanner}>
        Match all {questions.length} correctly!
      </div>

      <div className={styles.gameContainer}>
        <div className={styles.questionsColumn}>
          <h2 className={styles.columnTitle}>Questions</h2>

          {questions.map((question) => {
            const status = getMatchStatus(question.Id);
            const matchedAnswer = getMatchedAnswer(question.Id);

            return (
              <div key={question.Id} className={styles.questionRow + ' ' + getStatusClassName(status)}>
                <div className={styles.countryName}>{question.Question}</div>
                
                <div
                  className={`${styles.dropZone} ${matchedAnswer ? styles.hasAnswer : ''}`}
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, question)}
                  onClick={() => matchedAnswer && handleReturnAnswer(question.Id)}
                >
                  {matchedAnswer ? (
                    <span>{matchedAnswer.Answer}</span>
                  ) : (
                    "Drop here"
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.middleColumn}>
          <div style={{ fontSize: '36px', color: '#8A4DBF', fontWeight: 'bold' }}>→</div>
        </div>

        <div className={styles.answersColumn}>
          <h2 className={styles.columnTitle}>Answers (Drag to Match)</h2>

          {shuffledAnswers.map(answer => (
            <div
              key={answer.Id}
              className={styles.answerCard}
              draggable={gameReady && !gameCompleted}
              onDragStart={e => handleDragStartFromPool(e, answer)}
            >
              {answer.Answer}
            </div>
          ))}

          {shuffledAnswers.length === 0 && !gameCompleted && (
            <div className={styles.emptyMessage}>
              ✓ All answers placed! Complete all correct matches to submit.
            </div>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <PrimaryButton
          text={allCorrect ? "Submit Game" : "Complete All Matches First"}
          onClick={submitGame}
          className={styles.submitButton}
          disabled={!allCorrect || submitting}
        />
      </div>

    </div>
  );
};

export default DragMatch;
