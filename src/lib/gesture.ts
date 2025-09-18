import { createAsyncIterator } from "./async-iterator";
import type { MaybePromise } from "./utils";

interface Position {
  x: number,
  y: number,
}

export type OnDrag = (startingPosition: Position, offsetStream: AsyncIterable<Position>) => MaybePromise<void>;

export function onDrag(fn: OnDrag) {
  return (element: HTMLElement) => {
    const { abort, signal } = new AbortController();
    let stream: ReturnType<typeof createAsyncIterator.withResolvers<Position>>;

    function createStream(start?: Position): AsyncIterable<Position> {
      stream = createAsyncIterator.withResolvers<Position>();
      if (start) {
        stream.send(start);
      }
      return {
        [Symbol.asyncIterator]: () => stream.stream
      };
    }

    element.addEventListener("touchstart", (event) => {
      const stream = createStream();
      fn(
        {
          x: event.touches.item(0)?.screenX!,
          y: event.touches.item(0)?.screenY!,
        },
        stream
      );
    }, { signal });

    element.addEventListener("touchend", () => {
      stream.stop();
    }, { signal });

    element.addEventListener("touchmove", (event) => {
      if (stream) {
        stream.send({
          x: event.touches.item(0)?.screenX!,
          y: event.touches.item(0)?.screenY!,
        });
      }
    }, { signal });

    element.addEventListener("pointerdown", (event) => {
      const stream = createStream();
      fn(
        {
          x: event.screenX,
          y: event.screenY,
        },
        stream
      );
    }, { signal });

    element.addEventListener("pointerup", () => {
      stream.stop();
    }, { signal });

    element.addEventListener("pointerleave", () => {
      stream.stop();
    }, { signal });

    element.addEventListener("pointermove", (event) => {
      if (stream) {
        stream.send({
          x: event.screenX,
          y: event.screenY,
        });
      }
    }, { signal });

    return () => {
      abort();
    };
  };
}