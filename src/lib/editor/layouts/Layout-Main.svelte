<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import MainTemplate from "../../../classes/templates/MainTemplate";
    import { currentSlideH, currentSlideV } from "../../../stores";

    /**
     * @param {Slide} slide - The slide to be rendered
     */
    export let slide: Slide;

    /**
     * Get the current slide state, between past, present and future
     * @returns {string} - The current slide state
     */
    function slideState(): string {
        let state: string;
        if (slide.indexH < $currentSlideH || (slide.indexH == $currentSlideH && slide.indexV < $currentSlideV)) {
            state = "past";
        } else if (slide.indexH == $currentSlideH && slide.indexV == $currentSlideV) {
            state = "present";
        } else {
            state = "future";
        }

        return state;
    }
</script>

{#if slide.template instanceof MainTemplate}
<section class="{slideState()}">
    <!-- title class: custom style for titles -->
    <h3 class="title editable" contenteditable="true" bind:textContent={slide.template.title}></h3>

    <!-- subtitle class: custom style for subtitles -->
    <p class="subtitle editable" contenteditable="true" bind:textContent={slide.template.subtitle}></p>
</section>
{/if}
