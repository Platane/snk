import * as fs from "fs";
import * as path from "path";
import { generateContributionSnake } from "../generateContributionSnake";

const dir = path.resolve(process.cwd(), "__tests__", "__snapshots__");

try {
  fs.mkdirSync(dir);
} catch (err) {}

(async () => {
  const output = path.join(dir, "out.gif");
  const buffer = await generateContributionSnake("platane");

  console.log("💾 writing to", dir);
  fs.writeFileSync(output, buffer);
})();
