import * as React from 'react';
import { Ball as BallType } from '../types';
import styles from '../OfficeBreakout.module.scss';

interface BallProps {
  ball: BallType;
  bouncing?: boolean;
}

export const Ball: React.FC<BallProps> = ({ ball, bouncing = false }) => {
  const ballRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ballRef.current) {
      const ballX = ball.position.x - ball.radius;
      const ballY = ball.position.y - ball.radius;
      const ballSize = ball.radius * 2;
      
      ballRef.current.style.setProperty('--ball-x', `${ballX}px`);
      ballRef.current.style.setProperty('--ball-y', `${ballY}px`);
      ballRef.current.style.setProperty('--ball-size', `${ballSize}px`);
    }
  }, [ball.position.x, ball.position.y, ball.radius]);

  return (
    <div
      ref={ballRef}
      className={`${styles.ball} ${bouncing ? styles.ballBouncing : ''}`}
    />
  );
};