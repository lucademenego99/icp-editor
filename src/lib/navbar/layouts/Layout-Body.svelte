<script lang="ts">
    export let isActive: boolean;

    import { Layouts } from "../../../types";
    import { revealSlides, currentSlideH, currentSlideV } from "../../../stores";
</script>

<div
    on:click={() => {$revealSlides[$currentSlideH][$currentSlideV].setLayout(Layouts.BODY); revealSlides.update(a => a)}}
    class="flex justify-center items-center relative cursor-pointer rounded-sm w-full pt-[56.25%] bg-white transition-all hover:bg-[#e8e8e8] box-border {isActive
        ? 'border-solid border-2 border-[#c3073f]'
        : ''}"
>
    <div class="absolute rounded-lg top-[15%] w-[60%] h-[15%] bg-[#6c6c6c]" />
    <div class="absolute rounded-lg top-[45%] w-[30%] h-[8%] bg-[#6c6c6c]" />
    <div class="absolute rounded-lg top-[60%] w-[30%] h-[8%] bg-[#6c6c6c]" />
    <div class="absolute rounded-lg top-[75%] w-[30%] h-[8%] bg-[#6c6c6c]" />
</div>
