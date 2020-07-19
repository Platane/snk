import * as fs from "fs";
import * as core from "@actions/core";
import { generateContributionSnake } from "./generateContributionSnake";

(async () => {
  try {
    console.log(core.getInput("user_name"));
    console.log(core.getInput("gif_out_path"));
    console.log("--");
    console.log(process.cwd());
    console.log("--");
    console.log(fs.readdirSync(process.cwd()));

    const buffer = await generateContributionSnake(core.getInput("user_name"));
    fs.writeFileSync(core.getInput("gif_out_path"), buffer);
  } catch (e) {
    core.setFailed(`Action failed with "${e.message}"`);
  }
})();
