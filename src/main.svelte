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
  
  let target = $state("window");
  function toggle() {
    target = target === "icon" ? "window" : "icon";
    
    if (target === "icon") {
      // windowState.setTarget({ ...frameSize, h: frameSize.w, x: 36, y: -200, z: 0 });
      windowState.setTarget({ ...frameSize, h: frameSize.w, x: 36, y: -100, z: 0 });
    } else {
      windowState.setTarget({ ...frameSize, z: 1 });
    }
  }
</script>

<div class="flex h-screen">
  <div class="h-full flex items-center p-6">
    <Frame bind:frameSize {dragHandler}>
      <Window onclick={toggle} rect={windowState.rect} fullSize={frameSize}>
        <div class="bg-white/30 size-full">
          <nav class="pt-16 p-8">
            <h1 class="text-3xl">Somdsjkfy</h1>
          </nav>
          <div class="px-8">
            <p>We're no strangers to love You know the rules and so do I (do I) A full commitment's what I'm thinking of You wouldn't get this from any other guy I just wanna tell you how I'm feeling Gotta make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you We've known each other for so long Your heart's been aching, but you're too shy to say it (say it) Inside, we both know what's been going on (going on) We know the game and we're gonna play it And if you ask me how I'm feeling Don't tell me you're too blind to see Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you We've known each other for so long Your heart's been aching, but you're too shy to say it (to say it) Inside, we both know what's been going on (going on) We know the game and we're gonna play it I just wanna tell you how I'm feeling Gotta make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you</p>
          </div>
        </div>
      </Window>
    </Frame>
  </div>
  <div class="flex-1 bg-red-50">
    <Control></Control>
  </div>
</div>
