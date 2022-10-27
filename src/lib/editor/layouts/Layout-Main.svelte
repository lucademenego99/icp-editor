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
    export let isOverview: boolean = false;
</script>

<section bind:this={slide.html} class="{slideState()}" style="{isOverview ? 'all: unset !important; border: 3px solid black !important;' : ''}">
    <!-- title class: custom style for titles -->
    <h3 class="title editable" contenteditable="true">Title</h3>

    <!-- subtitle class: custom style for subtitles -->
    <p class="subtitle editable" contenteditable="true">Subtitle</p>
</section>
