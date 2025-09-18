<script lang="ts">
  import Control from "./lib/components/control.svelte";
  import Frame from "./lib/components/frame.svelte";
  import Window from "./lib/components/window.svelte";
  import type { Rect } from "./lib/rect";

  let frameSize = $state() as Rect;

  $inspect(frameSize)
</script>

<div class="flex h-screen">
  <div class="h-full flex items-center p-6">
    <Frame bind:frameSize>
      <Window rect={frameSize}>
        <div class="bg-white size-full"></div>
      </Window>
    </Frame>
  </div>
  <div class="flex-1 bg-red-50">
    <Control></Control>
  </div>
</div>
