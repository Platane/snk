/**
 * Get the contribution grid from a GitLab user calendar.
 *
 * Uses the public /users/{username}/calendar.json endpoint, no auth required.
 * Works with any GitLab instance via the `baseUrl` option.
 * Defaults to https://gitlab.com
 *
 * @example
 *   getGitlabUserContribution("username")
 *   getGitlabUserContribution("username", { baseUrl: "https://gitlab.example.com" })
 */
export const getGitlabUserContribution = async (
  userName: string,
  o: { baseUrl?: string } = {},
) => {
  const baseUrl = o.baseUrl ?? "https://gitlab.com";

  const res = await fetch(`${baseUrl}/users/${userName}/calendar.json`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));

  // Response is already bucketed by day: { "YYYY-MM-DD": count }
  const countsByDate = (await res.json()) as Record<string, number>;

  const max = Math.max(0, ...Object.values(countsByDate));

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
    const count = countsByDate[date] ?? 0;

    cells.push({ x, y, date, count, level: levelForCount(count) });

    cursor.setDate(cursor.getDate() + 1);
    if (y === 6) x++;
  }

  return cells;
};

export type Res = Awaited<ReturnType<typeof getGitlabUserContribution>>;
export type Cell = Res[number];
