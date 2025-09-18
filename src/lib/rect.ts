export interface Rect {
  x: number,
  y: number,
  w: number,
  h: number;
}

export interface Rect3 extends Rect {
  z: number;
  // rotationZ: number;
}

export interface Rect3Transformation {
  scale: number,
  x: number,
  y: number
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

function zero3(): Rect3 {
  return {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 0
  };
}

function of3(x: number, y: number, z: number, w: number, h: number): Rect3 {
  return {
    x,
    y,
    w,
    h,
    z
  };
}

export function mapRange(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
  return (value - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin;
}

export const Rect = {
  zero,
  of,
};

export const Rect3 = {
  zero: zero3,
  of: of3,
};
