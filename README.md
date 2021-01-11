# snk

![type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)
![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

Generates a snake game from a github user contributions grid

![](https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.gif)

Pull a github user's contribution grid.
Make it a snake Game, generate a snake path where the cells get eaten in an orderly fashion.

Generate a [gif](https://github.com/Platane/snk/raw/output/github-contribution-grid-snake.gif) or [svg](https://github.com/Platane/snk/raw/output/github-contribution-grid-snake.svg) image.

Available as github action. Automatically generate a new image at the end of the day. Which make for great [github profile readme](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme)

## Usage

**github action**

```yaml
- uses: Platane/snk@master
  with:
    github_user_name: platane
    gif_out_path: dist/github-contribution-grid-snake.gif
    svg_out_path: dist/github-contribution-grid-snake.svg
```

> [example with cron job](https://github.com/Platane/Platane/blob/master/.github/workflows/main.yml#L13-L18)

**interactive demo**

[platane.github.io/snk](https://platane.github.io/snk)

**local**

```
npm install

npm run dev:demo
```

## Implementation

[solver algorithm](./packages/solver/README.md)
