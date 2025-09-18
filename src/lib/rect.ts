export interface Rect {
  x: number,
  y: number,
  w: number,
  h: number;
}

function zero(): Rect {
  return {
    x: 0,
    h: 0,
    w: 0,
    y: 0
  };
}

function of(x: number, y: number, w: number, h: number): Rect {
  return {
    x,
    y,
    w,
    h
  };
}

export const Rect = {
  zero,
  of
};