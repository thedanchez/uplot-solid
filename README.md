<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=Ecosystem&background=tiles&project=uplot-solid" alt="uplot-solid">
</p>

[![NPM Version](https://img.shields.io/npm/v/uplot-solid.svg?style=for-the-badge)](https://www.npmjs.com/package/uplot-solid) [![Build Status](https://img.shields.io/github/actions/workflow/status/thedanchez/uplot-solid/ci.yaml?branch=main&logo=github&style=for-the-badge)](https://github.com/thedanchez/uplot-solid/actions/workflows/ci.yaml) [![bun](https://img.shields.io/badge/maintained%20with-bun-cc00ff.svg?style=for-the-badge&logo=bun)](https://bun.sh/)

# μPlot Solid

Solid wrapper around [μPlot](https://github.com/leeoniya/uPlot?tab=readme-ov-file#-%CE%BCplot) which is a small, fast and performant 2D canvas based chart for time series, lines, areas, ohlc & bars. It exposes the μPlot API in a fully typed, declarative JSX format and does the work to make the μPlot experience as reactive as possible.

Once a μPlot instance is made, the component will **not** recreate a new instance even if the `data` or `size` of the chart updates reactively. However, it will create a new chart instance if any other options are reactively updated when using it (e.g. `series`, `hooks`, `plugins`, etc.).

## Installing

Both `solid-js` and `uplot` are peer dependencies of `uplot-solid`.

```bash
npm install solid-js uplot uplot-solid
pnpm add solid-js uplot uplot-solid
yarn add solid-js uplot uplot-solid
bun add solid-js uplot uplot-solid
```

## Overview

If you are new to μPlot, here is a quick breakdown of some things using a simple example plot:

```tsx
import UplotSolid from "uplot-solid";

<UplotSolid
  width={1000}
  height={300}
  data={[
    [], // x-series data
    [], // y-series-1 data
    [], // y-series-2 data
    // etc...
  ]}
  series={[
    {
      label: "Time",
      stroke: "green",
    },
    {
      label: "Y Series 1",
      stroke: "blue",
    },
    {
      label: "Y Series 2",
      stroke: "red",
    },
    // etc...
  ]}
/>;
```

The above is the minimum of what you need to get a chart on screen given you have filled in the data. The expected format of `data` is a 2D array where the first array is the dataset for the x-series of the plot. The `series` list follows the same ordering being a list of config objects where the first object applies to the x-series and the rest to the y-series. μPlot supports a single x-series and all the y-series share the same x-series data. There are many more fields within the series struct that you can configure to tailor the display of the series data to your liking.

Here are some other key options within the API to familiarize yourself with:

- `hooks`: An object structure exposing key events that occur within μPlot. Every event hook accepts an **array of callbacks** allowing you to have discrete units of work that occur within a single event.
- `plugins`: A **plugin** is used to extend or modify the behavior of the chart by injecting custom functionality. You can hook into the various lifecycle events (the very same ones exposed from the `hooks` property) and add custom behavior, such as drawing on the canvas, adding custom controls, tooltips, interactions, or integrating with external libraries.

### Why Use Plugins Instead of Hooks?

In a nutshell, separation of concerns. Here are some points:

- **Customization**: Add custom drawings (like annotations, lines, or custom tooltips).
- **Modularity**: Keep the core logic of the chart clean and separate from specific custom behavior.
- **Reusability**: Create reusable plugins that can be applied across multiple uPlot instances with consistent functionality.
- **Extensibility**: Augment the chart with additional features (e.g., zoom controls, data overlays).

### Demos

Be sure to check out the [μPlot demos](https://leeoniya.github.io/uPlot/demos/index.html) to see the many kinds of different charts you can create. The code for the demos can be found [here](https://github.com/leeoniya/uPlot/tree/master/demos).

Over time, I will try to add example demos using this library to showcase some simple and more complex examples (e.g. creating custom tooltips either via `plugins` or using Solid directly)

## Getting Started

Some pre-requisites before install dependencies:

- Install Node Version Manager (NVM)
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  ```
- Install Bun
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

### Installing Dependencies

```bash
nvm use
bun install
```

### Local Development Build

```bash
bun start
```

### Linting & Formatting

```bash
bun run lint    # checks source for lint violations
bun run format  # checks source for format violations

bun run lint:fix    # fixes lint violations
bun run format:fix  # fixes format violations
```

### Unit Testing

> We use [Solid Testing Library](https://github.com/solidjs/solid-testing-library) for integration style unit tests

```bash
bun run test
bun run test:cov  # with test coverage
```

### Contributing

The only requirements when contributing are:

- You keep a clean git history in your branch
  - rebasing `main` instead of making merge commits.
- Using proper commit message formats that adhere to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
  - Additionally, squashing (via rebase) commits that are not [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- CI checks pass before merging into `main`
