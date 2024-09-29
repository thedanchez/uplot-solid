import { createSignal } from "solid-js";

import UplotSolid from "../dist";
import fakeData from "./resource/uplot_fake_data.json";

const isNil = (value: unknown): value is null | undefined => value === null || value === undefined;

export const App = () => {
  const [size, setSize] = createSignal({ width: 1000, height: 300 });
  const [position, setPosition] = createSignal({ left: 0, top: 0 });
  const [content, setContent] = createSignal("");

  const alignedData = [fakeData.time, fakeData.y_series_1, fakeData.y_series_2] as uPlot.AlignedData;

  return (
    <div id="app-playground">
      <button
        onClick={() => {
          setSize({ width: 1000, height: size().height === 300 ? 600 : 300 });
        }}
      >
        toggle height
      </button>
      <UplotSolid
        id="snapshot-plot"
        data={alignedData}
        width={size().width}
        height={size().height}
        series={[
          {
            label: "Time",
            stroke: "green",
          },
          {
            label: "Series 2",
            stroke: "blue",
          },
          {
            label: "Series 3",
            stroke: "red",
          },
        ]}
        hooks={{
          setCursor: [
            (u) => {
              const { idx } = u.cursor;

              const left = u.cursor.left as number;
              const top = u.cursor.top as number;

              if (!isNil(idx)) {
                const xValue = u.data[0][idx] as number;
                const yValue = u.data[1]?.[idx] as number;
                const yValue2 = u.data[2]?.[idx] as number;

                setPosition({ left: left - 90, top: top + 40 });
                // setContent(`x: ${xValue}, y: ${yValue}`);
                setContent(
                  `x: ${new Date(xValue).toLocaleTimeString()}, y1: ${yValue}, y2: ${yValue2}. Pluse randome number: ${Math.random()}`,
                );
              } else {
                setContent(""); // Hide tooltip
              }
            },
          ],
        }}
      />
      <Tooltip position={position()} content={content()} />
    </div>
  );
};

type TooltipProps = {
  readonly position: { left: number; top: number };
  readonly content: string;
};

function Tooltip(props: TooltipProps) {
  return (
    <div
      id="tooltip"
      style={{
        position: "absolute",
        background: "black",
        color: "white",
        padding: "5px",
        border: "1px solid black",
        "border-radius": "3px",
        "pointer-events": "none",
        display: props.content ? "block" : "none",
        left: `${props.position.left}px`,
        top: `${props.position.top}px`,
        "z-index": 100,
      }}
    >
      {props.content}
    </div>
  );
}
