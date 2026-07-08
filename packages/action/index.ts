import * as fs from "node:fs";
import * as path from "node:path";
import { generateSnakeAnimation } from "generate-snake-animation/generateSnakeAnimation";
import { parseOutputsOption } from "generate-snake-animation/outputsOptions";
import * as githubAction from "./github-action";

(async () => {
  try {
    const userName = githubAction.getInput("github_user_name");
    const githubToken =
      process.env.GITHUB_TOKEN ?? githubAction.getInput("github_token");

    const year = githubAction.getInput("year");
    const from = githubAction.getInput("from");
    const to = githubAction.getInput("to");

    const outputsRaw = [
      ...githubAction.getInput("outputs").split("\n"),
      //
      // legacy
      githubAction.getInput("gif_out_path"),
      githubAction.getInput("svg_out_path"),
    ]
      .map((x) => x.trim())
      .filter(Boolean);

    const outputs = parseOutputsOption(outputsRaw);

    const results = await generateSnakeAnimation(
      { 
        platform: "github", 
        username: userName, 
        githubToken,
        year: year ? Number(year) : undefined,
        from: from || undefined,
        to: to || undefined
      },
      outputs,
    );

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
