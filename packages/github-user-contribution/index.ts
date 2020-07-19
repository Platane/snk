// import * as https from "https";

// @ts-ignore
// import * as cheerio from "cheerio";

import { JSDOM } from "jsdom";

export const getGithubUserContribution = async (userName: string) => {
  //   const content: string = await new Promise((resolve, reject) => {
  //     const req = https.request(`https://github.com/${userName}`, (res) => {
  //       let data = "";

  //       res.on("error", reject);
  //       res.on("data", (chunk) => (data += chunk));
  //       res.on("end", () => resolve(data));
  //     });

  //     req.on("error", reject);
  //     req.end();
  //   });

  //   const dom = new JSDOM(content);

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
      Array.from(column.querySelectorAll("rect")).map((element, y) => ({
        x,
        y,
        count: element.getAttribute("data-count"),
        date: element.getAttribute("data-date"),
        color: element.getAttribute("fill"),
        k: colorScheme.indexOf(element.getAttribute("fill")!),
      }))
    )
    .flat();

  return { colorScheme, cells };
};

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type Cell = ThenArg<
  ReturnType<typeof getGithubUserContribution>
>["cells"][number];

// "#ebedf0";
// "#9be9a8";
// "#40c463";
// "#30a14e";
// "#216e39";
