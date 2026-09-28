import {
  addDays,
  buildMonthWeeks,
  buildWeek,
  diffDays,
  formatDateRange,
  getAbsenceTypeKey,
  getAbsencesForDay,
  getOutThisWeek,
  isSameDay,
  layoutSingleWeek,
  layoutWeeks,
  startOfDay
} from './calendarUtils';
import type { IAbsence } from '../models/IAbsence';

function abs(
  id: number,
  name: string,
  start: [number, number, number],
  end: [number, number, number],
  type: string = 'Vacation'
): IAbsence {
  return {
    id,
    employeeName: name,
    type,
    start: new Date(start[0], start[1], start[2]),
    end: new Date(end[0], end[1], end[2])
  };
}

describe('date helpers', () => {
  it('diffDays counts whole days and ignores the time of day', () => {
    expect(diffDays(new Date(2026, 8, 1), new Date(2026, 8, 4))).toBe(3);
    expect(diffDays(new Date(2026, 8, 4, 23), new Date(2026, 8, 1, 1))).toBe(-3);
  });

  it('addDays and isSameDay round-trip', () => {
    const d = new Date(2026, 8, 30);
    expect(isSameDay(addDays(d, 1), new Date(2026, 9, 1))).toBe(true);
  });
});

describe('buildMonthWeeks', () => {
  const today = new Date(2026, 8, 7);

  it('returns seven-cell rows when weekends are shown', () => {
    const weeks = buildMonthWeeks(2026, 8, { startWeekOnMonday: true, showWeekends: true }, today);
    expect(weeks.every((w) => w.length === 7)).toBe(true);
  });

  it('returns five-cell Monday-first rows when weekends are hidden', () => {
    const weeks = buildMonthWeeks(2026, 8, { startWeekOnMonday: false, showWeekends: false }, today);
    expect(weeks.every((w) => w.length === 5)).toBe(true);
    for (const w of weeks) {
      expect(w[0].date.getDay()).toBe(1); // Monday
      expect(w.some((c) => c.isWeekend)).toBe(false);
    }
  });

  it('pads a Monday-first September 2026 with one leading August day', () => {
    // 1 September 2026 is a Tuesday.
    const weeks = buildMonthWeeks(2026, 8, { startWeekOnMonday: true, showWeekends: true }, today);
    expect(weeks[0][0]).toMatchObject({ day: 31, inCurrentMonth: false });
    expect(weeks[0][1]).toMatchObject({ day: 1, inCurrentMonth: true });
  });

  it('marks today only in the month on display', () => {
    const shown = buildMonthWeeks(2026, 8, { startWeekOnMonday: true, showWeekends: true }, today);
    const flags = shown.reduce<number[]>((acc, w) => acc.concat(w.filter((c) => c.isToday).map((c) => c.day)), []);
    expect(flags).toEqual([7]);

    const other = buildMonthWeeks(2026, 9, { startWeekOnMonday: true, showWeekends: true }, today);
    expect(other.some((w) => w.some((c) => c.isToday))).toBe(false);
  });
});

