import * as React from 'react';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { IUnifiedGraphService } from '../services/UnifiedGraphService';
import styles from './GroupMembers.module.scss';

export interface UnifiedProfileImageProps {
  userId: string;
  userPrincipalName?: string;
  graphService: IUnifiedGraphService;
  fallbackInitials: string;
  alt?: string;
  className?: string;
  size?: number;
  showPresence?: boolean;
  presenceSize?: number;
}

interface ImageState {
  src: string | undefined;
  hasError: boolean;
  isLoading: boolean;
  presence?: {
    availability: string;
    activity: string;
    color: string;
  };
}

const UnifiedProfileImage: React.FC<UnifiedProfileImageProps> = ({
  userId,
  userPrincipalName,
  graphService,
  fallbackInitials,
  alt = 'User profile image',
  className = '',
  size = 40,
  showPresence = false,
  presenceSize = 12
}) => {
  const [state, setState] = useState<ImageState>({
    src: undefined,
    hasError: false,
    isLoading: true
  });
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const cleanupTimeoutRef = useRef<number | null>(null);

  const cleanupBlobUrl = useCallback((url: string) => {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  }, []);

  const getPresenceColor = useCallback((availability: string): string => {
    switch (availability?.toLowerCase()) {
      case 'available': return '#6BB700';
      case 'busy': return '#C4314B';
      case 'donotdisturb': return '#C4314B';
      case 'away': return '#FFAA44';
      case 'berightback': return '#FFAA44';
      case 'offline': return '#8A8886';
      case 'presenceunknown': return '#8A8886';
      default: return '#8A8886';
    }
  }, []);

  // Load photo and presence data
  const loadUserData = useCallback(async () => {
    // Guard against undefined userId
    if (!userId || userId.trim() === '') {
      setState({
        src: undefined,
        hasError: true,
        isLoading: false,
        presence: undefined
      });
      return;
    }
    
    // Cancel any existing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setState(prev => ({ ...prev, isLoading: true, hasError: false }));

    try {
      const promises: Promise<unknown>[] = [
        graphService.getUserPhoto(userId, userPrincipalName)
      ];

      if (showPresence) {
        promises.push(graphService.getUserPresence(userId, userPrincipalName));
      } else {
        promises.push(Promise.resolve(null));
      }

      const results = await Promise.all(promises.map(async (promise) => {
        try {
          const value = await promise;
          return { status: 'fulfilled' as const, value };
        } catch (reason) {
          return { status: 'rejected' as const, reason };
        }
      }));
      
      if (signal.aborted) return;

      const [photoResult, presenceResult] = results;
      
      // Handle photo result
      const photoUrl = photoResult.status === 'fulfilled' ? photoResult.value : null;
      
      // Handle presence result
      let presence: ImageState['presence'];
      if (showPresence && presenceResult && presenceResult.status === 'fulfilled') {
        const presenceData = presenceResult.value as Record<string, unknown>;
        presence = {
          availability: (presenceData?.availability as string) || 'Unknown',
          activity: (presenceData?.activity as string) || 'Unknown',
          color: getPresenceColor((presenceData?.availability as string) || 'Unknown')
        };
      }

      setState({
        src: photoUrl as string | undefined,
        hasError: !photoUrl,
        isLoading: false,
        presence
      });

    } catch {
      if (!signal.aborted) {
        setState(prev => ({
          ...prev,
          hasError: true,
          isLoading: false
        }));
      }
    }
  }, [userId, userPrincipalName, graphService, showPresence, getPresenceColor]);

  useEffect(() => {
    loadUserData().catch(console.error);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (state.src) {
        cleanupBlobUrl(state.src);
      }
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }
    };
  }, [loadUserData]);

  const prevSrc = useRef<string | undefined>();
  useEffect(() => {
    if (prevSrc.current && prevSrc.current !== state.src) {
      cleanupBlobUrl(prevSrc.current);
    }
    prevSrc.current = state.src;
  }, [state.src, cleanupBlobUrl]);
  const containerStyles = useMemo(() => ({
    width: `${size}px`,
    height: `${size}px`,
    position: 'relative' as const,
    display: 'inline-block' as const
  }), [size]);

  const imageContainerStyles = useMemo(() => ({
    width: `${size}px`,
    height: `${size}px`,
    position: 'relative' as const,
    borderRadius: '50%',
    overflow: 'hidden' as const
  }), [size]);

  const presenceStyles = useMemo(() => ({
    width: `${presenceSize}px`,
    height: `${presenceSize}px`,
    backgroundColor: state.presence?.color || '#8A8886',
    border: '2px solid white',
    borderRadius: '50%',
    position: 'absolute' as const,
    bottom: '0px',
    right: '0px',
    zIndex: 2,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
  }), [presenceSize, state.presence?.color]);

  // Handle image load error
  const handleImageError = useCallback(() => {
    setState(prev => ({ ...prev, hasError: true }));
    if (state.src) {
      cleanupBlobUrl(state.src);
    }
  }, [state.src, cleanupBlobUrl]);

  // Loading state
  if (state.isLoading) {
    return (
      <div style={containerStyles} className={className}>
        <div
          className={styles.defaultCoin}
          style={{
            ...imageContainerStyles,
            opacity: 0.6,
            animation: 'pulse 1.5s ease-in-out infinite alternate'
          }}
          role="img"
          aria-label={`Loading profile image for ${fallbackInitials}`}
        >
          {fallbackInitials}
        </div>
      </div>
    );
  }

  // Success state - show image
  if (state.src && !state.hasError) {
    return (
      <div style={containerStyles} className={className}>
        <div style={imageContainerStyles}>
          <img
            src={state.src}
            alt={alt}
            className={styles.profileImage}
            style={{ width: '100%', height: '100%' }}
            onError={handleImageError}
            loading="lazy"
            role="img"
            aria-label={`Profile image for ${alt || fallbackInitials}`}
          />
        </div>
        {showPresence && state.presence && (
          <div
            style={presenceStyles}
            title={`${state.presence.availability} - ${state.presence.activity}`}
            aria-label={`Presence: ${state.presence.availability}`}
          />
        )}
      </div>
    );
  }

  // Fallback state - show initials
  return (
    <div style={containerStyles} className={className}>
      <div
        className={styles.defaultCoin}
        style={imageContainerStyles}
        role="img"
        aria-label={`Default avatar showing initials ${fallbackInitials}`}
        title={`No profile image available for ${alt || fallbackInitials}`}
      >
        {fallbackInitials}
      </div>
      {showPresence && state.presence && (
        <div
          style={presenceStyles}
          title={`${state.presence.availability} - ${state.presence.activity}`}
          aria-label={`Presence: ${state.presence.availability}`}
        />
      )}
    </div>
  );
};

export default UnifiedProfileImage;