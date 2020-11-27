import * as fs from "fs";
import * as path from "path";
import { generateContributionSnake } from "../generateContributionSnake";

jest.setTimeout(2 * 60 * 1000);

const silent = (handler: () => void | Promise<void>) => async () => {
  const originalConsoleLog = console.log;
  console.log = () => undefined;
  try {
    return await handler();
  } finally {
    console.log = originalConsoleLog;
  }
};

it(
  "should generate contribution snake",
  silent(async () => {
    const outputSvg = path.join(__dirname, "__snapshots__/out.svg");
    const outputGif = path.join(__dirname, "__snapshots__/out.gif");

    console.log = () => undefined;
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
  })
);
