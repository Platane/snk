/**
 * Source bitmasks for multi-source calendars.
 * GitHub=1, GitLab=2, WakaTime=4; Bitbucket=8 reserved for later.
 * Intensity (level 0–4) is tracked separately from the source mask.
 */
export const PLATFORM_BITS = {
  github: 1,
  gitlab: 2,
  wakatime: 4,
  // bitbucket: 8 — reserved; needs Color widened beyond 9 before enabling
} as const;

export type PlatformBitKey = keyof typeof PLATFORM_BITS;

export type ContributionCell = {
  x: number;
  y: number;
  date: string;
  count: number;
  /** Intensity 0–4 for the solver / ladder L/C. */
  level: number;
  /** OR of PLATFORM_BITS for sources active that day (0 if empty). */
  sources: number;
};

const formatDate = (d: Date) => d.toLocaleDateString("en-CA");

type DayAgg = { sources: number; level: number; count: number };

/**
 * Merge per-source calendars by date:
 * - OR source bitmasks when a source has level > 0
 * - intensity = max(level) across sources that day
 */
export const mergeContributionCells = (
  labeled: { bit: number; cells: Omit<ContributionCell, "sources">[] }[],
): ContributionCell[] => {
  const byDate = new Map<string, DayAgg>();

  for (const { bit, cells } of labeled) {
    for (const c of cells) {
      if (c.level <= 0 && c.count <= 0) continue;
      const level = Math.max(0, Math.min(4, c.level || (c.count > 0 ? 1 : 0)));
      const prev = byDate.get(c.date) ?? { sources: 0, level: 0, count: 0 };
      byDate.set(c.date, {
        sources: prev.sources | bit,
        level: Math.max(prev.level, level),
        count: prev.count + c.count,
      });
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - 365);
  start.setDate(start.getDate() - start.getDay());

  const cells: ContributionCell[] = [];
  const cursor = new Date(start);
  let x = 0;

  while (cursor <= today) {
    const y = cursor.getDay();
    const date = formatDate(cursor);
    const agg = byDate.get(date) ?? { sources: 0, level: 0, count: 0 };

    cells.push({
      x,
      y,
      date,
      count: agg.count,
      level: agg.level,
      sources: agg.sources,
    });

    cursor.setDate(cursor.getDate() + 1);
    if (y === 6) x++;
  }

  return cells;
};
