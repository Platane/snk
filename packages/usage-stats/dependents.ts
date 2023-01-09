import * as fs from "fs";
import fetch from "node-fetch";
import { load as CheerioLoad } from "cheerio";

const getPackages = async (repo: string) => {
  const pageText = await fetch(
    `https://github.com/${repo}/network/dependents`
  ).then((res) => res.text());
  const $ = CheerioLoad(pageText);

  return $("#dependents .select-menu-list a")
    .toArray()
    .map((el) => {
      const name = $(el).text().trim();
      const href = $(el).attr("href");
      const u = new URL(href!, "http://example.com");

      return { name, id: u.searchParams.get("package_id")! };
    });
};

const getDependentByPackage = async (repo: string, packageId: string) => {
  const repos = [] as string[];

  const pages = [];

  let url:
    | string
    | null = `https://github.com/${repo}/network/dependents?package_id=${packageId}`;

  while (url) {
    console.log(url, repos.length);

    await wait(1000 + Math.floor(Math.random() * 500));

    const $ = CheerioLoad(await fetch(url).then((res) => res.text()));

    const rs = $(`#dependents [data-hovercard-type="repository"]`)
      .toArray()
      .map((el) => $(el).attr("href")!.slice(1));

    repos.push(...rs);

    const nextButton = $(`#dependents a`)
      .filter((_, el) => $(el).text().trim().toLowerCase() === "next")
      .eq(0);

    const href = nextButton ? nextButton.attr("href") : null;

    pages.push({ url, rs, next: href });
    fs.writeFileSync(
      __dirname + `/out-${packageId}.json`,
      JSON.stringify(pages)
    );

    url = href ? new URL(href, "https://github.com").toString() : null;
  }

  return repos;
};

export const getDependents = async (repo: string) => {
  const packages = await getPackages(repo);

  const ps: (typeof packages[number] & { dependents: string[] })[] = [];

  for (const p of packages)
    ps.push({ ...p, dependents: await getDependentByPackage(repo, p.id) });

  return ps;
};

const wait = (delay = 0) => new Promise((r) => setTimeout(r, delay));

(async () => {
  const res = await getDependents("platane/snk");

  fs.writeFileSync(__dirname + "/cache/out.json", JSON.stringify(res));
})();
