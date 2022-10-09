<script lang="ts">
    import type { Slide } from "src/classes/Slide";

    export let slide: Slide;
</script>

<section bind:this={slide.html} class="future">
    <!-- title class: custom style for titles -->
    <h3 class="title editable" contenteditable="true">Title</h3>

    <!-- subtitle class: custom style for subtitles -->
    <p class="subtitle editable" contenteditable="true">Subtitle</p>
</section>
