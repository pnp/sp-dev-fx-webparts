import { IPublicHoliday } from '../models/IPublicHoliday';
import { HolidaysError, HolidaysErrorKind } from '../models/HolidaysError';

const API_ROOT = 'https://date.nager.at/api/v3';

export class HolidaysService {
  /**
   * Fetches public holidays from the Nager.Date API.
   *
   * Failures are typed rather than collapsed into one message: an unsupported
   * country code is a configuration problem, an unreachable API is not, and
   * only the second one is worth offering a retry for.
   *
   * @param year Year for the holidays.
   * @param countryCode ISO country code (e.g., 'PT', 'ES', 'BR').
   */
  public static async getHolidays(year: number, countryCode: string): Promise<IPublicHoliday[]> {
    let response: Response;

    try {
      response = await fetch(`${API_ROOT}/PublicHolidays/${year}/${countryCode}`);
    } catch {
      throw new HolidaysError(HolidaysErrorKind.Unreachable, countryCode, year);
    }

    if (response.status === 404) {
      throw new HolidaysError(HolidaysErrorKind.UnknownCountry, countryCode, year);
    }

    if (!response.ok) {
      throw new HolidaysError(HolidaysErrorKind.ServiceError, countryCode, year, response.status);
    }

    return response.json();
  }
}