describe('layoutWeeks', () => {
  const options = { startWeekOnMonday: true, showWeekends: true };

  it('places a single absence as one bar with the right column and span', () => {
    const weeks = buildMonthWeeks(2026, 8, options); // week 1: Mon 31 Aug .. Sun 6 Sep
    const layouts = layoutWeeks(weeks, [abs(1, 'Alex', [2026, 8, 1], [2026, 8, 3])], 3);

    const bar = layouts[0].bars[0];
    expect(bar).toMatchObject({ startCol: 1, span: 3, lane: 0, continuesLeft: false, continuesRight: false });
  });

  it('stacks overlapping absences onto separate lanes', () => {
    const weeks = buildMonthWeeks(2026, 8, options);
    const layouts = layoutWeeks(
      weeks,
      [
        abs(1, 'Alex', [2026, 8, 1], [2026, 8, 3]),
        abs(2, 'Bev', [2026, 8, 2], [2026, 8, 4]),
        abs(3, 'Cal', [2026, 8, 3], [2026, 8, 5])
      ],
      3
    );
    const lanes = layouts[0].bars.map((b) => b.lane).sort();
    expect(lanes).toEqual([0, 1, 2]);
  });

  it('reuses a lane once an earlier bar has ended', () => {
    const weeks = buildMonthWeeks(2026, 8, options);
    const layouts = layoutWeeks(
      weeks,
      [abs(1, 'Alex', [2026, 8, 1], [2026, 8, 2]), abs(2, 'Bev', [2026, 8, 4], [2026, 8, 5])],
      3
    );
    expect(layouts[0].bars.every((b) => b.lane === 0)).toBe(true);
  });

  it('splits a cross-week absence and flags the continuation', () => {
    const weeks = buildMonthWeeks(2026, 8, options);
    // Fri 4 Sep .. Wed 9 Sep spans week 0 and week 1.
    const layouts = layoutWeeks(weeks, [abs(1, 'Alex', [2026, 8, 4], [2026, 8, 9])], 3);

    const first = layouts[0].bars[0];
    const second = layouts[1].bars[0];
    expect(first).toMatchObject({ continuesLeft: false, continuesRight: true });
    expect(second).toMatchObject({ continuesLeft: true, continuesRight: false, startCol: 0 });
  });

  it('pushes absences past maxLanes into the per-day overflow count', () => {
    const weeks = buildMonthWeeks(2026, 8, options);
    const layouts = layoutWeeks(
      weeks,
      [
        abs(1, 'A', [2026, 8, 2], [2026, 8, 2]),
        abs(2, 'B', [2026, 8, 2], [2026, 8, 2]),
        abs(3, 'C', [2026, 8, 2], [2026, 8, 2])
      ],
      2
    );
    expect(layouts[0].bars.length).toBe(2);
    // 1 September is column 1 in a Monday-first grid that starts on 31 August.
    expect(layouts[0].overflowByDay[2]).toBe(1);
    expect(layouts[0].countByDay[2]).toBe(3);
  });

  it('counts every absence covering a day for the capacity tint, ignoring lanes', () => {
    const weeks = buildMonthWeeks(2026, 8, options);
    const layouts = layoutWeeks(
      weeks,
      [
        abs(1, 'A', [2026, 8, 1], [2026, 8, 3]),
        abs(2, 'B', [2026, 8, 2], [2026, 8, 2]),
        abs(3, 'C', [2026, 8, 2], [2026, 8, 4])
      ],
      1
    );
    // Column 2 == 1 September; all three cover it, though only one bar fits.
    expect(layouts[0].countByDay[2]).toBe(3);
    expect(layouts[0].bars.length).toBe(1);
  });

  it('does not show a weekend-only absence when weekends are hidden', () => {
    const weeks = buildMonthWeeks(2026, 8, { startWeekOnMonday: true, showWeekends: false });
    // 5-6 September 2026 is a Saturday-Sunday.
    const layouts = layoutWeeks(weeks, [abs(1, 'Alex', [2026, 8, 5], [2026, 8, 6])], 3);
    expect(layouts.every((l) => l.bars.length === 0)).toBe(true);
  });

  it('joins Friday to Monday across a hidden weekend without a continuation arrow', () => {
    const weeks = buildMonthWeeks(2026, 8, { startWeekOnMonday: true, showWeekends: false });
    // Fri 4 Sep .. Mon 7 Sep: Friday is in week 0, Monday in week 1.
    const layouts = layoutWeeks(weeks, [abs(1, 'Alex', [2026, 8, 4], [2026, 8, 7])], 3);
    const friBar = layouts[0].bars[0];
    const monBar = layouts[1].bars[0];
    expect(friBar).toMatchObject({ startCol: 4, span: 1, continuesRight: true });
    expect(monBar).toMatchObject({ startCol: 0, span: 1, continuesLeft: true });
  });
});

describe('buildWeek', () => {
  const today = new Date(2026, 8, 9); // Wednesday 9 September 2026

  it('returns the seven-day row containing the anchor, Monday-first', () => {
    const week = buildWeek(today, { startWeekOnMonday: true, showWeekends: true }, today);
    expect(week.length).toBe(7);
    expect(week[0].date.getDay()).toBe(1); // Monday
    expect(week.some((c) => isSameDay(c.date, today))).toBe(true);
    expect(week.every((c) => c.inCurrentMonth)).toBe(true);
    expect(week.filter((c) => c.isToday).length).toBe(1);
  });

  it('drops Saturday and Sunday when weekends are hidden', () => {
    const week = buildWeek(today, { startWeekOnMonday: false, showWeekends: false }, today);
    expect(week.length).toBe(5);
    expect(week.some((c) => c.isWeekend)).toBe(false);
  });

  it('anchors correctly for a Sunday when the week starts on Monday', () => {
    const sunday = new Date(2026, 8, 13);
    const week = buildWeek(sunday, { startWeekOnMonday: true, showWeekends: true }, today);
    expect(week[0].date.getDate()).toBe(7); // Monday 7 September
    expect(week[6].date.getDate()).toBe(13);
  });
});

