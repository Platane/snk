import "dotenv/config";
import * as fs from "node:fs";
import path from "node:path";
import { Plugin, type UserConfig } from "vite";
import { getGithubUserContribution } from "../github-user-contribution";

const findHtmlFiles = (dir: string): string[] =>
  fs.readdirSync(dir).flatMap((f) => {
    if (f === "dist") return [];
    const d = path.join(dir, f);
    const s = fs.statSync(d);
    if (s.isFile() && f.endsWith(".html")) return [d];
    if (s.isDirectory()) return findHtmlFiles(d);
    return [];
  });

const devRoute: Plugin = {
  name: "api-handler",
  configureServer(server) {
    server.middlewares.use("/api/github-user-contribution/", (req, res) => {
      const userName = req.url!.split("/").filter(Boolean)[0];
      const githubToken = process.env.GITHUB_TOKEN!;
      getGithubUserContribution(userName, { githubToken }).then((g) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(g));
      });
    });
  },
};

export default {
  plugins: [devRoute],
  define: {
    "process.env.GITHUB_USER_CONTRIBUTION_API_ENDPOINT": JSON.stringify(
      process.env.GITHUB_USER_CONTRIBUTION_API_ENDPOINT ||
        "/api/github-user-contribution/",
    ),
  },
  build: {
    rollupOptions: {
      input: findHtmlFiles(__dirname),
    },
  },
} satisfies UserConfig;
