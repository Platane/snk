import * as fs from "fs";
import * as core from "@actions/core";
import { generateContributionSnake } from "./generateContributionSnake";

(async () => {
  try {
    const userName = core.getInput("github_user_name");
    const gifOutPath = core.getInput("gif_out_path");

    const buffer = await generateContributionSnake(userName);

    fs.writeFileSync(gifOutPath, buffer);

    console.log(`::set-output name=gif_out_path::${gifOutPath}`);
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
