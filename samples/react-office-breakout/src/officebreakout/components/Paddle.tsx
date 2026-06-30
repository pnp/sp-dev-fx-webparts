import * as React from 'react';
import { Paddle as PaddleType } from '../types';
import styles from '../OfficeBreakout.module.scss';

interface PaddleProps {
  paddle: PaddleType;
}

export const Paddle: React.FC<PaddleProps> = ({ paddle }) => {
  const paddleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (paddleRef.current) {
      paddleRef.current.style.setProperty('--paddle-x', `${paddle.position.x}px`);
      paddleRef.current.style.setProperty('--paddle-y', `${paddle.position.y}px`);
      paddleRef.current.style.setProperty('--paddle-width', `${paddle.size.width}px`);
      paddleRef.current.style.setProperty('--paddle-height', `${paddle.size.height}px`);
    }
  }, [paddle.position.x, paddle.position.y, paddle.size.width, paddle.size.height]);

  return (
    <div
      ref={paddleRef}
      className={styles.paddle}
    />
  );
};