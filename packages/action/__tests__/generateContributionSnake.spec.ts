import * as fs from "fs";
import * as path from "path";
import { generateContributionSnake } from "../generateContributionSnake";
import { parseOutputsOption } from "../outputsOptions";
import { config } from "dotenv";
config({ path: __dirname + "/../../../.env" });

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
    const entries = [
      path.join(__dirname, "__snapshots__/out.svg"),

      path.join(__dirname, "__snapshots__/out-dark.svg") +
        "?palette=github-dark&color_snake=orange",

      path.join(__dirname, "__snapshots__/out.gif") +
        "?color_snake=orange&color_dots=#d4e0f0,#8dbdff,#64a1f4,#4b91f1,#3c7dd9",
    ];

    const outputs = parseOutputsOption(entries);

    const results = await generateContributionSnake("platane", outputs, {
      githubToken: process.env.GITHUB_TOKEN!,
    });

    expect(results[0]).toBeDefined();
    expect(results[1]).toBeDefined();
    expect(results[2]).toBeDefined();

    fs.writeFileSync(outputs[0]!.filename, results[0]!);
    fs.writeFileSync(outputs[1]!.filename, results[1]!);
    fs.writeFileSync(outputs[2]!.filename, results[2]!);
  })
);
