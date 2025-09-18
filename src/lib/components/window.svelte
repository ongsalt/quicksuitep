<script lang="ts">
  import type { Snippet } from "svelte";
    import type { Rect } from "../rect";

  interface Props {
    children?: Snippet;
    rect: Rect
  }

  let { children, rect }: Props = $props();
</script>

<div class="aspect-[9_/_19] w-80 rounded-[2.5rem] overflow-clip backdrop-blur-xl bg-white/20">
  {@render children?.()}
</div>
