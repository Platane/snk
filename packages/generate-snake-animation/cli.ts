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
 *
 * Examples:
 *   generate-snake-animation --github_user=platane --output=snake.svg
 *   generate-snake-animation --github_user=github.mycompany.com/platane --output=snake.svg   # GitHub Enterprise
 *   generate-snake-animation --gitlab_user=username --output=snake.svg?palette=gitlab
 *   generate-snake-animation --gitlab_user=gitlab.mycompany.com/username --output=snake.svg  # self-hosted
 *   generate-snake-animation --forgejo_user=codeberg.org/platane --output=snake.svg?palette=codeberg
 *
 * For GitHub, a github token it required ( read from GITHUB_TOKEN env var )
 */

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    github_user: { type: "string" },
    github_token: { type: "string" },
    gitlab_user: { type: "string" },
    forgejo_user: { type: "string" },
    output: { type: "string", multiple: true },
  },
});

const { github_user, github_token, gitlab_user, forgejo_user, output } = values;

const set = [github_user, gitlab_user, forgejo_user].filter(Boolean);
if (set.length === 0) {
  console.error(
    [
      "Usage:",
      "  generate-snake-animation --github_user=<[host/]username> --output=<file> [--output=<file> ...]",
      "  generate-snake-animation --gitlab_user=<[host/]username> --output=<file> [--output=<file> ...]",
      "  generate-snake-animation --forgejo_user=<host/username>   --output=<file> [--output=<file> ...]",
      "",
      "Examples:",
      "  generate-snake-animation --github_user=platane --output=snake.svg",
      "  generate-snake-animation --github_user=github.mycompany.com/platane --output=snake.svg   # GitHub Enterprise",
      "  generate-snake-animation --gitlab_user=username --output=snake.svg?palette=gitlab",
      "  generate-snake-animation --gitlab_user=gitlab.mycompany.com/username --output=snake.svg  # self-hosted",
      "  generate-snake-animation --forgejo_user=codeberg.org/platane --output=snake.svg?palette=codeberg",
    ].join("\n"),
  );
  process.exit(1);
}
if (set.length > 1)
  throw "--github_user, --gitlab_user, and --forgejo_user are mutually exclusive";

const source: Source = (() => {
  const parseUser = (uri: string) => {
    const i = uri.lastIndexOf("/");
    if (i === -1) return { username: uri };
    const username = uri.slice(i + 1);
    let baseUrl = uri.slice(0, i + 1);
    if (!baseUrl.startsWith("https://")) baseUrl = "https://" + baseUrl;
    return { username, baseUrl };
  };

  if (github_user) {
    const { username, baseUrl } = parseUser(github_user);
    const githubToken = github_token ?? process.env.GITHUB_TOKEN;
    if (!githubToken) throw "Missing github token";
    return {
      platform: "github",
      githubToken,
      username,
      baseUrl,
    };
  }

  if (gitlab_user) {
    const { username, baseUrl } = parseUser(gitlab_user);
    return {
      platform: "gitlab",
      username,
      baseUrl,
    };
  }

  if (forgejo_user) {
    const { username, baseUrl } = parseUser(forgejo_user);
    if (!baseUrl) throw "Missing forgejo uri";
    return {
      platform: "forgejo",
      username,
      baseUrl,
    };
  }

  throw "Missing user";
})();

const outputs = parseOutputsOption(output ?? []);
const { generateSnakeAnimation } = await import("./generateSnakeAnimation.js");
const results = await generateSnakeAnimation(source, outputs);

outputs.forEach((out, i) => {
  const result = results[i];
  if (out?.filename && result) {
    console.log(`💾 writing to ${out.filename}`);
    fs.mkdirSync(path.dirname(out.filename), { recursive: true });
    fs.writeFileSync(out.filename, result);
  }
});
