import {
  ACCENT_COUNT,
  buildMonthGrid,
  getAccentIndex,
  groupBirthdaysByDay,
  getUpcomingBirthdays,
  isLeapYear,
  resolveDayInYear
} from './calendarUtils';
import type { ICalendarCell, IUpcomingBirthday } from './calendarUtils';
import type { IBirthday } from '../models/IBirthday';

function bday(id: number, name: string, month: number, day: number): IBirthday {
  return { id, name, month, day };
}

describe('getAccentIndex', () => {
  it('always lands inside the available palette', () => {
    const names: string[] = ['Alex', 'Sam', 'Jo', 'Casey', 'Robin', 'Pat', '', 'Zoe Q. Xavier-Smith'];

    for (const name of names) {
      const index: number = getAccentIndex(name);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(ACCENT_COUNT);
      expect(Number.isInteger(index)).toBe(true);
    }
  });

  it('gives the same person the same colour every time', () => {
    expect(getAccentIndex('Frodo Baggins')).toBe(getAccentIndex('Frodo Baggins'));
  });

  it('spreads a realistic set of names across every colour', () => {
    const names: string[] = [
      'Alex', 'Sam', 'Jo', 'Casey', 'Robin', 'Pat', 'Zoe', 'Adam',
      'Frodo Baggins', 'Bilbo Baggins', 'Meriadoc Brandybuck', 'Peregrin Took'
    ];
    const used: Set<number> = new Set(names.map(getAccentIndex));

    expect(used.size).toBe(ACCENT_COUNT);
  });
});

describe('isLeapYear', () => {
  it('follows the Gregorian rules', () => {
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(2026)).toBe(false);
    expect(isLeapYear(2000)).toBe(true);  // divisible by 400
    expect(isLeapYear(1900)).toBe(false); // divisible by 100 but not 400
  });
});

describe('resolveDayInYear', () => {
  it('keeps 29 February in a leap year', () => {
    expect(resolveDayInYear(1, 29, 2024)).toBe(29);
  });

  it('moves 29 February onto the 28th in a common year', () => {
    expect(resolveDayInYear(1, 29, 2026)).toBe(28);
  });

  it('leaves every other date alone', () => {
    expect(resolveDayInYear(1, 28, 2026)).toBe(28);
    expect(resolveDayInYear(0, 31, 2026)).toBe(31);
  });
});

describe('groupBirthdaysByDay', () => {
  const birthdays: IBirthday[] = [
    bday(1, 'Alex', 8, 4),
    bday(2, 'Sam', 8, 4),
    bday(3, 'Jo', 8, 20),
    bday(4, 'Casey', 0, 4) // January, must not leak into September
  ];

  it('keys the requested month by day and ignores other months', () => {
    const grouped: Map<number, IBirthday[]> = groupBirthdaysByDay(birthdays, 2026, 8);

    expect(grouped.get(4)!.map((b) => b.name)).toEqual(['Alex', 'Sam']);
    expect(grouped.get(20)!.map((b) => b.name)).toEqual(['Jo']);
    expect(grouped.size).toBe(2);
  });

  it('lands a 29 February birthday on the 28th in a common year', () => {
    const leaplings: IBirthday[] = [bday(1, 'Robin', 1, 29), bday(2, 'Pat', 1, 28)];

    const common: Map<number, IBirthday[]> = groupBirthdaysByDay(leaplings, 2026, 1);
    expect(common.get(28)!.map((b) => b.name)).toEqual(['Pat', 'Robin']);
    expect(common.has(29)).toBe(false);

    const leap: Map<number, IBirthday[]> = groupBirthdaysByDay(leaplings, 2024, 1);
    expect(leap.get(28)!.map((b) => b.name)).toEqual(['Pat']);
    expect(leap.get(29)!.map((b) => b.name)).toEqual(['Robin']);
  });
});

