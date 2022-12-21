# @snk/github-user-contribution

Get the github user contribution graph

## Usage

```js
const { cells, colorScheme } = await getGithubUserContribution("platane");

// colorScheme = [
//    "#ebedf0",
//    "#B6E3FF",
//    ...
// ]
// cells = [
//    {
//      x: 3,
//      y: 0,
//      count: 3,
//      color: '#ebedf0',
//      date:'2019-01-18'
//    },
//    ...
// ]
```

## Implementation

Based on the html page. Which is very unstable. We might switch to using github api but afaik it's a bit complex.
