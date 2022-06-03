<!-- Initialize reveal -->
<script lang="ts">
    import { onMount } from "svelte";
    import Reveal from "reveal.js";

    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";

    import { RevealInstance, revealSlides } from "../../stores";
    import { Layouts } from "../../types";

    let slides: Layouts[];

    // Update the slides variable based on the store's value
	revealSlides.subscribe(value => {
		slides = value;
	});

    // If the slides changed and Reveal is ready, go to the last slide
    $: if (slides && Reveal.next) {
        setTimeout(() => {Reveal.slide(Reveal.getSlides().length - 1)}, 50);
    }

    onMount(() => {
        Reveal.initialize({
            // Display controls in the bottom right corner
            controls: true,
            // Display a presentation progress bar
            progress: true,
            // Push each slide change to the browser history
            history: true,
            // Enable keyboard shortcuts for navigation
            keyboard: true,
            // Enable the slide overview mode
            overview: false,
            // Vertical centering of slides
            center: true,
            // Loop the presentation
            loop: false,
            // Enables touch navigation on devices with touch input
            touch: true,
            // Apply a 3D roll to links on hover
            rollingLinks: true,
            // Transition style for full page slide backgrounds
            backgroundTransition: "fade", // none/fade/slide/convex/concave/zoom
            // Select a theme
            theme: "blood",
            // Select the type of slides transition
            transition: "slide",
            embedded: true,
            // IMPORTANT: disable the default layout (centering and scaling) to make the code editors work correctly
            disableLayout: true,
        });

        $RevealInstance = Reveal;
    });
</script>

<div
    class="h-screen full-page-demo reveal-viewport"
    data-page="icp"
    style="box-sizing: border-box; width: 100%; height: 100%; transition: transform 0.8s ease 0s;"
>
    <div
        class="reveal slide focused has-horizontal-slides ready"
        role="application"
        data-transition-speed="default"
        data-background-transition="fade"
    >
        <div class="slides">
            {#each slides as slide}
                {#if slide == Layouts.BODY}
                    <LayoutBody />
                {:else if slide == Layouts.MAIN}
                    <LayoutMain />
                {:else if slide == Layouts.COLUMNS}
                    <LayoutColumns />
                {/if}
            {/each}
        </div>
    </div>
</div>
