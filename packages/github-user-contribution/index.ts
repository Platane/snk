import fetch from "node-fetch";
import { formatParams, Options } from "./formatParams";

/**
 * get the contribution grid from a github user page
 *
 * use options.from=YYYY-MM-DD options.to=YYYY-MM-DD to get the contribution grid for a specific time range
 * or year=2019 as an alias for from=2019-01-01 to=2019-12-31
 *
 * otherwise return use the time range from today minus one year to today ( as seen in github profile page )
 *
 * @param userName github user name
 * @param options
 *
 * @example
 *  getGithubUserContribution("platane", { from: "2019-01-01", to: "2019-12-31" })
 *  getGithubUserContribution("platane", { year: 2019 })
 *
 */
export const getGithubUserContribution = async (
  userName: string,
  options: Options = {}
) => {
  // either use github.com/users/xxxx/contributions  for previous years
  // or github.com/xxxx ( which gives the latest update to today result )
  const url =
    "year" in options || "from" in options || "to" in options
      ? `https://github.com/users/${userName}/contributions?` +
        formatParams(options)
      : `https://github.com/${userName}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error(res.statusText);

  const resText = await res.text();

  return parseUserPage(resText);
};

const parseUserPage = (content: string) => {
  // take roughly the table block
  const block = content
    .split(`aria-describedby="contribution-graph-description"`)[1]
    .split("<tbody>")[1]
    .split("</tbody>")[0];

  const cells = block.split("</tr>").flatMap((inside, y) =>
    inside.split("</td>").flatMap((m) => {
      const date = m.match(/data-date="([^"]+)"/)?.[1];

      const literalLevel = m.match(/data-level="([^"]+)"/)?.[1];
      const literalX = m.match(/data-ix="([^"]+)"/)?.[1];
      const literalCount = m.match(/(No|\d+) contributions? on/)?.[1];

      if (date && literalLevel && literalX && literalCount)
        return [
          {
            x: +literalX,
            y,

            date,
            count: +literalCount,
            level: +literalLevel,
          },
        ];

      return [];
    })
  );

  return cells;
};

export type Res = Awaited<ReturnType<typeof getGithubUserContribution>>;

export type Cell = Res[number];
