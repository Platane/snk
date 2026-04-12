import { rmSync } from "fs";
import { join } from "path";

const outdir = join(import.meta.dir, "dist");
rmSync(outdir, { recursive: true, force: true });

//
// 1. build worker first to get its hashed filename
const workerBuild = await Bun.build({
  entrypoints: [join(import.meta.dir, "interactive/worker.ts")],
  outdir,
  target: "browser",
  naming: "[name]-[hash].[ext]",
});

if (!workerBuild.success) {
  console.error(workerBuild.logs);
  process.exit(1);
}

const workerFile = "./" + workerBuild.outputs[0].path.split("/").at(-1)!;

//
// 2. build all demos, injecting the worker url

const [interactiveBuild, demoBuild] = await Promise.all([
  // interactive -> dist/index.html (root)
  Bun.build({
    entrypoints: [join(import.meta.dir, "interactive/index.html")],
    outdir,
    root: join(import.meta.dir, "interactive"),
    target: "browser",
    define: {
      "process.env.WORKER_URL": JSON.stringify(workerFile),
      "process.env.GITHUB_USER_CONTRIBUTION_API_ENDPOINT": JSON.stringify(
        process.env.GITHUB_USER_CONTRIBUTION_API_ENDPOINT ?? "/",
      ),
    },
  }),

  // all other demos -> dist/{name}/index.html
  Bun.build({
    entrypoints: Array.from(
      new Bun.Glob("*/index.html").scanSync(import.meta.dir),
    )
      .filter((f) => !f.startsWith("dist/") && !f.startsWith("interactive/"))
      .map((f) => join(import.meta.dir, f)),
    outdir,
    target: "browser",
  }),
]);

if (!interactiveBuild.success) {
  console.error(interactiveBuild.logs);
  process.exit(1);
}

if (!demoBuild.success) {
  console.error(demoBuild.logs);
  process.exit(1);
}
