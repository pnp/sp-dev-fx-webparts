import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './GroupMembers.module.scss';

export interface GraphProfileImageProps {
  userId: string;
  context: WebPartContext;
  fallbackInitials: string;
  alt?: string;
  className?: string;
  size?: number;
  disableAzureAD?: boolean; // Option to disable Graph API photo fetch
}

const GraphProfileImage: React.FC<GraphProfileImageProps> = ({
  userId, 
  context, 
  fallbackInitials, 
  alt = 'User profile image', 
  className = '', 
  size = 40,
  disableAzureAD = false
}) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Memoize the photo fetching logic
  const loadPhoto = useCallback(async () => {
    // If disabled or no user ID, immediately fall back
    if (disableAzureAD || !userId) {
      setImageLoadError(true);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const isCancelled = false;

    try {
      // Token provider setup
      const tokenProvider = await context.aadTokenProviderFactory.getTokenProvider();
      const token = await tokenProvider.getToken("https://graph.microsoft.com");
      
      // Profile photo URL
      const url = `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`;
      
      // Fetch with timeout and error handling
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

      const response = await fetch(url, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Accept': 'image/*'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Photo fetch error");
      }

      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get("content-type") || "image/jpeg";
      const blob = new Blob([buffer], { type: contentType });
      const objectUrl = URL.createObjectURL(blob);

      if (!isCancelled) {
        setImgSrc(objectUrl);
        setIsLoading(false);
      }
    } catch {
      if (!isCancelled) {
        setImageLoadError(true);
        setIsLoading(false);
      }
    } finally {
      controller.abort(); // Ensure cleanup
    }
  }, [userId, context, disableAzureAD]);

  // Trigger photo loading effect
  useEffect(() => {
    loadPhoto().catch(() => {
      // Catch any unhandled errors
      setImageLoadError(true);
      setIsLoading(false);
    });

    // Cleanup function
    return () => {
      if (imgSrc) {
        URL.revokeObjectURL(imgSrc);
      }
    };
  }, [loadPhoto, imgSrc]);

  // Memoized dynamic styles
  const dynamicStyles = useMemo(() => ({
    width: `${size}px`,
    height: `${size}px`
  }), [size]);

  // If the image is still loading, return a placeholder
  if (isLoading) {
    return (
      <div 
        className={`${styles.defaultCoin} ${className}`} 
        style={{
          ...dynamicStyles,
          opacity: 0.5,
          cursor: 'wait'
        }}
      >
        {fallbackInitials}
      </div>
    );
  }

  // If the image loaded successfully, show it
  if (imgSrc && !imageLoadError) {
    return (
      <img
        src={imgSrc}
        alt={alt}
        className={`${styles.profileImage} ${className}`}
        style={dynamicStyles}
        onError={() => setImageLoadError(true)}
        loading="lazy"
        aria-label={`Profile image for ${fallbackInitials}`}
      />
    );
  }

  // If the image failed to load or was not found, render a fallback coin with the initials
  return (
    <div 
      className={`${styles.defaultCoin} ${className}`} 
      style={dynamicStyles}
      aria-label={`Default avatar for ${fallbackInitials}`}
    >
      {fallbackInitials}
    </div>
  );
};

export default GraphProfileImage;