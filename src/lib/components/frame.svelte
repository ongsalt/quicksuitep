<script lang="ts">
  import { onMount, untrack, type Snippet } from "svelte";
  import sui from "../../assets/sui.jpg";
  import { Rect } from "../rect";
  import { onDrag, type OnDrag } from "../gesture";

  interface Props {
    children?: Snippet;
    frameSize?: Rect;
    dragHandler?: OnDrag;
  }

  let {
    children,
    frameSize = $bindable(),
    dragHandler = () => {},
  }: Props = $props();

  let w = $state(0);
  let h = $state(0);

  let mounted = $state(false);

  onMount(() => (mounted = true));

  $effect(() => {
    if (mounted) {
      const f = untrack(() => frameSize!);
      if (!f) {
        frameSize = Rect.of(0, 0, w, h);
      } else {
        frameSize = {
          ...f,
          w,
          h,
        };
      }
    }
    mounted = true;
  });
</script>

<div
  {@attach onDrag(dragHandler)}
  class="aspect-[9_/_19] relative w-80 rounded-[2.5rem] overflow-clip border border-black/5 shadow-xl"
  bind:clientWidth={w}
  bind:clientHeight={h}
>
  <img src={sui} class="absolute size-full object-cover" alt="sui" />
  {@render children?.()}
</div>
