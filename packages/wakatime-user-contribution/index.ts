/**
 * Get a contribution-style calendar from WakaTime daily summaries.
 *
 * Uses GET /api/v1/users/current/summaries with Basic auth (apiKey as username).
 * Builds the same Sunday-aligned ~365-day grid as the GitLab fetcher.
 * Intensity levels 1–4 are bucketed from total_seconds like GitLab.
 *
 * @example
 *   getWakatimeUserContribution({ apiKey: process.env.WAKATIME_API_KEY! })
 */

type SummaryDay = {
  grand_total?: { total_seconds?: number };
  range?: { date?: string };
};

type SummariesResponse = {
  data?: SummaryDay[];
};

const formatDate = (d: Date) => d.toLocaleDateString("en-CA");

export const getWakatimeUserContribution = async (o: { apiKey: string }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - 365);
  start.setDate(start.getDate() - start.getDay()); // rewind to Sunday

  const auth = Buffer.from(`${o.apiKey}:`).toString("base64");
  const url = new URL("https://wakatime.com/api/v1/users/current/summaries");
  url.searchParams.set("start", formatDate(start));
  url.searchParams.set("end", formatDate(today));

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));

  const body = (await res.json()) as SummariesResponse;
  const secondsByDate = new Map<string, number>();

  for (const day of body.data ?? []) {
    const date = day.range?.date;
    if (!date) continue;
    secondsByDate.set(date, day.grand_total?.total_seconds ?? 0);
  }

  const max = Math.max(0, ...secondsByDate.values());

  const levelForCount = (count: number): 0 | 1 | 2 | 3 | 4 =>
    count <= 0 || max === 0
      ? 0
      : count >= max
        ? 4
        : (Math.ceil((count / max) * 3) as 1 | 2 | 3);

  const cells = [];
  const cursor = new Date(start);
  let x = 0;

  while (cursor <= today) {
    const y = cursor.getDay(); // 0 = Sunday
    const date = formatDate(cursor);
    const count = secondsByDate.get(date) ?? 0;

    cells.push({ x, y, date, count, level: levelForCount(count) });

    cursor.setDate(cursor.getDate() + 1);
    if (y === 6) x++;
  }

  return cells;
};

export type Res = Awaited<ReturnType<typeof getWakatimeUserContribution>>;
export type Cell = Res[number];
