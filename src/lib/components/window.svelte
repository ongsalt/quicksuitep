<script lang="ts">
  import type { Snippet } from "svelte";
  import { Rect } from "../rect";

  interface Props {
    children?: Snippet;
    fullSize: Rect;
    rect: Rect;
    onclick?: () => any;
  }

  let { children, rect, fullSize = Rect.zero(), onclick }: Props = $props();

  // TODO: calculate scaling from fullSize and rect
  const scale = $derived(rect.w / fullSize.w);
  const y = $derived(rect.y);

  // TODO: stop using font-size em hack
  const style = $derived(
    `transform-origin: 50% 50% ; width: ${rect.w}px; height: ${rect.h}px; translate: ${rect.x}px ${y}px;`,
    // `font-size: ${scale}rem; transform-origin: 50% 50% ; width: ${rect.w}px; height: ${rect.h}px; translate: ${rect.x}px ${y}px;`,
  );
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  class="absolute rounded-[2.5rem] overflow-clip backdrop-blur-xl bg-white/20"
  {onclick}
  {style}
>
  <div style="transform: scale({scale}); transform-origin: 0 0; width: {fullSize.w}px; height: {fullSize.h}px;" class="size-full">
    {@render children?.()}
  </div>
</div>
