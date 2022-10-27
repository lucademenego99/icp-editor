<script lang="ts">
    import type { Slide } from "../../classes/Slide";
    import { revealSlides } from "../../stores";
    import { Layouts } from "../../types";
    import LayoutBody from "../editor/layouts/Layout-Body.svelte";
    import LayoutColumns from "../editor/layouts/Layout-Columns.svelte";
    import LayoutMain from "../editor/layouts/Layout-Main.svelte";

    export let show: boolean = false;

    let slides: Slide[][];

    // Update the slides variable based on the store's value
    revealSlides.subscribe((value) => {
        slides = value;
    });
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {show
        ? ''
        : 'hidden'}"
>
    <div
        class="w-5/6 h-5/6 bg-white bg-opacity-30 rounded-lg flex flex-col justify-evenly items-center"
    >
        <div
            class="w-full h-full overflow-auto flex mx-10" style=""
        >
            <div class="w-full h-full flex flex-row gap-4 mx-10" style="transform: scale(0.3) translateX(-75%);">
                {#each slides as verticalSlides}
                    <div class="aspect-video flex-1 bg-gray-100 bg-opacity-20 w-full h-full" style="">
                        <div class="reveal slide">
                            <div class="slides">
                                <section class="flex flex-col gap-4">
                                {#each verticalSlides as slide}
                                    {#if slide.layout == Layouts.BODY}
                                        <LayoutBody {slide} isOverview={true} />
                                    {:else if slide.layout == Layouts.MAIN}
                                        <LayoutMain {slide} isOverview={true} />
                                    {:else if slide.layout == Layouts.COLUMNS}
                                        <LayoutColumns {slide} isOverview={true} />
                                    {/if}
                                {/each}
                                </section>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    section {
        all: unset !important;
    }
</style>
