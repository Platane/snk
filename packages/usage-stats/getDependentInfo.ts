import { load as CheerioLoad } from "cheerio";
import { httpGet } from "./httpGet";

export const getDependentInfo = async (repo: string) => {
  const pageText = await httpGet(`https://github.com/${repo}/actions`).catch(
    () => null
  );

  if (!pageText) return;

  const $ = CheerioLoad(pageText);

  const runs = $("#partial-actions-workflow-runs [data-url]")
    .toArray()
    .map((el) => {
      const success =
        $(el).find('[aria-label="completed successfully"]').toArray().length ===
        1;

      const workflow_file_href = $(el)
        .find("a")
        .toArray()
        .map((el) => $(el).attr("href")!)
        .find((href) => href.match(/\/actions\/runs\/\d+\/workflow/))!;

      const workflow_file_url = workflow_file_href
        ? new URL(workflow_file_href, "https://github.com").toString()
        : null;

      const date = $(el).find("relative-time").attr("datetime");

      return { success, workflow_file_url, date };
    });

  for (const { workflow_file_url, success, date } of runs) {
    if (!workflow_file_url) continue;

    const $ = CheerioLoad(await httpGet(workflow_file_url));

    const workflow_code = $("table[data-hpc]").text();

    const [_, dependency] =
      workflow_code.match(/uses\s*:\s*(Platane\/snk(\/svg-only)?@\w*)/) ?? [];

    const cronMatch = workflow_code.match(/cron\s*:([^\n]*)/);

    if (dependency)
      return {
        dependency,
        success,
        date,
        cron: cronMatch?.[1].replace(/["|']/g, "").trim(),
        workflow_code,
      };
  }
};
