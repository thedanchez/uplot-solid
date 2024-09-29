import "uplot/dist/uPlot.min.css";

import { createEffect, type JSX, mergeProps, onCleanup, type ParentProps, splitProps, untrack } from "solid-js";
import uPlot from "uplot";

type Props = uPlot.Options & {
  readonly class?: string;
  /** Callback when uPlot instance is created */
  readonly onCreate?: (u: uPlot, container: HTMLDivElement) => void;
  /** Apply scale reset on redraw triggered by updated plot data (default: `true`) */
  readonly resetScales?: boolean;
  readonly style?: JSX.CSSProperties | string;
};

const DEFAULT_PROPS = {
  data: [] as uPlot.AlignedData,
  resetScales: true,
};

const UplotSolid = (props: ParentProps<Props>) => {
  let chartContainerRef!: HTMLDivElement;

  const mergedProps = mergeProps(DEFAULT_PROPS, props);
  const [_props, options] = splitProps(mergedProps, [
    "class",
    "children",
    "data",
    "height",
    "width",
    "onCreate",
    "resetScales",
    "style",
  ]);

  const size = () => ({ width: _props.width, height: _props.height });

  // Untrack size to avoid re-creating the chart on size changes
  const uplotOptions = () => ({ ...options, ...untrack(size) });

  createEffect(() => {
    const chart = new uPlot(
      uplotOptions(),
      // Untrack data to avoid re-creating the chart on data changes
      untrack(() => _props.data),
      chartContainerRef,
    );

    _props.onCreate?.(chart, chartContainerRef);

    createEffect(() => {
      chart.setSize(size());
    });

    createEffect(() => {
      chart.setData(_props.data, _props.resetScales);
    });

    onCleanup(() => {
      chart.destroy();
    });
  });

  return (
    <div id="uplot-solid" class={_props.class} ref={chartContainerRef} style={_props.style}>
      {_props.children}
    </div>
  );
};

export default UplotSolid;
