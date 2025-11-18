# @snk/gif-creator

Generate a gif file from the grid and snake path.

# Implementation

It uses `gif-encoder-2` to create a gif and optimize it with `gifslice`.

**Transparency**

Having a transparent background seems to have a quite negative impact on the file size and duration. It should be avoided by default.

Transparency is currently broken for `gif-encoder-2`

**Interpolaction**

It is possible to interpolate betwen two snake step for a smoother movement. This again has a huge impact on the file size and should be avoided.

# Benchmark

I tested some implementations, slower and/or producing a larger gif file.

Here are the results for a realistic test case with solid background and no smooth steps.

| implementation                        | size      | generation duration |
| ------------------------------------- | --------- | ------------------- |
| draw steps on canvas (no output)      | -         | 1.5s                |
| create png image sequence (no output) | -         | 4.8s                |
| gifEncoder                            | 7,051Ko   | 4.3s                |
| gifEncoder+gifslice                   | **279Ko** | 5.0s                |
| ffmpeg                                | 385Ko     | 7.0s                |
| ffmpeg+gifslice                       | 356Ko     | 7.0s                |
| graphicMagic                          | 8,959Ko   | 20.3s               |

Some benchmark comparing different options

| frameByStep | size  | generation duration |
| ----------- | ----- | ------------------- |
| 1           | 279Ko | 5.0s                |
| 2           | 465Ko | 12.8s               |
| 3           | 584Ko | 19.2s               |
