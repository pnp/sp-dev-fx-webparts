import * as React from 'react';
import {
  MessageBar,
  MessageBarType,
  IRatingStyleProps,
  IRatingStyles,
  Rating,
  RatingSize,
  TooltipHost
} from 'office-ui-fabric-react';
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
    if (!context.pageContext.list) {
      return;
    }
    if (!context.pageContext.listItem) {
      return;
    }
    const service = new SPHttpClientService(context);
    await service.ensureFeatureEnabled();
    const user = await service.getCurrentUser();
    const [average, count, rating] = await service.getRating(user.LoginName);
    return {
      rating: rating,
      count: count,
      average: average
    };
  }, [context]);

  const setRating = React.useCallback(async (rating: number): Promise<void> => {
    if (!context.pageContext.list) {
      return;
    }
    if (!context.pageContext.listItem) {
      return;
    }
    const service = new SPHttpClientService(context);
    await service.setRating(rating);
  }, [context]);

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
        console.error(error);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const rating = await getRating();
        if (rating) {
          setValue(rating);
          setLoading(false);
        }
      } catch (error) {
        setError(error.toString());
        console.error(error);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {
          (() => {
            if (loading) {
              return null;
            }
            if (error) {
              return (
                <MessageBar messageBarType={MessageBarType.error}>
                  {error}
                </MessageBar>
              );
            }
            return (
              <div className={styles.flex}>
                <div>{strings.RateThisPageLabel}: </div>
                <TooltipHost content={`${strings.YourRatingLabel}: ${value.rating}`}>
                  <Rating
                    allowZeroStars
                    rating={value.average}
                    size={RatingSize.Small}
                    styles={ratingStyles}
                    onChange={handleOnChange} />
                </TooltipHost>
                <div>{value.count}</div>
              </div>
            );
          })()
        }
      </div>
    </div>
  );

};

export default Ratings;
