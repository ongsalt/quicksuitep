<script lang="ts">
  import Control from "./lib/components/control.svelte";
  import Frame from "./lib/components/frame.svelte";
  import Window from "./lib/components/window.svelte";
  import type { OnDrag } from "./lib/gesture";
  import type { Rect } from "./lib/rect";
  import { WindowState } from "./lib/window-state.svelte";

  let frameSize = $state() as Rect;
  $inspect(frameSize);

  const windowState = new WindowState();

  const dragHandler: OnDrag = async (startingPosition, offsetStream) => {
    let lastTime = performance.now();
    for await (const { x, y } of offsetStream) {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      const z = 1 - -(y - startingPosition.y) / frameSize.h;

      windowState.setTarget({
        x: x - startingPosition.x,
        y: y - startingPosition.y,
        z: z,
      });
    }

    windowState.setTarget({
      x: 0,
      y: 0,
      z: 1,
    });
    console.log("stop");
  };

  $effect(() => {
    windowState.setTarget({ ...frameSize, z: 1 }, true);
  });
</script>

<div class="flex h-screen">
  <div class="h-full flex items-center p-6">
    <Frame bind:frameSize {dragHandler}>
      <Window rect={windowState.rect} fullSize={frameSize}>
        <div class="bg-white/30 size-full p-8">
          <h1 class="text-2xl">Sui</h1>
        </div>
      </Window>
    </Frame>
  </div>
  <div class="flex-1 bg-red-50">
    <Control></Control>
  </div>
</div>
