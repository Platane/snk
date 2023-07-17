import { getGithubUserContribution } from "@snk/github-user-contribution";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { userName } = req.query;

  try {
    res.setHeader("Access-Control-Allow-Origin", "https://platane.github.io");
    res.statusCode = 200;
    res.json(
      await getGithubUserContribution(userName as string, {
        githubToken: process.env.GITHUB_TOKEN!,
      })
    );
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end();
  }
};
