import { IAbsence } from '../models/IAbsence';
import { addDays, startOfDay } from '../utils/calendarUtils';

interface IMockSeed {
  name: string;
  email: string;
  type: string;
  startOffset: number; // days from today
  length: number; // inclusive days
  notes?: string;
}

// Names are fictional characters from J.R.R. Tolkien's legendarium, on the
// standard @contoso.com sample domain, so the sample carries no personal data.
// "Sabbatical" and "Jury duty" are deliberately not in MOCK_CHOICES -- they show
// how a custom Choice value still gets its own colour and icon.
const SEEDS: IMockSeed[] = [
  { name: 'Frodo Baggins', email: 'frodo.baggins@contoso.com', type: 'Vacation', startOffset: -3, length: 12, notes: 'Travelling east. Reachable by messenger only; back on the 15th.' },
  { name: 'Samwise Gamgee', email: 'samwise.gamgee@contoso.com', type: 'Business trip', startOffset: 1, length: 3, notes: 'Regional gardeners’ conference in Bree — sharing the potato session.' },
  { name: 'Meriadoc Brandybuck', email: 'meriadoc.brandybuck@contoso.com', type: 'Sick', startOffset: 0, length: 2, notes: 'Chill after a long ride. Expects to be back Thursday.' },
  { name: 'Peregrin Took', email: 'peregrin.took@contoso.com', type: 'Training', startOffset: 7, length: 1, notes: 'Fire-safety course (mandatory after the Denethor incident).' },
  { name: 'Galadriel', email: 'galadriel@contoso.com', type: 'Vacation', startOffset: 4, length: 5, notes: 'Annual leave in Lothlórien. Phial with Frodo for urgent matters.' },
  { name: 'Gandalf', email: 'gandalf@contoso.com', type: 'Sabbatical', startOffset: -10, length: 40, notes: 'Extended research sabbatical. Contact only for a Balrog-level emergency.' },
  { name: 'Aragorn', email: 'aragorn@contoso.com', type: 'Vacation', startOffset: 9, length: 4, notes: 'Coronation preparations; delegating to Faramir.' },
  { name: 'Boromir', email: 'boromir@contoso.com', type: 'Other', startOffset: 2, length: 1, notes: 'Council of Elrond — all-day offsite, no laptop.' },
  { name: 'Legolas', email: 'legolas@contoso.com', type: 'Business trip', startOffset: 14, length: 2, notes: 'Site visit to the Mirkwood partner team.' },
  { name: 'Gimli', email: 'gimli@contoso.com', type: 'Sick', startOffset: -1, length: 1, notes: 'Back strain from the Glittering Caves survey.' },
  { name: 'Éowyn', email: 'eowyn@contoso.com', type: 'Training', startOffset: 21, length: 2, notes: 'Leadership offsite in Edoras.' },
  { name: 'Faramir', email: 'faramir@contoso.com', type: 'Jury duty', startOffset: 3, length: 2, notes: 'Summoned to court in Minas Tirith.' },
  { name: 'Bilbo Baggins', email: 'bilbo.baggins@contoso.com', type: 'Vacation', startOffset: -20, length: 6, notes: 'Writing retreat in Rivendell.' }
];

/**
 * A month of plausible absences relative to today, so the web part renders in the
 * hosted workbench and for screenshots without a real list. Turned on by the
 * "Use sample data" toggle in the property pane.
 */
export function getMockAbsences(today: Date = new Date()): IAbsence[] {
  const base: Date = startOfDay(today);
  return SEEDS.map((seed, index) => {
    const start: Date = addDays(base, seed.startOffset);
    return {
      id: index + 1,
      employeeName: seed.name,
      employeeEmail: seed.email,
      employeeLogin: `i:0#.f|membership|${seed.email}`,
      type: seed.type,
      start,
      end: addDays(start, Math.max(0, seed.length - 1)),
      notes: seed.notes
    };
  });
}
