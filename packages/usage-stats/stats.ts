import * as fs from "fs";

type R = { repo: string } & Partial<{
  dependency: string;
  version: string;
  run_started_at: string;
  conclusion: "failure" | "success";
  cron?: string;
  workflow_file: string;
}>;

(async () => {
  const repos: R[] = JSON.parse(
    fs.readFileSync(__dirname + "/cache/stats.json").toString()
  );

  const total = repos.length;

  const recent_repos = repos.filter(
    (r) =>
      new Date(r.run_started_at!).getTime() >
      Date.now() - 7 * 24 * 60 * 60 * 1000
  );

  const recent_successful_repos = recent_repos.filter(
    (r) => r?.conclusion === "success"
  );

  const versions = new Map();
  for (const { dependency } of recent_successful_repos) {
    versions.set(dependency, (versions.get(dependency) ?? 0) + 1);
  }

  console.log(`total ${total}`);
  console.log(
    `recent_repos ${recent_repos.length} (${(
      (recent_repos.length / total) *
      100
    ).toFixed(2)}%)`
  );
  console.log(
    `recent_successful_repos ${recent_successful_repos.length} (${(
      (recent_successful_repos.length / total) *
      100
    ).toFixed(2)}%)`
  );
  console.log("versions");
  for (const [name, count] of Array.from(versions.entries()).sort(
    ([, a], [, b]) => b - a
  ))
    console.log(
      `${(name as string).split("Platane/")[1].padEnd(20, " ")}  ${(
        (count / recent_successful_repos.length) *
        100
      )
        .toFixed(2)
        .padStart(6, " ")}% ${count} `
    );
})();
