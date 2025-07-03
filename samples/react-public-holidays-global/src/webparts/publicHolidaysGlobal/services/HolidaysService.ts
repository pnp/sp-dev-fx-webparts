// HolidaysService.ts
import { IPublicHoliday } from '../models/IPublicHoliday';

export class HolidaysService {
  /**
   * Fetches public holidays from Nager.Date API for a given year and country.
   * @param year Year for the holidays.
   * @param countryCode ISO country code (e.g., 'PT', 'ES', 'BR').
   * @returns Promise resolving to array of IPublicHoliday.
   */
  public static async getHolidays(year: number, countryCode: string): Promise<IPublicHoliday[]> {
    const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch holidays');
    }
    return response.json();
  }
}