describe('buildMonthGrid', () => {
  const empty: Map<number, IBirthday[]> = new Map();
  const today: Date = new Date(2026, 8, 6);

  it('always returns whole weeks', () => {
    for (let month = 0; month < 12; month++) {
      for (const firstDay of [0, 1]) {
        const cells: ICalendarCell[] = buildMonthGrid(2026, month, empty, firstDay, today);
        expect(cells.length % 7).toBe(0);
      }
    }
  });

  it('pads a Sunday-first September 2026 with two leading August days', () => {
    // 1 September 2026 is a Tuesday.
    const cells: ICalendarCell[] = buildMonthGrid(2026, 8, empty, 0, today);

    expect(cells[0]).toMatchObject({ date: 30, inCurrentMonth: false });
    expect(cells[1]).toMatchObject({ date: 31, inCurrentMonth: false });
    expect(cells[2]).toMatchObject({ date: 1, inCurrentMonth: true });
  });

  it('pads a Monday-first September 2026 with one leading August day', () => {
    const cells: ICalendarCell[] = buildMonthGrid(2026, 8, empty, 1, today);

    expect(cells[0]).toMatchObject({ date: 31, inCurrentMonth: false });
    expect(cells[1]).toMatchObject({ date: 1, inCurrentMonth: true });
  });

  it('adds no leading padding when the month starts on the first weekday', () => {
    // 1 February 2026 is a Sunday, so a Sunday-first grid starts straight in.
    const cells: ICalendarCell[] = buildMonthGrid(2026, 1, empty, 0, today);

    expect(cells[0]).toMatchObject({ date: 1, inCurrentMonth: true });
  });

  it('marks today only in the month being displayed', () => {
    const current: ICalendarCell[] = buildMonthGrid(2026, 8, empty, 0, today);
    expect(current.filter((c) => c.isToday).map((c) => c.date)).toEqual([6]);

    const other: ICalendarCell[] = buildMonthGrid(2026, 9, empty, 0, today);
    expect(other.some((c) => c.isToday)).toBe(false);
  });

  it('places birthdays on their day of the current month only', () => {
    const grouped: Map<number, IBirthday[]> = new Map([[4, [bday(1, 'Alex', 8, 4)]]]);
    const cells: ICalendarCell[] = buildMonthGrid(2026, 8, grouped, 0, today);

    const withBirthdays: ICalendarCell[] = cells.filter((c) => c.birthdays.length > 0);
    expect(withBirthdays.length).toBe(1);
    expect(withBirthdays[0]).toMatchObject({ date: 4, inCurrentMonth: true });
  });
});

describe('getUpcomingBirthdays', () => {
  const today: Date = new Date(2026, 8, 6); // 6 September 2026

  it('includes today and orders by how soon each one falls', () => {
    const birthdays: IBirthday[] = [
      bday(1, 'Later', 8, 20),
      bday(2, 'Today', 8, 6),
      bday(3, 'Soon', 8, 9)
    ];

    const upcoming: IUpcomingBirthday[] = getUpcomingBirthdays(birthdays, today, 5, 60);

    expect(upcoming.map((u) => u.birthday.name)).toEqual(['Today', 'Soon', 'Later']);
    expect(upcoming[0].daysAway).toBe(0);
    expect(upcoming[1].daysAway).toBe(3);
  });

  it('wraps into next year for birthdays already past', () => {
    const upcoming: IUpcomingBirthday[] = getUpcomingBirthdays([bday(1, 'Casey', 0, 4)], today, 5, 400);

    expect(upcoming[0].date.getFullYear()).toBe(2027);
    expect(upcoming[0].date.getMonth()).toBe(0);
  });

  it('drops anything beyond the window and respects the limit', () => {
    const birthdays: IBirthday[] = [
      bday(1, 'Near', 8, 8),
      bday(2, 'Far', 2, 1) // roughly six months out
    ];

    expect(getUpcomingBirthdays(birthdays, today, 5, 30).map((u) => u.birthday.name)).toEqual(['Near']);
    expect(getUpcomingBirthdays(birthdays, today, 1, 400).map((u) => u.birthday.name)).toEqual(['Near']);
  });

  it('sorts people sharing a day by name', () => {
    const birthdays: IBirthday[] = [bday(1, 'Zoe', 8, 9), bday(2, 'Adam', 8, 9)];

    expect(getUpcomingBirthdays(birthdays, today, 5, 60).map((u) => u.birthday.name)).toEqual(['Adam', 'Zoe']);
  });

  it('shows a leapling on 28 February in a common year', () => {
    const upcoming: IUpcomingBirthday[] = getUpcomingBirthdays(
      [bday(1, 'Robin', 1, 29)],
      new Date(2027, 0, 1),
      5,
      400
    );

    expect(upcoming[0].date.getMonth()).toBe(1);
    expect(upcoming[0].date.getDate()).toBe(28);
  });
});
