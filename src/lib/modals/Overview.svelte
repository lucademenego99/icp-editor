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
            class=""
        >
            <div class="flex flex-row gap-10">
                {#each slides as verticalSlides}
                    <section>
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
