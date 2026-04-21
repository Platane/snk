/**
 * Get the contribution grid from a Forgejo/Codeberg user heatmap API.
 *
 * The heatmap endpoint returns raw Unix timestamps (15-minute UTC buckets).
 * Date bucketing uses the caller's local timezone (set TZ env var to control it).
 *
 * Works with any Forgejo instance via the `baseUrl` option.
 * Defaults to Codeberg: https://codeberg.org
 *
 * @example
 *   getForgejoUserContribution("username")
 *   getForgejoUserContribution("username", { baseUrl: "https://codeberg.org" })
 */
export const getForgejoUserContribution = async (
  userName: string,
  o: { baseUrl?: string } = {},
) => {
  const baseUrl = o.baseUrl ?? "https://codeberg.org";

  const res = await fetch(`${baseUrl}/api/v1/users/${userName}/heatmap`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));

  const heatmapData = (await res.json()) as HeatmapEntry[];

  // Aggregate contributions per local date (YYYY-MM-DD).
  // Timestamps are 15-min UTC buckets; en-CA locale gives consistent YYYY-MM-DD format.
  // The timezone is determined by the process TZ env var.
  const countsByDate = new Map<string, number>();
  for (const { timestamp, contributions } of heatmapData) {
    const date = new Date(timestamp * 1000).toLocaleDateString("en-CA");
    countsByDate.set(date, (countsByDate.get(date) ?? 0) + contributions);
  }

  // Match the color index formula used by Forgejo's vue3-calendar-heatmap:
  // ceil(count / max * 3) + 1, capped at 4 (we use a 0-4 scale vs their 1-5).
  const max = Math.max(0, ...countsByDate.values());

  const levelForCount = (count: number): 0 | 1 | 2 | 3 | 4 =>
    count <= 0 || max === 0
      ? 0
      : count >= max
        ? 4
        : (Math.ceil((count / max) * 3) as 1 | 2 | 3);

  // Build the cell grid covering the last ~365 days, starting on a Sunday.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the Sunday at or before (today - 365 days)
  const start = new Date(today);
  start.setDate(start.getDate() - 365);
  start.setDate(start.getDate() - start.getDay()); // rewind to Sunday

  const cells = [];
  const cursor = new Date(start);
  let x = 0;

  while (cursor <= today) {
    const y = cursor.getDay(); // 0 = Sunday
    const date = cursor.toLocaleDateString("en-CA");
    const count = countsByDate.get(date) ?? 0;

    cells.push({ x, y, date, count, level: levelForCount(count) });

    cursor.setDate(cursor.getDate() + 1);
    if (y === 6) x++; // advance week after Saturday
  }

  return cells;
};

type HeatmapEntry = {
  timestamp: number;
  contributions: number;
};

export type Res = Awaited<ReturnType<typeof getForgejoUserContribution>>;
export type Cell = Res[number];
