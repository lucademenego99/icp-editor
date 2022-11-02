<script lang="ts">
    import { revealSlides } from "../../stores";
    import interact from 'interactjs';
    import { onMount } from "svelte";

    export let show: boolean = false;

    const position = { x: 0, y: 0 }
    let oldTranslateY = 0;

    const slideHeight = 540;
    const slideWidth = 960;

    function startDrag(event) {
        // const clone: HTMLElement = event.target.cloneNode(true);
        // clone.classList.add("draggable");

        event.target.classList.add("draggable");

    }

    onMount(() => {
        interact('.draggable').draggable({
            manualStart: true,
            listeners: {
                move(event) {
                    // We need to divide it by 0.3 since the element is scaled
                    position.x += event.dx / 0.3;
                    position.y += event.dy / 0.3;
                    // console.log(position.y);
                    event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                    console.log(event.target.style.transform);
                }
            }
        }).on('move', (event) => {
            var interaction = event.interaction;

            // if the pointer was moved while being held down
            // and an interaction hasn't started yet
            if (interaction.pointerIsDown && !interaction.interacting()) {
                var original = event.target,
                    // create a clone of the target element
                    clone = event.target.cloneNode(true);

                // Remove default transition
                clone.style.transition = "unset";
                position.y = clone.style.transform.split(",")[1].split("px")[0].trim().replace(/[^\d.]/g, '');

                // insert the clone to the page
                original.parentNode.appendChild(clone);

                // start a drag interaction targeting the clone
                interaction.start({ name: 'drag' }, event.interactable, clone);
            }
        }).on('dragend', (event) => {
            // Reset position
            position.x = 0;
            position.y = 0;

            // Remove the cloned element from the DOM
            event.target.remove();
        });
    })
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {show
        ? ''
        : 'hidden'}"
>
    <div
        class="w-5/6 h-5/6 bg-white bg-opacity-30 rounded-lg flex flex-col justify-evenly items-center"
    >
        <div class="w-full h-full overflow-auto flex mx-10" style="">
            <div
                class="reveal slide embedded focused has-horizontal-slides has-vertical-slides ready"
                role="application"
                data-transition-speed="default"
                data-background-transition="fade"
            >
                <div class="slides-viewport arrange-mode">
                    <div class="slides">
                        {#each $revealSlides as verticalSlides, indexH}
                        <div class="move-slide-bar absolute h-full w-[5px] bg-blue-500" style="transform: translate3d({indexH * (slideWidth + 50) - 27.5}px, 0px, 0px)"></div>
                            <section
                                class="stack present"
                                style="transform: translate3d({indexH *
                                    (slideWidth + 50)}px, 0px, 0px);"
                            >
                                {#each verticalSlides as slide, indexV}
                                    <section
                                        on:mousedown={startDrag}
                                        style="transform: translate3d(0px, {indexV *
                                            (slideHeight + 50)}px, 0px);"
                                    >
                                        {@html slide.html
                                            ? slide.getHtml()
                                            : ""}
                                    </section>
                                    <div class="move-slide-bar absolute w-[90%] h-[5px] bg-blue-500" style="transform: translate3d(0px, {(indexV * (slideHeight + 50)) + (slideHeight / 2 + 27.5)}px, 0px)"></div>
                                {/each}
                            </section>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .arrange-mode {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        overflow: auto;
        z-index: 2;
    }

    .reveal .slides {
        transform: scale(0.3) translate(-50%, -50%) scale(0.986615);
        width: 960px;
        height: 540px;
        inset: 50% auto auto 50%;
        top: 0 !important;
        left: 0 !important;
        right: auto !important;
        bottom: auto !important;
    }

    section section {
        position: absolute !important;
        border: 2px solid white;
        pointer-events: all !important;
        cursor: grab;
        z-index: 99;
        display: block !important;
        visibility: visible !important;
    }

    .move-slide-bar {
        
    }
</style>
