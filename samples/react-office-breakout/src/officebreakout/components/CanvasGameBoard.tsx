import * as React from 'react';
import { GameState } from '../types';
import styles from '../OfficeBreakout.module.scss';

// Import PNG icons
import wordIconPng from '../assets/word-icon.png';
import excelIconPng from '../assets/excel-icon.png';
import powerpointIconPng from '../assets/powerpoint-icon.png';
import teamsIconPng from '../assets/teams-icon.png';
import onenoteIconPng from '../assets/onenote-icon.png';
import outlookIconPng from '../assets/outlook-icon.png';
import onedriveIconPng from '../assets/onedrive-icon.png';
import sharepointIconPng from '../assets/sharepoint-icon.png';

interface CanvasGameBoardProps {
  gameState: GameState;
  ballBouncing?: boolean;
}

// Office app configurations for canvas rendering with PNG icons
const OFFICE_APPS = [
  { name: 'Word', color: '#2b579a', icon: wordIconPng },
  { name: 'Excel', color: '#217346', icon: excelIconPng },
  { name: 'PowerPoint', color: '#d24726', icon: powerpointIconPng },
  { name: 'Teams', color: '#6264a7', icon: teamsIconPng },
  { name: 'OneNote', color: '#80397b', icon: onenoteIconPng },
  { name: 'Outlook', color: '#0078d4', icon: outlookIconPng },
  { name: 'OneDrive', color: '#0078d4', icon: onedriveIconPng },
  { name: 'SharePoint', color: '#0078d4', icon: sharepointIconPng }
];

// Cache for loaded images
const imageCache = new Map<string, HTMLImageElement>();

// Function to load PNG image
const loadPngImage = (imageSrc: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    // Check cache first
    if (imageCache.has(imageSrc)) {
      resolve(imageCache.get(imageSrc)!);
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      imageCache.set(imageSrc, img);
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load PNG image'));
    };
    
    img.src = imageSrc;
  });
};

export const CanvasGameBoard: React.FC<CanvasGameBoardProps> = ({ gameState, ballBouncing = false }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameRef = React.useRef<number>();
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  // Preload all PNG images on component mount
  React.useEffect(() => {
    const loadImages = async (): Promise<void> => {
      try {
        await Promise.all(
          OFFICE_APPS.map(app => loadPngImage(app.icon))
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to load PNG images:', error);
        setImagesLoaded(true); // Continue even if some images fail
      }
    };

    loadImages().catch(error => {
      console.error('Failed to load images:', error);
      setImagesLoaded(true);
    });
  }, []);

  // Get image for block based on color
  const getBlockImage = (color: string): HTMLImageElement | null => {
    for (let i = 0; i < OFFICE_APPS.length; i++) {
      if (OFFICE_APPS[i].color === color) {
        return imageCache.get(OFFICE_APPS[i].icon) || null;
      }
    }
    return null;
  };

  // Main render function
  const render = React.useCallback((ctx: CanvasRenderingContext2D) => {
    const { gameBoard, blocks, paddle, ball } = gameState;
    
    // Clear canvas
    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);
    
    // Set canvas background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
    
    // Draw border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = gameBoard.borderWidth;
    ctx.strokeRect(
      gameBoard.borderWidth / 2, 
      gameBoard.borderWidth / 2, 
      gameBoard.width - gameBoard.borderWidth, 
      gameBoard.height - gameBoard.borderWidth
    );

    // Draw blocks (only if images are loaded)
    blocks.forEach(block => {
      if (!block.destroyed) {
        // Block background
        ctx.fillStyle = block.color;
        ctx.fillRect(
          block.position.x,
          block.position.y,
          block.size.width,
          block.size.height
        );
        
        // Block border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(
          block.position.x,
          block.position.y,
          block.size.width,
          block.size.height
        );
        
        // Office app icon (PNG image or fallback)
        if (imagesLoaded) {
          const iconImage = getBlockImage(block.color);
          if (iconImage) {
            const iconSize = Math.min(block.size.width, block.size.height) * 0.6;
            const iconX = block.position.x + (block.size.width - iconSize) / 2;
            const iconY = block.position.y + (block.size.height - iconSize) / 2;
            
            ctx.drawImage(iconImage, iconX, iconY, iconSize, iconSize);
          } else {
            // Fallback to emoji if specific image not found
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#ffffff';
            ctx.fillText(
              '📄',
              block.position.x + block.size.width / 2,
              block.position.y + block.size.height / 2
            );
          }
        } else {
          // Loading state - show simple placeholder
          ctx.font = '16px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(
            '⏳',
            block.position.x + block.size.width / 2,
            block.position.y + block.size.height / 2
          );
        }
      }
    });

    // Draw paddle
    const paddleGradient = ctx.createLinearGradient(
      paddle.position.x, 
      paddle.position.y, 
      paddle.position.x, 
      paddle.position.y + paddle.size.height
    );
    paddleGradient.addColorStop(0, '#4FC3F7');
    paddleGradient.addColorStop(1, '#29B6F6');
    
    ctx.fillStyle = paddleGradient;
    ctx.fillRect(
      paddle.position.x,
      paddle.position.y,
      paddle.size.width,
      paddle.size.height
    );
    
    // Paddle border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      paddle.position.x,
      paddle.position.y,
      paddle.size.width,
      paddle.size.height
    );

    // Draw ball
    const ballScale = ballBouncing ? 1.2 : 1.0;
    const ballRadius = ball.radius * ballScale;
    
    // Ball glow effect
    const ballGradient = ctx.createRadialGradient(
      ball.position.x, ball.position.y, 0,
      ball.position.x, ball.position.y, ballRadius
    );
    ballGradient.addColorStop(0, '#FFD700');
    ballGradient.addColorStop(0.7, '#FFA000');
    ballGradient.addColorStop(1, '#FF8F00');
    
    ctx.beginPath();
    ctx.arc(ball.position.x, ball.position.y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballGradient;
    ctx.fill();
    
    // Ball highlight
    ctx.beginPath();
    ctx.arc(ball.position.x - ballRadius * 0.3, ball.position.y - ballRadius * 0.3, ballRadius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.fill();

    // Game overlay for paused/game over states
    const overlayStates = ['paused', 'gameover', 'victory', 'idle'];
    let showOverlay = false;
    for (let i = 0; i < overlayStates.length; i++) {
      if (gameState.gameStatus === overlayStates[i]) {
        showOverlay = true;
        break;
      }
    }
    
    if (showOverlay) {
      // Semi-transparent overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
      
      // Overlay text
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      
      let overlayText = '';
      switch (gameState.gameStatus) {
        case 'idle': overlayText = 'Office Breakout'; break;
        case 'paused': overlayText = 'PAUSED'; break;
        case 'gameover': overlayText = 'GAME OVER'; break;
        case 'victory': overlayText = 'VICTORY! 🎉'; break;
      }
      
      const centerX = gameBoard.width / 2;
      const centerY = gameBoard.height / 2;
      
      ctx.strokeText(overlayText, centerX, centerY);
      ctx.fillText(overlayText, centerX, centerY);
      
      // Subtitle for idle state
      if (gameState.gameStatus === 'idle') {
        ctx.font = '24px Arial';
        ctx.fillText('Press SPACE to start', centerX, centerY + 60);
      }
    }
  }, [gameState, ballBouncing, imagesLoaded]);

  // Animation loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = (): void => {
      render(ctx);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  // Set canvas size
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = gameState.gameBoard.width;
    canvas.height = gameState.gameBoard.height;
  }, [gameState.gameBoard.width, gameState.gameBoard.height]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvasGameBoard}
    />
  );
};