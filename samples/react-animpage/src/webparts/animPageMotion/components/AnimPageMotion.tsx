// Import React to create React components
import * as React from 'react';

// Interface describing the props accepted by the AnimPageMotion component
interface IAnimPageMotionProps {
  // Indicates whether the page is currently in edit mode
  isEditMode: boolean;
}

// Functional component used by the web part
// It only renders content when the page is in edit mode
export const AnimPageMotion: React.FC<IAnimPageMotionProps> = ({ isEditMode }) => {
  // If the page is not in edit mode, render nothing
  if (!isEditMode) {
    return null; // Return nothing if not in edit mode
  }

  // Content shown only in edit mode (helps the editor understand the web part)
  return (
    <div style={{ padding: 8, opacity: 0.6 }}>
      <strong>AnimPage Motion</strong>
      <div>
        This web part lets you configure page animations
        from its settings.
      </div>
    </div>
  );
};
