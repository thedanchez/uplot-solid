# uplot-solid

## 1.0.0

### Major Changes

- Initial release of `uplot-solid` making μPlot available for SolidJS applications.

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
