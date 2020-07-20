import * as fs from "fs";
import * as core from "@actions/core";
import { generateContributionSnake } from "./generateContributionSnake";

(async () => {
  try {
    const userName = core.getInput("github_user_name");
    const gifOutPath = core.getInput("gif_out_path");

    const buffer = await generateContributionSnake(userName);

    console.log({ userName, gifOutPath }, buffer.length);

    fs.writeFileSync(gifOutPath, buffer);
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
