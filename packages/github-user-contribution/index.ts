import fetch from "node-fetch";
import * as parser from "fast-xml-parser";

const findNode = (o: any, condition: (x: any) => boolean): any => {
  if (o && typeof o === "object") {
    if (condition(o)) return o;

    for (const c of Object.values(o)) {
      const res = findNode(c, condition);
      if (res) return res;
    }
  }
};

const ensureArray = (x: any) => (Array.isArray(x) ? x : [x]);

const defaultColorScheme = [
  "#ebedf0",
  "#9be9a8",
  "#40c463",
  "#30a14e",
  "#216e39",
];

const parseUserPage = (content: string) => {
  const o = parser.parse(content, {
    attrNodeName: "attr",
    attributeNamePrefix: "",
    ignoreAttributes: false,
  });

  //
  // parse colorScheme
  const colorScheme = [...defaultColorScheme];
  const colorSchemeMap: Record<string, number> = Object.fromEntries(
    defaultColorScheme.map((color, i) => [color, i])
  );
  const legend = findNode(
    o,
    (x) => x.attr && x.attr.class && x.attr.class.trim() === "legend"
  );
  legend.li.forEach((x: any, i: number) => {
    const bgColor = x.attr.style.match(/background\-color: +(.+)/)![1]!;
    if (bgColor) {
      const color = bgColor.replace(/\s/g, "");
      colorSchemeMap[color] = i;

      if (color.startsWith("var(--)")) colorScheme[i] = color;
    }
  });

  //
  // parse cells
  const svg = findNode(
    o,
    (x) =>
      x.attr && x.attr.class && x.attr.class.trim() === "js-calendar-graph-svg"
  );

  const cells = svg.g.g
    .map((g: any, x: number) =>
      ensureArray(g.rect).map(({ attr }: any, y: number) => {
        const color = attr.fill.trim();
        const count = +attr["data-count"];
        const date = attr["data-date"];

        const k = colorSchemeMap[color];

        if (k === -1) throw new Error("could not map the cell color");

        return { x, y, color, count, date, k };
      })
    )
    .flat();

  return {
    cells,
    colorScheme: colorScheme.every((c: string) => c.startsWith("#"))
      ? colorScheme
      : ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  };
};

/**
 * get the contribution grid from a github user page
 *
 * @param userName
 */
export const getGithubUserContribution = async (userName: string) => {
  const res = await fetch(`https://github.com/${userName}`);
  const resText = await res.text();

  return parseUserPage(resText);
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Res = ThenArg<ReturnType<typeof getGithubUserContribution>>;

export type Cell = Res["cells"][number];
