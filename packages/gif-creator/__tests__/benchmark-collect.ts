import * as fs from "fs";

const runs: any[] = JSON.parse(
  fs
    .readFileSync(__dirname + `/__snapshots__/benchmark-result.json`)
    .toString(),
);

const mean = (values: number[]) =>
  values.reduce((s, x) => s + x, 0) / (values.length || 1);

const toLiteralSize = (s: number) => {
  return (
    (s / 1_024).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    }) + "Ko"
  );

  if (s < 1_024) return s.toFixed(1) + "o";
  if (s < 1_024 * 1_024) return (s / 1_024).toFixed(1) + "Ko";
  return (s / (1_024 * 1_024)).toFixed(1) + "Mo";
};

console.log("| implementation | size | generation duration |\n|---|---|---|");

for (const implementation of new Set(
  runs.map((r) => r.implementation),
) as any) {
  const rs = runs.filter(
    (r) =>
      r.implementation === implementation &&
      r.frameByStep === 1 &&
      r.colorBackground === "white",
  );

  console.log(
    "|" +
      [
        implementation,
        toLiteralSize(mean(rs.map((r) => r.fileSizeByte))),
        (mean(rs.map((r) => r.durationMs)) / 1000).toFixed(1) + "s",
      ].join("|") +
      "|",
  );
}

console.log(
  "\n\n| colorBackground | size | generation duration |\n|---|---|---|",
);

for (const colorBackground of new Set(
  runs.map((r) => r.colorBackground),
) as any) {
  const rs = runs.filter(
    (r) =>
      r.implementation === "gifEncoder+gifslice" &&
      r.frameByStep === 1 &&
      r.colorBackground === colorBackground,
  );

  console.log(
    "|" +
      [
        colorBackground,
        toLiteralSize(mean(rs.map((r) => r.fileSizeByte))),
        (mean(rs.map((r) => r.durationMs)) / 1000).toFixed(1) + "s",
      ].join("|") +
      "|",
  );
}

console.log("\n\n| frameByStep | size | generation duration |\n|---|---|---|");

for (const frameByStep of new Set(runs.map((r) => r.frameByStep)) as any) {
  const rs = runs.filter(
    (r) =>
      r.implementation === "gifEncoder+gifslice" &&
      r.frameByStep === frameByStep &&
      r.colorBackground === "white",
  );

  console.log(
    "|" +
      [
        frameByStep,
        toLiteralSize(mean(rs.map((r) => r.fileSizeByte))),
        (mean(rs.map((r) => r.durationMs)) / 1000).toFixed(1) + "s",
      ].join("|") +
      "|",
  );
}
