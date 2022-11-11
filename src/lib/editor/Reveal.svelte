<!-- Initialize reveal -->
<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import Reveal from "reveal.js";

    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";

    import Trash from "../icons/Trash.svelte";

    import {
        RevealInstance,
        revealSlides,
        currentSlideH,
        currentSlideV,
        currentLanguage,
        showOverview,
        darkTheme
    } from "../../stores";
    import { Layouts } from "../../types";
    import Close from "../icons/Close.svelte";
    import { Slide } from "../../classes/Slide";

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
            theme: $darkTheme ? "blood" : "white",
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

    const newSlide = () => {
        $revealSlides = [
            ...$revealSlides,
            [
                new Slide(
                    $revealSlides.length,
                    0,
                    $currentLanguage,
                    Layouts.BODY
                ),
            ],
        ];
        $RevealInstance.sync();
        setTimeout(() => {
            $RevealInstance.slide($revealSlides.length - 1, 0);
        }, 50);
    };

    const newVerticalSlide = () => {
        const newSlides = [...$revealSlides];
        newSlides[$currentSlideH].push(
            new Slide(
                $currentSlideH,
                newSlides[$currentSlideH].length,
                $currentLanguage,
                Layouts.BODY
            )
        );
        $revealSlides = newSlides;
        $RevealInstance.sync();
        setTimeout(() => {
            $RevealInstance.slide(
                $currentSlideH,
                newSlides[$currentSlideH].length - 1
            );
        }, 50);
    };
</script>

<div class="absolute top-[-25px] right-[calc(50%-60px)] btn-shadow w-[120px] h-[50px] rounded-lg" on:click={() => {revealSlides.set([...$revealSlides]);
    showOverview.set(true);}}>
    Overview
</div>
<div class="absolute right-[-25px] top-[calc(50%-25px)] btn-shadow w-[50px] h-[50px]" on:click={newSlide}>
    <Close customClass="rotate-45" color="#dfdfdf" />
</div>
<div class="absolute bottom-[-25px] right-[calc(50%-25px)] rounded-full bg-primary btn-shadow w-[50px] h-[50px] z-50" on:click={newVerticalSlide}>
    <Close customClass="rotate-45" color="#dfdfdf" />
</div>
<div
    class="h-screen full-page-demo reveal-viewport"
    data-page="icp"
    style="box-sizing: border-box; width: 100%; height: 100%; transition: transform 0.8s ease 0s;"
>
    <div
        class="transition-all absolute top-0 right-0 p-4 z-40 {$currentSlideH ==
        0
            ? 'opacity-0'
            : 'opacity-100'}"
        on:click={removeCurrentSlide}
    >
        <Trash customClass="cursor-pointer scale-75" />
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
                            <LayoutBody bind:slide />
                        {:else if slide.layout == Layouts.MAIN}
                            <LayoutMain bind:slide />
                        {:else if slide.layout == Layouts.COLUMNS}
                            <LayoutColumns bind:slide />
                        {/if}
                    {/each}
                </section>
            {/each}
        </div>
    </div>
</div>
