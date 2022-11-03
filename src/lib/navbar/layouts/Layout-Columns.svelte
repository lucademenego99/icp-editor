<script lang="ts">
    export let isActive: boolean;

    import { Layouts } from "../../../types";
    import { revealSlides, currentSlideH, currentSlideV } from "../../../stores";
</script>

<div
    on:click={() => {$revealSlides[$currentSlideH][$currentSlideV].setLayout(Layouts.COLUMNS); revealSlides.update(a => a)}}
    class="flex justify-center items-center relative cursor-pointer rounded-sm w-full pt-[56.25%] bg-white transition-all hover:bg-[#e8e8e8] box-border {isActive
        ? 'border-solid border-2 border-[#c3073f]'
        : ''}"
>
    <div
        class="absolute rounded-lg top-[40%] left-[10%] w-[35%] h-[20%] bg-[#6c6c6c]"
    />
    <div
        class="absolute rounded-lg top-[40%] right-[10%] w-[35%] h-[20%] bg-[#6c6c6c]"
    />
</div>
