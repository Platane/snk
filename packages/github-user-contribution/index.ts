import fetch from "node-fetch";
import cheerio from "cheerio";
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

const defaultColorScheme = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];

const parseUserPage = (content: string) => {
  const $ = cheerio.load(content);

  //
  // "parse" colorScheme
  const colorScheme = [...defaultColorScheme];

  //
  // parse cells
  const rawCells = $(".js-calendar-graph rect[data-count]")
    .toArray()
    .map((x) => {
      const level = +x.attribs["data-level"];
      const count = +x.attribs["data-count"];
      const date = x.attribs["data-date"];

      const color = colorScheme[level];

      if (!color) throw new Error("could not determine the color of the cell");

      return {
        svgPosition: getSvgPosition(x),
        color,
        count,
        date,
      };
    });

  const xMap: Record<number, true> = {};
  const yMap: Record<number, true> = {};
  rawCells.forEach(({ svgPosition: { x, y } }) => {
    xMap[x] = true;
    yMap[y] = true;
  });

  const xRange = Object.keys(xMap)
    .map((x) => +x)
    .sort((a, b) => +a - +b);
  const yRange = Object.keys(yMap)
    .map((x) => +x)
    .sort((a, b) => +a - +b);

  const cells = rawCells.map(({ svgPosition, ...c }) => ({
    ...c,
    x: xRange.indexOf(svgPosition.x),
    y: yRange.indexOf(svgPosition.y),
  }));

  return { cells, colorScheme };
};

// returns the position of the svg elements, accounting for it's transform and it's parent transform
// ( only accounts for translate transform )
const getSvgPosition = (e: cheerio.Element): { x: number; y: number } => {
  if (!e || e.tagName === "svg") return { x: 0, y: 0 };

  const p = getSvgPosition(e.parent);

  if (e.attribs.x) p.x += +e.attribs.x;
  if (e.attribs.y) p.y += +e.attribs.y;

  if (e.attribs.transform) {
    const m = e.attribs.transform.match(
      /translate\( *([\.\d]+) *, *([\.\d]+) *\)/
    );

    if (m) {
      p.x += +m[1];
      p.y += +m[2];
    }
  }

  return p;
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Res = ThenArg<ReturnType<typeof getGithubUserContribution>>;

export type Cell = Res["cells"][number];
