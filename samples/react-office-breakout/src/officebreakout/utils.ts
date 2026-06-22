import { Ball, Block, Paddle, Rectangle, Circle, CollisionResult, Position, Velocity } from './types';

/**
 * Check collision between a circle (ball) and a rectangle (block/paddle)
 */
export function checkCircleRectangleCollision(circle: Circle, rectangle: Rectangle): CollisionResult {
  // Find the closest point on the rectangle to the circle center
  const closestX = Math.max(rectangle.x, Math.min(circle.x, rectangle.x + rectangle.width));
  const closestY = Math.max(rectangle.y, Math.min(circle.y, rectangle.y + rectangle.height));

  // Calculate the distance between the circle center and the closest point
  const distanceX = circle.x - closestX;
  const distanceY = circle.y - closestY;
  const distanceSquared = distanceX * distanceX + distanceY * distanceY;

  // Check if the distance is less than the circle's radius
  if (distanceSquared <= circle.radius * circle.radius) {
    // Determine which side of the rectangle was hit
    let side: 'top' | 'bottom' | 'left' | 'right' = 'top';
    
    const centerX = rectangle.x + rectangle.width / 2;
    const centerY = rectangle.y + rectangle.height / 2;
    
    const deltaX = circle.x - centerX;
    const deltaY = circle.y - centerY;
    
    // Determine collision side based on which edge is closest
    if (Math.abs(deltaX) / rectangle.width > Math.abs(deltaY) / rectangle.height) {
      side = deltaX > 0 ? 'right' : 'left';
    } else {
      side = deltaY > 0 ? 'bottom' : 'top';
    }

    return { hasCollision: true, side };
  }

  return { hasCollision: false };
}

/**
 * Check collision between ball and paddle
 */
export function checkBallPaddleCollision(ball: Ball, paddle: Paddle): CollisionResult {
  const circle: Circle = {
    x: ball.position.x,
    y: ball.position.y,
    radius: ball.radius
  };

  const rectangle: Rectangle = {
    x: paddle.position.x,
    y: paddle.position.y,
    width: paddle.size.width,
    height: paddle.size.height
  };

  return checkCircleRectangleCollision(circle, rectangle);
}

/**
 * Check collision between ball and block
 */
export function checkBallBlockCollision(ball: Ball, block: Block): CollisionResult {
  if (block.destroyed) {
    return { hasCollision: false };
  }

  const circle: Circle = {
    x: ball.position.x,
    y: ball.position.y,
    radius: ball.radius
  };

  const rectangle: Rectangle = {
    x: block.position.x,
    y: block.position.y,
    width: block.size.width,
    height: block.size.height
  };

  return checkCircleRectangleCollision(circle, rectangle);
}

/**
 * Calculate new ball velocity after collision with paddle
 * The angle depends on where the ball hits the paddle
 */
export function calculatePaddleBounce(ball: Ball, paddle: Paddle): Velocity {
  const paddleCenter = paddle.position.x + paddle.size.width / 2;
  const ballRelativePosition = (ball.position.x - paddleCenter) / (paddle.size.width / 2);
  
  // Clamp the relative position to [-1, 1]
  const clampedPosition = Math.max(-1, Math.min(1, ballRelativePosition));
  
  // Calculate the bounce angle (maximum 45 degrees)
  const maxAngle = Math.PI / 3; // 60 degrees
  const bounceAngle = clampedPosition * maxAngle;
  
  // Calculate the current speed
  const currentSpeed = Math.sqrt(ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y);
  
  // Calculate new velocity components
  const newVelocityX = Math.sin(bounceAngle) * currentSpeed;
  const newVelocityY = -Math.abs(Math.cos(bounceAngle) * currentSpeed); // Always upward
  
  return {
    x: newVelocityX,
    y: newVelocityY
  };
}

/**
 * Calculate new ball velocity after collision with block or wall
 */
export function calculateWallBounce(velocity: Velocity, side: 'top' | 'bottom' | 'left' | 'right'): Velocity {
  const newVelocity = { ...velocity };
  
  if (side === 'left' || side === 'right') {
    newVelocity.x = -newVelocity.x;
  } else {
    newVelocity.y = -newVelocity.y;
  }
  
  return newVelocity;
}

/**
 * Check if ball is within game board boundaries
 */
export function isBallInBounds(ball: Ball, boardWidth: number, boardHeight: number): boolean {
  return ball.position.x >= ball.radius && 
         ball.position.x <= boardWidth - ball.radius &&
         ball.position.y >= ball.radius;
  // Note: We don't check bottom boundary as that's where the ball can be lost
}

/**
 * Check if ball hit the walls
 */
export function checkWallCollision(ball: Ball, boardWidth: number, boardHeight: number): CollisionResult {
  // Left wall
  if (ball.position.x - ball.radius <= 0) {
    return { hasCollision: true, side: 'left' };
  }
  
  // Right wall
  if (ball.position.x + ball.radius >= boardWidth) {
    return { hasCollision: true, side: 'right' };
  }
  
  // Top wall
  if (ball.position.y - ball.radius <= 0) {
    return { hasCollision: true, side: 'top' };
  }
  
  return { hasCollision: false };
}

/**
 * Check if paddle is within bounds
 */
export function isPaddleInBounds(paddle: Paddle, boardWidth: number): boolean {
  return paddle.position.x >= 0 && paddle.position.x + paddle.size.width <= boardWidth;
}

/**
 * Clamp paddle position to stay within bounds
 */
export function clampPaddlePosition(position: Position, paddleWidth: number, boardWidth: number): Position {
  return {
    x: Math.max(0, Math.min(boardWidth - paddleWidth, position.x)),
    y: position.y
  };
}

/**
 * Generate initial block layout
 */
export function generateBlockLayout(
  boardWidth: number, 
  boardHeight: number, 
  rows: number, 
  columns: number,
  blockHeight: number,
  topMargin: number
): { position: Position; size: { width: number; height: number } }[] {
  const blocks: { position: Position; size: { width: number; height: number } }[] = [];
  const blockWidth = boardWidth / columns;
  const spacing = 2; // Small gap between blocks
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      blocks.push({
        position: {
          x: col * blockWidth + spacing / 2,
          y: topMargin + row * (blockHeight + spacing)
        },
        size: {
          width: blockWidth - spacing,
          height: blockHeight
        }
      });
    }
  }
  
  return blocks;
}

/**
 * Calculate distance between two points
 */
export function calculateDistance(point1: Position, point2: Position): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Normalize velocity to maintain consistent speed
 */
export function normalizeVelocity(velocity: Velocity, targetSpeed: number): Velocity {
  const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  if (currentSpeed === 0) return { x: 0, y: targetSpeed };
  
  const scale = targetSpeed / currentSpeed;
  return {
    x: velocity.x * scale,
    y: velocity.y * scale
  };
}