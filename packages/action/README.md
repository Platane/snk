# @snk/action

Contains the github action code.

## Implementation

### Docker

Because the gif generation requires some native libs, we cannot use a node.js action.

Use a docker action instead, the image is created from the [Dockerfile](./Dockerfile).

It's published to [dockerhub](https://hub.docker.com/r/platane/snk) which makes for faster build ( compare to building the image when the action runs )

Notice that the [action.yml](../../action.yml) point to the latest version of the image. Which makes releasing sematic versioning of the action pointless. Which is probably fine for a wacky project like this one.
