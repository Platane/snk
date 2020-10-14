import * as fs from "fs";
import * as path from "path";
import { generateContributionSnake } from "../generateContributionSnake";

(async () => {
  const output = path.join(process.cwd(), "__tests__/__snapshots__/out.gif");

  const buffer = await generateContributionSnake("platane");

  console.log("💾 writing to", output);
  fs.writeFileSync(output, buffer);
})();
