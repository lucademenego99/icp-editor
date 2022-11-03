<script lang="ts">
    import type { Slide } from "src/classes/Slide";
    import { currentSlideH, currentSlideV } from "../../../stores";

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

    export let slide: Slide;
</script>

<section bind:this={slide.template.html} class="{slideState()}">
    <!-- title class: custom style for titles -->
    <h3 class="title editable" contenteditable="true" bind:textContent={slide.template.title}></h3>

    <!-- subtitle class: custom style for subtitles -->
    <p class="subtitle editable" contenteditable="true" bind:textContent={slide.template.subtitle}></p>
</section>
