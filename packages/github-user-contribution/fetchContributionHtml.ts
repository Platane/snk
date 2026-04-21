/**
 * Get the contribution grid from the public GitHub contributions page.
 * No token required.
 *
 * @example
 *   fetchGithubUserContributionHtml("torvalds")
 */
export const fetchGithubUserContributionHtml = async (userName: string) => {
  const res = await fetch(
    `https://github.com/users/${userName}/contributions`,
    {
      headers: { "User-Agent": "me@platane.me" },
    },
  );

  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText));

  const html = await res.text();

  // Extract all contribution cells: <td ... data-date="YYYY-MM-DD" ... data-level="N" ...>
  const cells: { date: string; level: number }[] = [];
  const re = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
  let m;
  while ((m = re.exec(html)) !== null)
    // TODO use matchall
    cells.push({ date: m[1], level: Number(m[2]) });

  if (cells.length === 0) throw new Error("no contribution cells found");

  // Compute x/y from dates. x = week index, y = day of week (0 = Sunday).
  const origin = new Date(cells[0].date);

  return cells.map(({ date, level }) => {
    const d = new Date(date);
    const days = Math.round((d.getTime() - origin.getTime()) / 86400_000);
    return {
      x: Math.floor(days / 7),
      y: d.getUTCDay(),
      date,
      level: level as 0 | 1 | 2 | 3 | 4,
    };
  });
};
