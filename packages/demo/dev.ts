import { serve } from "bun";
import { getGithubUserContribution } from "../github-user-contribution";

import getBestRoute_page from "./getBestRoute/index.html";
import getBestTunnel_page from "./getBestTunnel/index.html";
import getPathTo_page from "./getPathTo/index.html";
import getPathToPose_page from "./getPathToPose/index.html";
import interactive_page from "./interactive/index.html";
import outside_page from "./outside/index.html";
import svg_page from "./svg/index.html";

const server = serve({
  routes: {
    "/": interactive_page,
    "/getBestRoute": getBestRoute_page,
    "/getBestTunnel": getBestTunnel_page,
    "/outside": outside_page,
    "/getPathToPose": getPathToPose_page,
    "/getPathTo": getPathTo_page,
    "/svg": svg_page,

    "/worker.js": async () =>
      Bun.build({
        entrypoints: [__dirname + "/interactive/worker.ts"],
        target: "browser",
      })
        .then((b) => b.outputs[0].text())
        .then(
          (content) =>
            new Response(content, {
              headers: { "Content-Type": "application/javascript" },
            }),
        ),

    "/api/github-user-contribution/:username": async (req) => {
      const githubToken = process.env.GITHUB_TOKEN!;
      const data = await getGithubUserContribution(req.params.username, {
        githubToken,
      });
      return Response.json(data);
    },
  },

  development: { hmr: false },
});

console.log(`Listening on ${server.url}`);
