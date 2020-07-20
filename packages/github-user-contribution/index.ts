import { JSDOM } from "jsdom";

/**
 * get the contribution grid from a github user page
 *
 * @param userName
 */
export const getGithubUserContribution = async (userName: string) => {
  const dom = await JSDOM.fromURL(`https://github.com/${userName}`);

  const colorScheme = Array.from(
    dom.window.document.querySelectorAll(".legend > li")
  ).map(
    (element) =>
      element.getAttribute("style")?.match(/background\-color: +(#\w+)/)?.[1]!
  );

  const cells = Array.from(
    dom.window.document.querySelectorAll(".js-calendar-graph-svg > g > g")
  )
    .map((column, x) =>
      Array.from(column.querySelectorAll("rect")).map((element, y) => {
        const count = +element.getAttribute("data-count")!;
        const date = element.getAttribute("data-date")!;
        const color = element.getAttribute("fill")!;
        const k = colorScheme.indexOf(color);

        return { x, y, count, date, color, k };
      })
    )
    .flat();

  return { colorScheme, cells };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Cell = ThenArg<
  ReturnType<typeof getGithubUserContribution>
>["cells"][number];