describe('layoutSingleWeek', () => {
  const options = { startWeekOnMonday: true, showWeekends: true };
  const anchor = new Date(2026, 8, 9);

  it('shows arrows when an absence reaches past the week on either side', () => {
    const week = buildWeek(anchor, options, anchor); // Mon 7 .. Sun 13 Sep
    const layout = layoutSingleWeek(
      week,
      [
        {
          id: 1,
          employeeName: 'Alex',
          type: 'Vacation',
          start: new Date(2026, 8, 4),
          end: new Date(2026, 8, 20)
        }
      ],
      3
    );
    expect(layout.bars[0]).toMatchObject({
      startCol: 0,
      span: 7,
      continuesLeft: true,
      continuesRight: true
    });
  });

  it('shows no arrows for an absence that fits inside the week', () => {
    const week = buildWeek(anchor, options, anchor);
    const layout = layoutSingleWeek(
      week,
      [
        {
          id: 1,
          employeeName: 'Alex',
          type: 'Sick',
          start: new Date(2026, 8, 8),
          end: new Date(2026, 8, 10)
        }
      ],
      3
    );
    expect(layout.bars[0]).toMatchObject({
      continuesLeft: false,
      continuesRight: false,
      span: 3
    });
  });
});

describe('getAbsencesForDay', () => {
  const absences = [
    abs(1, 'Alex', [2026, 8, 1], [2026, 8, 5]),
    abs(2, 'Bev', [2026, 8, 5], [2026, 8, 5]),
    abs(3, 'Cal', [2026, 8, 8], [2026, 8, 9])
  ];

  it('returns everyone whose range covers the day, sorted by name', () => {
    const out = getAbsencesForDay(absences, new Date(2026, 8, 5));
    expect(out.map((a) => a.employeeName)).toEqual(['Alex', 'Bev']);
  });

  it('returns nothing for a clear day', () => {
    expect(getAbsencesForDay(absences, new Date(2026, 8, 6))).toEqual([]);
  });
});

describe('getOutThisWeek', () => {
  const today = new Date(2026, 8, 7); // Monday

  it('lists people out in the next seven days, active ones first as "Today"', () => {
    const absences = [
      abs(1, 'Later', [2026, 8, 11], [2026, 8, 12]),
      abs(2, 'NowA', [2026, 8, 6], [2026, 8, 9]),
      abs(3, 'Soon', [2026, 8, 9], [2026, 8, 9])
    ];
    const out = getOutThisWeek(absences, today);
    expect(out.map((o) => o.absence.employeeName)).toEqual(['NowA', 'Soon', 'Later']);
    expect(out[0].activeToday).toBe(true);
    expect(isSameDay(out[0].from, startOfDay(today))).toBe(true);
  });

  it('drops absences that finished before today or start beyond the window', () => {
    const absences = [
      abs(1, 'Past', [2026, 8, 1], [2026, 8, 3]),
      abs(2, 'Far', [2026, 8, 20], [2026, 8, 21])
    ];
    expect(getOutThisWeek(absences, today)).toEqual([]);
  });
});

describe('getAbsenceTypeKey', () => {
  it('maps known values and synonyms', () => {
    expect(getAbsenceTypeKey('Vacation')).toBe('vacation');
    expect(getAbsenceTypeKey('annual leave')).toBe('vacation');
    expect(getAbsenceTypeKey('Business trip')).toBe('businessTrip');
    expect(getAbsenceTypeKey('Paternity')).toBe('parental');
  });

  it('gives a custom value its own stable x- key so it keeps a distinct colour', () => {
    expect(getAbsenceTypeKey('Sabbatical')).toBe('x-sabbatical');
    expect(getAbsenceTypeKey('Jury duty')).toBe('x-jury-duty');
    expect(getAbsenceTypeKey('  Jury   duty  ')).toBe('x-jury-duty');
  });

  it('falls back to other only for an empty value', () => {
    expect(getAbsenceTypeKey('')).toBe('other');
    expect(getAbsenceTypeKey('   ')).toBe('other');
  });
});

describe('formatDateRange', () => {
  it('shows one date for a single day', () => {
    expect(formatDateRange(new Date(2026, 8, 4), new Date(2026, 8, 4), 'en-US')).toBe('Sep 4, 2026');
  });

  it('shows a range for multiple days', () => {
    expect(formatDateRange(new Date(2026, 8, 4), new Date(2026, 8, 9), 'en-US')).toBe('Sep 4 – Sep 9, 2026');
  });
});
