import { Octokit } from "octokit";
import { httpGet } from "./httpGet";

require("dotenv").config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const getLastRunInfo = async (repo_: string) => {
  const [owner, repo] = repo_.split("/");

  try {
    const {
      data: { workflow_runs },
    } = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/runs{?actor,branch,event,status,per_page,page,created,exclude_pull_requests,check_suite_id,head_sha}",
      { owner, repo }
    );

    for (const r of workflow_runs) {
      const {
        run_started_at: date,
        head_sha,
        path,
        conclusion,
      } = r as {
        run_started_at: string;
        head_sha: string;
        path: string;
        conclusion: "failure" | "success";
      };

      const workflow_url = `https://raw.githubusercontent.com/${owner}/${repo}/${head_sha}/${path}`;

      const workflow_code = await httpGet(workflow_url);

      const [_, dependency] =
        workflow_code.match(/uses\s*:\s*(Platane\/snk(\/svg-only)?@\w*)/) ?? [];

      const cronMatch = workflow_code.match(/cron\s*:([^\n]*)/);

      if (dependency)
        return {
          dependency,
          success: conclusion === "success",
          date,
          cron: cronMatch?.[1].replace(/["|']/g, "").trim(),
          workflow_code,
        };
    }
  } catch (err) {
    console.error(err);
  }
};
