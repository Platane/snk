import * as fs from "fs";
import * as path from "path";
import * as core from "@actions/core";
import { generateContributionSnake } from "./generateContributionSnake";

(async () => {
  try {
    const userName = core.getInput("github_user_name");
    const format = {
      svg: core.getInput("svg_out_path"),
      gif: core.getInput("gif_out_path"),
    };

    const { svg, gif } = await generateContributionSnake(
      userName,
      format as any
    );

    if (svg) {
      fs.mkdirSync(path.dirname(format.svg), { recursive: true });
      fs.writeFileSync(format.svg, svg);
      core.setOutput("svg_out_path", format.svg);
    }
    if (gif) {
      fs.mkdirSync(path.dirname(format.gif), { recursive: true });
      fs.writeFileSync(format.gif, gif);
      core.setOutput("gif_out_path", format.gif);
    }
  } catch (e: any) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
