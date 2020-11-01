import * as fs from "fs";
import * as path from "path";
import { generateContributionSnake } from "../generateContributionSnake";

it("should generate contribution snake", async () => {
  const outputSvg = path.join(__dirname, "__snapshots__/out.svg");
  const outputGif = path.join(__dirname, "__snapshots__/out.gif");

  const buffer = await generateContributionSnake("platane", {
    svg: true,
    gif: true,
  });

  expect(buffer.svg).toBeDefined();
  expect(buffer.gif).toBeDefined();

  console.log("💾 writing to", outputSvg);
  fs.writeFileSync(outputSvg, buffer.svg);

  console.log("💾 writing to", outputGif);
  fs.writeFileSync(outputGif, buffer.gif);
});
