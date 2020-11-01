import * as fs from "fs";
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
      fs.writeFileSync(format.svg, svg);
      console.log(`::set-output name=svg_out_path::${format.svg}`);
    }
    if (gif) {
      fs.writeFileSync(format.gif, gif);
      console.log(`::set-output name=gif_out_path::${format.gif}`);
    }
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
