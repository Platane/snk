import * as fs from "fs";
import fetch from "node-fetch";
import { Octokit } from "octokit";

require("dotenv").config();

// @ts-ignore
import packages from "./out.json";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const getLastRunInfo = async (repo_: string) => {
  const [owner, repo] = repo_.split("/");

  try {
    const {
      data: { workflow_runs },
    } = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/runs{?actor,branch,event,status,per_page,page,created,exclude_pull_requests,check_suite_id,head_sha}",
      { owner, repo }
    );

    for (const r of workflow_runs) {
      const { run_started_at, head_sha, path, conclusion } = r as {
        run_started_at: string;
        head_sha: string;
        path: string;
        conclusion: "failure" | "success";
      };

      const workflow_url = `https://raw.githubusercontent.com/${owner}/${repo}/${head_sha}/${path}`;

      const workflow_file = await fetch(workflow_url).then((res) => res.text());

      const [_, dependency, __, version] =
        workflow_file.match(/uses\s*:\s*(Platane\/snk(\/svg-only)?@(\w*))/) ??
        [];

      const cronMatch = workflow_file.match(/cron\s*:([^\n]*)/);

      if (dependency)
        return {
          dependency,
          version,
          run_started_at,
          conclusion,
          cron: cronMatch?.[1].replace(/["|']/g, "").trim(),
          workflow_file,
          workflow_url,
        };
    }
  } catch (err) {
    console.error(err);
  }
};

const wait = (delay = 0) => new Promise((r) => setTimeout(r, delay));

const getRepos = () => {
  try {
    return JSON.parse(fs.readFileSync(__dirname + "/cache/out.json").toString())
      .map((p: any) => p.dependents)
      .flat() as string[];
  } catch (err) {
    return [];
  }
};

const getReposInfo = () => {
  try {
    return JSON.parse(
      fs.readFileSync(__dirname + "/cache/stats.json").toString()
    ) as any[];
  } catch (err) {
    return [];
  }
};
const saveRepoInfo = (rr: any[]) => {
  fs.writeFileSync(__dirname + "/cache/stats.json", JSON.stringify(rr));
};

(async () => {
  const repos = getRepos();
  const total = repos.length;

  const reposInfo = getReposInfo().slice(0, -20);
  for (const { repo } of reposInfo) {
    const i = repos.indexOf(repo);
    if (i >= 0) repos.splice(i, 1);
  }

  while (repos.length) {
    const {
      data: { rate },
    } = await octokit.request("GET /rate_limit", {});

    console.log(rate);
    if (rate.remaining < 100) {
      const delay = rate.reset - Math.floor(Date.now() / 1000);
      console.log(
        `waiting ${delay} second (${(delay / 60).toFixed(
          1
        )} minutes) for reset `
      );
      await wait(Math.max(0, delay) * 1000);
    }

    const rs = repos.splice(0, 20);

    await Promise.all(
      rs.map(async (repo) => {
        reposInfo.push({ repo, ...(await getLastRunInfo(repo)) });

        saveRepoInfo(reposInfo);

        console.log(
          reposInfo.length.toString().padStart(5, " "),
          "/",
          total,
          repo
        );
      })
    );
  }
})();
