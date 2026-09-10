/**
 * Source bitmasks for multi-source presence blending.
 * GitHub=1, GitLab=2, WakaTime=4; Bitbucket=8 reserved for later.
 * Combo colors are the OR of active source bits (1–7 for three sources).
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
  level: number;
};

const formatDate = (d: Date) => d.toLocaleDateString("en-CA");

/**
 * Merge per-source calendars by date using presence bitmasks.
 * Rebuilds a Sunday-aligned ~365-day grid so x/y stay consistent.
 */
export const mergeContributionCells = (
  labeled: { bit: number; cells: ContributionCell[] }[],
): ContributionCell[] => {
  const byDate = new Map<string, number>();

  for (const { bit, cells } of labeled) {
    for (const c of cells) {
      if (c.count > 0 || c.level > 0) {
        byDate.set(c.date, (byDate.get(c.date) ?? 0) | bit);
      }
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
    const mask = byDate.get(date) ?? 0;

    cells.push({
      x,
      y,
      date,
      count: mask,
      level: mask,
    });

    cursor.setDate(cursor.getDate() + 1);
    if (y === 6) x++;
  }

  return cells;
};
