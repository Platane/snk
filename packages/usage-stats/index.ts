import { getDependentInfo } from "./getDependentInfo";
import { getDependents } from "./getDependents";
import ParkMiller from "park-miller";

const toChunk = <T>(arr: T[], n = 1) =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) =>
    arr.slice(i * n, (i + 1) * n)
  );

const random = new ParkMiller(10);

const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random.float() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

(async () => {
  const packages = await getDependents("Platane/snk");

  const repos = packages.map((p) => p.dependents).flat();

  shuffle(repos);
  repos.splice(0, repos.length - 5000);

  console.log(repos);

  const infos: any[] = [];

  // for (const chunk of toChunk(repos, 10))
  //   await Promise.all(
  //     chunk.map(async (repo) => {
  //       console.log(
  //         infos.length.toString().padStart(5, " "),
  //         "/",
  //         repos.length
  //       );

  //       infos.push({ repo, ...(await getDependentInfo(repo)) });
  //     })
  //   );

  for (const repo of repos) {
    console.log(infos.length.toString().padStart(5, " "), "/", repos.length);

    infos.push({ repo, ...(await getDependentInfo(repo)) });
  }
})();
