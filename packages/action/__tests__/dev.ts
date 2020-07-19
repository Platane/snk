import { generateContributionSnake } from "../generateContributionSnake";

generateContributionSnake("platane").then((buffer) => {
  process.stdout.write(buffer);
});
