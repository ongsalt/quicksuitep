import { Spring } from "svelte/motion";
import { mapRange, Rect, Rect3 } from "./rect";
import { untrack } from "svelte";

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export class WindowState {
  #r = new Spring(Rect3.zero(), {
    precision: 0.00001,
    stiffness: 0.11,
    damping: 0.85
  });

  rect = $derived.by(() => {
    const { h, w, x, y, z } = this.#r.current;
    const iconScale = 0.15;
    // const zz = 1 - easeOutCubic(1 - z);
    const scaleFactor = mapRange(z, 0, 1, iconScale, 1);
    // const scaleFactor = z;

    const yy = y + (h - h * scaleFactor);

    const rect = {
      h: h * scaleFactor,
      w: w * scaleFactor,
      x: x,
      y: yy,
      // y: y + (h - h * scaleFactor) / 2,
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

    // TODO: custom spring impl
    this.#r.set(rect, { instant: immediate });
  }
}
