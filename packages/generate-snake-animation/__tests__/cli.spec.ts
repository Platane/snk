import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { it, expect, afterAll } from "bun:test";
import { $ } from "bun";

const cliPath = path.resolve(__dirname, "../cli.ts");
const tmpDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "generate-snake-animation-test-"),
);
const outSvg = path.join(tmpDir, "out.svg");

afterAll(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

it(
  "should generate svg via CLI with forgejo_user",
  async () => {
    const result =
      await $`bun ${cliPath} --forgejo_user=codeberg.org/JasterV --output=${outSvg}`.quiet();

    expect(result.exitCode).toBe(0);
    expect(fs.existsSync(outSvg)).toBe(true);

    const content = fs.readFileSync(outSvg, "utf-8");
    expect(content).toMatch(/^<svg/);
    expect(content).toMatch(/<\/svg>/);
  },
  { timeout: 2 * 60 * 1000 },
);
