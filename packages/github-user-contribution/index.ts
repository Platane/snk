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
  // there's no svg block anymore, now the contributions data is displayed as a table
  const dom = document.createRange().createContextualFragment(content)

  const blocks = dom.querySelectorAll(".ContributionCalendar-day")

  console.log(blocks)

  let x = 0;
  let lastYAttribute = 0;

  const rects = Array.from(blocks).map(
    (m) => {
      const date = m.getAttribute('data-date');
      const level = m.getAttribute('data-level')
      const yAttribute = m.getAttribute('y');

      const literalCount = /(No|\d+) contributions? on/.test(m.innerText);
      const count = literalCount === "No" ? 0 : +literalCount;

      if (lastYAttribute > yAttribute) x++;

      lastYAttribute = yAttribute;

      return { date, count, level, x, yAttribute };
    }
  );

  const yAttributes = Array.from(
    new Set(rects.map((c) => c.yAttribute)).keys()
  ).sort();

  const cells = rects.map(({ yAttribute, ...c }) => ({
    y: yAttributes.indexOf(yAttribute),
    ...c,
  }));

  return cells;
};

export type Res = Awaited<ReturnType<typeof getGithubUserContribution>>;

export type Cell = Res[number];
