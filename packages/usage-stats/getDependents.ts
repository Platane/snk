import { load as CheerioLoad } from "cheerio";
import { httpGet } from "./httpGet";

const getPackages = async (repo: string) => {
  const pageText = await httpGet(
    `https://github.com/${repo}/network/dependents`
  );
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
    const $ = CheerioLoad(await httpGet(url));

    console.log(repos.length);

    const reposOnPage = $(`#dependents [data-hovercard-type="repository"]`)
      .toArray()
      .map((el) => $(el).attr("href")!.slice(1));

    repos.push(...reposOnPage);

    const nextButton = $(`#dependents a`)
      .filter((_, el) => $(el).text().trim().toLowerCase() === "next")
      .eq(0);

    const href = nextButton ? nextButton.attr("href") : null;

    pages.push({ url, reposOnPage, next: href });

    url = href ? new URL(href, "https://github.com").toString() : null;
  }

  return { repos, pages };
};

export const getDependents = async (repo: string) => {
  const packages = await getPackages(repo);

  const ps: (typeof packages[number] & { dependents: string[] })[] = [];

  for (const p of packages)
    ps.push({
      ...p,
      dependents: (await getDependentByPackage(repo, p.id)).repos,
    });

  return ps;
};
