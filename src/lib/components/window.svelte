<script lang="ts">
  import type { Snippet } from "svelte";
  import { Rect } from "../rect";

  interface Props {
    children?: Snippet;
    fullSize: Rect;
    rect: Rect;
  }

  let { children, rect, fullSize = Rect.zero() }: Props = $props();

  // TODO: calculate scaling from fullSize and rect
  const scale = $derived(rect.w / fullSize.w);
  const y = $derived(rect.y);

  // this should be center
  const style = $derived(
    `transform-origin: 50% 100% ;scale: ${scale}; width: ${fullSize.w}px; height: ${fullSize.h}px; translate: ${rect.x}px ${y}px;`,
  );
</script>

<div
  class="absolute rounded-[2.5rem] overflow-clip backdrop-blur-xl bg-white/20"
  {style}
>
  {@render children?.()}
</div>
