import * as os from "node:os";

/**
 * re-export getInput from "@actions/core" without the bloat
 */
export const getInput = (name: string) =>
  process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";

/**
 * re-export setFailed from "@actions/core" without the bloat
 */
export const setFailed = (message: string) => {
  process.exitCode = 1;
  process.stdout.write(`::error::${escapeData(message)}::${os.EOL}`);
};

function escapeData(s: string): string {
  return s.replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
