#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import { parseArgs } from "node:util";
import type { Source } from "./generateSnakeAnimation";
import { parseOutputsOption } from "./outputsOptions";

/**
 * Usage:
 *   generate-snake-animation --github_user=<[host/]username> --output=<file> [--output=<file> ...]
 *   generate-snake-animation --gitlab_user=<[host/]username> --output=<file> [--output=<file> ...]
 *   generate-snake-animation --forgejo_user=<host/username>   --output=<file> [--output=<file> ...]
 *   generate-snake-animation --wakatime --output=<file> [...]
 *
 * Multiple GitLab instances (same orange hue, calendars merged):
 *   --gitlab_user=Johann-Goncalves-Pereira \
 *   --gitlab_user=gitlab.materialize.pro/johannpereira
 *
 * Combine GitHub + GitLab + WakaTime for a multi-source snake:
 *   generate-snake-animation \
 *     --github_user=platane \
 *     --gitlab_user=gitlab.example.com/user \
 *     --wakatime \
 *     --output=dist/multi-snake.svg?palette=sources \
 *     --output=dist/multi-snake-dark.svg?palette=sources-dark
 *
 * Env:
 *   GITHUB_TOKEN       required with --github_user
 *   WAKATIME_API_KEY   required with --wakatime
 */

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    github_user: { type: "string" },
    github_token: { type: "string" },
    gitlab_user: { type: "string", multiple: true },
    forgejo_user: { type: "string" },
    wakatime: { type: "boolean", default: false },
    output: { type: "string", multiple: true },
  },
});

const { github_user, github_token, gitlab_user, forgejo_user, wakatime, output } =
  values;

const usage = [
  "Usage:",
  "  generate-snake-animation --github_user=<[host/]username> --output=<file> [...]",
  "  generate-snake-animation --gitlab_user=<[host/]username> --output=<file> [...]",
  "  generate-snake-animation --forgejo_user=<host/username> --output=<file> [...]",
  "  generate-snake-animation --wakatime --output=<file> [...]",
  "  repeat --gitlab_user for multiple GitLab hosts",
  "  combine --github_user + --gitlab_user + --wakatime for multi-source",
  "",
  "Examples:",
  "  generate-snake-animation --github_user=platane --output=snake.svg",
  "  generate-snake-animation --gitlab_user=gitlab.mycompany.com/username --output=snake.svg",
  "  generate-snake-animation --github_user=me --gitlab_user=me --gitlab_user=host/me --wakatime --output=multi.svg?palette=sources",
].join("\n");

const parseUser = (uri: string) => {
  const i = uri.lastIndexOf("/");
  if (i === -1) return { username: uri };
  const username = uri.slice(i + 1);
  let baseUrl = uri.slice(0, i);
  if (!baseUrl.startsWith("https://")) baseUrl = "https://" + baseUrl;
  return { username, baseUrl };
};

const sources: Source[] = [];

if (github_user) {
  const { username, baseUrl } = parseUser(github_user);
  const githubToken = github_token ?? process.env.GITHUB_TOKEN;
  if (!githubToken) throw "Missing github token (GITHUB_TOKEN)";
  sources.push({
    platform: "github",
    githubToken,
    username,
    baseUrl,
  });
}

for (const gitlab of gitlab_user ?? []) {
  const { username, baseUrl } = parseUser(gitlab);
  sources.push({
    platform: "gitlab",
    username,
    baseUrl,
  });
}

if (forgejo_user) {
  if (sources.length > 0) {
    throw "--forgejo_user cannot be combined with other sources";
  }
  const { username, baseUrl } = parseUser(forgejo_user);
  if (!baseUrl) throw "Missing forgejo uri";
  sources.push({
    platform: "forgejo",
    username,
    baseUrl,
  });
}

if (wakatime) {
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) throw "Missing WAKATIME_API_KEY";
  sources.push({ platform: "wakatime", apiKey });
}

if (sources.length === 0) {
  console.error(usage);
  process.exit(1);
}

const rawOutputs = output ?? [];
const withDefaultPalette =
  sources.length > 1
    ? rawOutputs.map((entry) =>
        entry.includes("palette=") || entry.includes("color_dots=")
          ? entry
          : entry.includes("?")
            ? `${entry}&palette=sources`
            : `${entry}?palette=sources`,
      )
    : rawOutputs;

const outputs = parseOutputsOption(withDefaultPalette);
const { generateSnakeAnimation } = await import("./generateSnakeAnimation.js");
const results = await generateSnakeAnimation(sources, outputs);

outputs.forEach((out, i) => {
  const result = results[i];
  if (out?.filename && result) {
    console.log(`💾 writing to ${out.filename}`);
    fs.mkdirSync(path.dirname(out.filename), { recursive: true });
    fs.writeFileSync(out.filename, result);
  }
});
