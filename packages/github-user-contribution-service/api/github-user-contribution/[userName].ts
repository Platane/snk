import { getGithubUserContribution } from "@snk/github-user-contribution";
import { NowRequest, NowResponse } from "@vercel/node";

export default async (req: NowRequest, res: NowResponse) => {
  const { userName } = req.query;

  try {
    res.setHeader("Access-Control-Allow-Origin", "https://platane.github.io");
    res.statusCode = 200;
    res.json(await getGithubUserContribution(userName as string));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end();
  }
};
