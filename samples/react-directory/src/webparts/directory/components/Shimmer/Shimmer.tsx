import { makeStyles, Skeleton, SkeletonItem } from '@fluentui/react-components';
import React from 'react';
import { SKELETON_COUNT } from '../../../../constants';

const useFluentStyles = makeStyles({
  skeleton: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '1.75rem',
    justifyContent: 'center',
  },
});

export const Shimmer = () => {
  const styles = useFluentStyles();
  return (
    <Skeleton
      aria-label="Loading Content"
      animation="pulse"
      className={styles.skeleton}
    >
      {Array(SKELETON_COUNT)
        .fill(0)
        .map((_, index) => (
          <SkeletonItem
            key={index}
            size={128}
            shape="rectangle"
            style={{ width: '250px' }}
          />
        ))}
    </Skeleton>
  );
};
