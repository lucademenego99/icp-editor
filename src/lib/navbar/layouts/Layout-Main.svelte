<script lang="ts">
    export let isActive: boolean;

    import { Layouts } from "../../../types";
    import {
        revealSlides,
        currentSlideH,
        currentSlideV,
    } from "../../../stores";
</script>

<div
    on:click={() => {
        $revealSlides[$currentSlideH][$currentSlideV].setLayout(Layouts.MAIN);
        revealSlides.update((a) => a);
    }}
    class="flex justify-center items-center relative cursor-pointer rounded-sm w-full pt-[56.25%] bg-white transition-all hover:bg-[#e8e8e8] box-border {isActive
        ? 'border-solid border-2 border-[#c3073f]'
        : ''}"
>
    <div class="absolute rounded-lg top-[30%] w-[60%] h-[15%] bg-[#6c6c6c]" />
    <div class="absolute rounded-lg top-[55%] w-[40%] h-[10%] bg-[#6c6c6c]" />
</div>
