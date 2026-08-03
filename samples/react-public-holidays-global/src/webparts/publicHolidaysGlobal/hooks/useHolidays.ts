import * as React from 'react';
import { HolidaysService } from '../services/HolidaysService';
import { IPublicHoliday } from '../models/IPublicHoliday';
import { HolidaysError, HolidaysErrorKind } from '../models/HolidaysError';

export type HolidaysStatus = 'loading' | 'ready' | 'empty' | 'error';

export interface IHolidaysState {
  status: HolidaysStatus;
  holidays: IPublicHoliday[];
  errorKind?: HolidaysErrorKind;
}

/**
 * Owns the request lifecycle for one country/year pair.
 *
 * Keeping this out of the component means the view only renders a status, and
 * the fetch sequencing (including ignoring a response that arrived after the
 * user already changed country) lives in one place.
 */
export function useHolidays(countryCode: string, year: number): IHolidaysState & { reload: () => void } {
  const [state, setState] = React.useState<IHolidaysState>({ status: 'loading', holidays: [] });
  const [attempt, setAttempt] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', holidays: [] });

    HolidaysService.getHolidays(year, countryCode)
      .then((holidays) => {
        if (cancelled) return;
        setState({
          status: holidays.length === 0 ? 'empty' : 'ready',
          holidays
        });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setState({
          status: 'error',
          holidays: [],
          errorKind: error instanceof HolidaysError ? error.kind : HolidaysErrorKind.ServiceError
        });
      });

    return () => {
      cancelled = true;
    };
  }, [countryCode, year, attempt]);

  const reload = React.useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, reload };
}
