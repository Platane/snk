import { getGithubUserContribution } from "@snk/github-user-contribution";

const cors =
  <
    Req extends { headers: Headers },
    Res extends { headers: Headers },
    A extends Array<any>,
  >(
    f: (req: Req, ...args: A) => Res | Promise<Res>,
  ) =>
  async (req: Req, ...args: A) => {
    const res = await f(req, ...args);

    const origin = req.headers.get("origin");

    if (origin) {
      const { host, hostname } = new URL(origin);

      if (hostname === "localhost" || host === "platane.github.io")
        res.headers.set("Access-Control-Allow-Origin", origin);
    }

    res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return res;
  };

export default {
  fetch: cors(async (req: Request, env: { GITHUB_TOKEN: string }) => {
    const url = new URL(req.url);

    const [, userName] =
      url.pathname.match(/^\/github-user-contribution\/([^\/]*)\/?$/) ?? [];

    if (req.method === "OPTIONS") return new Response();

    if (!userName || req.method !== "GET")
      return new Response("unknown route", { status: 404 });

    const body = await getGithubUserContribution(userName, {
      githubToken: env.GITHUB_TOKEN,
    });

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        "Cache-Control": "max-age=21600, s-maxage=21600",
        "Content-Type": "application/json",
      },
    });
  }),
};
