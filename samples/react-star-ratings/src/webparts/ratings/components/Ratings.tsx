import * as React from 'react';
import {
  MessageBar,
  MessageBarType,
  IRatingStyleProps,
  IRatingStyles,
  Rating,
  RatingSize,
  TooltipHost
} from '@fluentui/react';
import styles from './Ratings.module.scss';
import * as strings from 'RatingsWebPartStrings';
import { IRatingsProps } from './IRatingsProps';
import SPHttpClientService from '../services/SPHttpClientService';

interface IRatings {
  rating: number;
  count: number;
  average: number;
}

export const Ratings = ({ context, properties }: IRatingsProps) => {

  const ratingStyles = React.useMemo(() => (props: IRatingStyleProps): Partial<IRatingStyles> => ({
    root: {
      selectors: {
        '&:hover': {
          selectors: {
            '.ms-RatingStar-back': {
              color: properties.inactiveColor,
            }
          }
        }
      }
    },
    ratingButton: {
      selectors: {
        '&:hover ~ .ms-Rating-button': {
          selectors: {
            '.ms-RatingStar-back': {
              color: properties.inactiveColor,
            },
            '.ms-RatingStar-front': {
              color: properties.inactiveColor,
            }
          }
        },
        '&:hover': {
          selectors: {
            '.ms-RatingStar-back': {
              color: properties.inactiveColor,
            },
            '.ms-RatingStar-front': {
              color: properties.inactiveColor,
            }
          }
        }
      }
    },
    ratingStarFront: {
      color: properties.activeColor
    },
    ratingStarBack: {
      color: properties.activeColor
    }
  }), [
    properties.activeColor,
    properties.inactiveColor
  ]);

  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>();
  const [value, setValue] = React.useState<IRatings>();

  const getRating = React.useCallback(async (): Promise<IRatings> => {
    const service = new SPHttpClientService(context);
    await service.ensureFeatureEnabled();
    const user = await service.getCurrentUser();
    const [ average, count, rating ] = await service.getRating(user.LoginName);
    return {
      rating: rating,
      count: count,
      average: average
    };
  }, []);

  const setRating = React.useCallback(async (rating: number): Promise<void> => {
    const service = new SPHttpClientService(context);
    await service.setRating(rating);
  }, []);

  const handleOnChange = React.useCallback((_, rating?: number) => {
    if (!rating) {
      return;
    }
    (async () => {
      try {
        await setRating(rating);
        setValue(await getRating());
      } catch (error) {
        setError(error.toString());
        throw error;
      }
    })();
  }, [context]);

  React.useEffect(() => {
    (async () => {
      try {
        setValue(await getRating());
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, [context]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {
          loading
            ? null
            : error
              ? (
                <MessageBar messageBarType={MessageBarType.error}>
                  {error}
                </MessageBar>
              )
              : (
                <div className={styles.flex}>
                  <span>{strings.RateThisPageLabel}: </span>
                  <TooltipHost content={`${strings.AverageLabel}: ${value.average}, ${strings.CountLabel}: ${value.count}`}>
                    <Rating
                      allowZeroStars
                      rating={value.rating}
                      size={RatingSize.Small}
                      styles={ratingStyles}
                      onChange={handleOnChange} />
                  </TooltipHost>
                </div>
              )
        }
      </div>
    </div>
  );

};

export default Ratings;
