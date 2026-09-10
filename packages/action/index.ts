import * as fs from "node:fs";
import * as path from "node:path";
import {
  generateSnakeAnimation,
  type Source,
} from "generate-snake-animation/generateSnakeAnimation";
import { parseOutputsOption } from "generate-snake-animation/outputsOptions";
import * as githubAction from "./github-action";

const parseUser = (uri: string) => {
  const i = uri.lastIndexOf("/");
  if (i === -1) return { username: uri };
  const username = uri.slice(i + 1);
  let baseUrl = uri.slice(0, i);
  if (!baseUrl.startsWith("https://")) baseUrl = "https://" + baseUrl;
  return { username, baseUrl };
};

(async () => {
  try {
    const githubUserName = githubAction.getInput("github_user_name");
    const gitlabUser = githubAction.getInput("gitlab_user");
    const gitlabBaseUrl = githubAction.getInput("gitlab_base_url");
    const useWakatime =
      githubAction.getInput("wakatime").toLowerCase() === "true";
    const githubToken =
      process.env.GITHUB_TOKEN ?? githubAction.getInput("github_token");

    const sources: Source[] = [];

    if (githubUserName) {
      if (!githubToken) throw new Error("Missing github token");
      sources.push({
        platform: "github",
        username: githubUserName,
        githubToken,
      });
    }

    if (gitlabUser) {
      // One host/user per line (or comma-separated) for multiple GitLab instances
      const entries = gitlabUser
        .split(/[\n,]+/)
        .map((x) => x.trim())
        .filter(Boolean);
      for (const entry of entries) {
        const parsed = parseUser(entry);
        sources.push({
          platform: "gitlab",
          username: parsed.username,
          baseUrl: gitlabBaseUrl || parsed.baseUrl,
        });
      }
    }

    if (useWakatime) {
      const apiKey = process.env.WAKATIME_API_KEY;
      if (!apiKey) throw new Error("Missing WAKATIME_API_KEY");
      sources.push({ platform: "wakatime", apiKey });
    }

    if (sources.length === 0) {
      throw new Error(
        "Provide at least one of: github_user_name, gitlab_user, wakatime",
      );
    }

    const outputsRaw = [
      ...githubAction.getInput("outputs").split("\n"),
      // legacy
      githubAction.getInput("gif_out_path"),
      githubAction.getInput("svg_out_path"),
    ]
      .map((x) => x.trim())
      .filter(Boolean);

    const withDefaultPalette =
      sources.length > 1
        ? outputsRaw.map((entry) =>
            entry.includes("palette=") || entry.includes("color_dots=")
              ? entry
              : entry.includes("?")
                ? `${entry}&palette=sources`
                : `${entry}?palette=sources`,
          )
        : outputsRaw;

    const outputs = parseOutputsOption(withDefaultPalette);

    const results = await generateSnakeAnimation(sources, outputs);

    outputs.forEach((out, i) => {
      const result = results[i];
      if (out?.filename && result) {
        console.log(`💾 writing to ${out?.filename}`);
        fs.mkdirSync(path.dirname(out?.filename), { recursive: true });
        fs.writeFileSync(out?.filename, result);
      }
    });
  } catch (e: any) {
    githubAction.setFailed(`Action failed with "${e.message}"`);
  }
})();
