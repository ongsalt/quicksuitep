import { Spring } from "svelte/motion";
import { mapRange, Rect, Rect3 } from "./rect";
import { untrack } from "svelte";

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export class WindowState {
  #r = new Spring(Rect3.zero(), {
    precision: 0.00001
  });

  rect = $derived.by(() => {
    const { h, w, x, y, z } = this.#r.current;
    const iconScale = 0.3;
    const zz = 1 - easeOutCubic(1 - z);
    const scaleFactor = mapRange(zz, 0, 1, iconScale, 1);
    // const scaleFactor = z;

    const rect = {
      h: h * scaleFactor,
      w: w * scaleFactor,
      x: x,
      y: y,
    } satisfies Rect;
    console.log(rect);
    return rect;
  });

  get target() {
    return this.#r.target;
  }

  setTarget(rect3: Partial<Rect3>, immediate = false) {
    const rect = untrack(() => ({
      ...this.#r.target,
      ...rect3
    }));

    this.#r.set(rect, { instant: immediate });
  }
}
