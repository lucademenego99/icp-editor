<!-- Initialize reveal -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Reveal from "reveal.js";

    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";

    import TrashSVG from "../../assets/Trash.svg?url";

    import {
        RevealInstance,
        revealSlides,
        currentSlideH,
        currentSlideV,
    } from "../../stores";
    import { Layouts } from "../../types";

    function removeCurrentSlide(event) {
        // Prevent the event from bubbling up to the parent element
        event.stopPropagation();

        // Store which slide is currently selected
        const toRemoveH = $currentSlideH;
        const toRemoveV = $currentSlideV;

        // Move to the previous slide
        if ($currentSlideV == 0) {
            $RevealInstance.slide($currentSlideH - 1, 0);
        } else {
            $RevealInstance.slide($currentSlideH, $currentSlideV - 1);
        }

        // Remove the slide the user requested for removal
        revealSlides.update((slides) => {
            slides[toRemoveH].splice(toRemoveV, 1);

            if (slides[toRemoveH].length == 0) {
                slides.splice(toRemoveH, 1);
            }

            return slides;
        });

        // Synchronize the Reveal instance
        setTimeout(() => {
            $RevealInstance.sync();
        }, 100);
    }

    onMount(() => {
        Reveal.initialize({
            // Display controls in the bottom right corner
            controls: true,
            // Display a presentation progress bar
            progress: true,
            // Push each slide change to the browser history
            history: false,
            // Enable keyboard shortcuts for navigation
            keyboard: true,
            // Enable the slide overview mode
            overview: false,
            // Vertical centering of slides
            center: true,
            // Should a help overlay be presented when the question mark key is pressed?
            help: false,
            // Should it be possible to pause the presentation?
            pause: false,
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
            embedded: false,
            // IMPORTANT: disable the default layout (centering and scaling) to make the code editors work correctly
            disableLayout: true,
        }).then(() => {
            Reveal.addEventListener("slidechanged", (e) => {
                console.log("Changed slide to ", e.indexh, e.indexv);
                $currentSlideH = e.indexh;
                $currentSlideV = e.indexv;
            });

            $RevealInstance = Reveal;
        });
    });
</script>

<div
    class="h-screen full-page-demo reveal-viewport"
    data-page="icp"
    style="box-sizing: border-box; width: 100%; height: 100%; transition: transform 0.8s ease 0s;"
>
    <div class="transition-all absolute top-0 right-0 p-4 z-50 {$currentSlideH == 0 ? 'opacity-0' : 'opacity-100'}" on:click={removeCurrentSlide}>
        <img class="cursor-pointer scale-75" src="{TrashSVG}" alt="Delete the current slide" />
    </div>
    <div
        class="reveal slide focused has-horizontal-slides ready"
        role="application"
        data-transition-speed="default"
        data-background-transition="fade"
    >
        <div class="slides">
            {#each $revealSlides as verticalSlides, index (index)}
                <section>
                    {#each verticalSlides as slide (slide.id)}
                        {#if slide.layout == Layouts.BODY}
                            <LayoutBody bind:slide={slide} />
                        {:else if slide.layout == Layouts.MAIN}
                            <LayoutMain bind:slide={slide} />
                        {:else if slide.layout == Layouts.COLUMNS}
                            <LayoutColumns bind:slide={slide} />
                        {/if}
                    {/each}
                </section>
            {/each}
        </div>
    </div>
</div>
