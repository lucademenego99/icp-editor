<script lang="ts">
    import {
        revealSlides,
        RevealInstance,
        showOverview,
        currentSlideH,
        currentSlideV,
        darkTheme,
    } from "../../stores";
    import interact from "interactjs";
    import { onMount } from "svelte";
    import Close from "../icons/Close.svelte";
    import { v4 as uuidv4 } from "uuid";
    import type { Slide } from "../../classes/Slide";

    const position = { x: 0, y: 0 };

    let slides: Slide[][] = [[]];
    const slideHeight = 540;
    const slideWidth = 960;

    function moveToSlide(h, v) {
        $RevealInstance.slide(h, v);
        currentSlideH.set(h);
        currentSlideV.set(v);
        setTimeout(() => {
            $RevealInstance.sync();
        }, 150);
    }

    $: {
        if ($showOverview == false && $RevealInstance) {
            slides = $revealSlides;
        }
    }

    function removeOverview() {
        moveToSlide(0, 0);
        revealSlides.set([...slides]);
        showOverview.set(false);
    }

    function startDrag(event) {
        event.target.classList.add("draggable");
    }

    onMount(() => {
        interact(".draggable")
            .draggable({
                manualStart: true,
                listeners: {
                    move(event) {
                        // We need to divide it by 0.3 since the element is scaled
                        position.x += event.dx / 0.3;
                        position.y += event.dy / 0.3;
                        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;

                        const places =
                            document.querySelectorAll(".move-slide-bar");
                        for (let place of places) {
                            if (place) {
                                const rect = place.getBoundingClientRect();
                                let toAddX = 0,
                                    toAddY = 0;
                                if (rect.right - rect.left > 20) {
                                    toAddY = 30;
                                } else {
                                    toAddX = 30;
                                }

                                if (
                                    event.clientX > rect.left - toAddX &&
                                    event.clientX < rect.right + toAddX &&
                                    event.clientY > rect.top - toAddY &&
                                    event.clientY < rect.bottom + toAddY
                                ) {
                                    place.classList.remove("opacity-0");
                                } else {
                                    place.classList.add("opacity-0");
                                }
                            }
                        }
                    },
                },
            })
            .on("move", (event) => {
                var interaction = event.interaction;

                // if the pointer was moved while being held down
                // and an interaction hasn't started yet
                console.log(event.target.tagName);
                if (
                    event.target.tagName == "SECTION" &&
                    interaction.pointerIsDown &&
                    !interaction.interacting()
                ) {
                    var original = event.target,
                        // create a clone of the target element
                        clone = event.target.cloneNode(true);

                    // insert the clone to the page
                    original.parentNode.appendChild(clone);

                    // Remove default transition
                    clone.style.transition = "unset";
                    position.y = new WebKitCSSMatrix(
                        getComputedStyle(original).transform
                    ).f;

                    // start a drag interaction targeting the clone
                    interaction.start(
                        { name: "drag" },
                        event.interactable,
                        clone
                    );
                }
            })
            .on("dragend", (event) => {
                // Reset position
                position.x = 0;
                position.y = 0;

                const oldIndexH = parseInt(event.target.getAttribute("data-h"));
                const oldIndexV = parseInt(event.target.getAttribute("data-v"));

                // Remove the cloned element from the DOM
                event.target.remove();

                const places = document.querySelectorAll(".move-slide-bar");
                for (let place of places) {
                    if (!place.classList.contains("opacity-0")) {
                        place.classList.add("opacity-0");

                        // Get new index
                        const newIndexH = parseInt(
                            place.getAttribute("data-h")
                        );
                        const newIndexV = parseInt(
                            place.getAttribute("data-v")
                        );
                        const direction = place.getAttribute("data-direction");
                        console.log(
                            "Moving slide {" +
                                oldIndexH +
                                "-" +
                                oldIndexV +
                                "} to {" +
                                newIndexH +
                                "-" +
                                newIndexV +
                                "}" +
                                "  direction " +
                                direction
                        );

                        // Check if oldIndexH is not NaN
                        if (
                            !isNaN(oldIndexH) &&
                            !isNaN(oldIndexV) &&
                            !isNaN(newIndexH) &&
                            !isNaN(newIndexV) &&
                            !(
                                oldIndexH == newIndexH &&
                                oldIndexV == newIndexV - 1
                            ) &&
                            !(oldIndexH == newIndexH && newIndexV == 0)
                        ) {
                            // Move the slide to the new position
                            const oldSlide = slides[oldIndexH][oldIndexV];
                            slides[oldIndexH].splice(oldIndexV, 1);
                            if (direction == "horizontal") {
                                slides.splice(newIndexH, 0, [oldSlide]);
                            } else {
                                const isSplicedV =
                                    oldIndexV < newIndexV &&
                                    oldIndexH == newIndexH;
                                oldSlide.indexV =
                                    newIndexV - Number(isSplicedV);
                                slides[newIndexH].splice(
                                    newIndexV - Number(isSplicedV),
                                    0,
                                    oldSlide
                                );
                            }
                            if (slides[oldIndexH].length == 0) {
                                slides.splice(oldIndexH, 1);
                            } else if (
                                slides[oldIndexH + 1] &&
                                slides[oldIndexH + 1].length == 0
                            ) {
                                slides.splice(oldIndexH + 1, 1);
                            }

                            // Loop through all slides and update their index
                            for (let i = 0; i < slides.length; i++) {
                                for (let j = 0; j < slides[i].length; j++) {
                                    if (
                                        slides[i][j].indexH != i ||
                                        slides[i][j].indexV != j
                                    ) {
                                        slides[i][j].id = uuidv4();
                                        slides[i][j].indexH = i;
                                        slides[i][j].indexV = j;
                                    }
                                }
                            }

                            let newSlides = [];
                            for (let i = 0; i < slides.length; i++) {
                                newSlides.push([]);
                                for (let j = 0; j < slides[i].length; j++) {
                                    newSlides[i].push(slides[i][j]);
                                }
                            }
                            slides = [...newSlides];
                        }
                    }
                }
            });
    });

    // Set showOverview to false on esc key
    function handleKeyDown(event) {
        if (event.key == "Escape" && $showOverview) {
            removeOverview();
        }
    }
</script>

<svelte:window on:keydown={handleKeyDown} />
<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {$showOverview
        ? ''
        : 'hidden'}"
>
    <div
        class="w-[95%] h-[95%] relative bg-primary rounded-lg flex flex-col justify-evenly items-center"
    >
        <div
            class="transition-all absolute right-5 top-5 scale-110 cursor-pointer z-50 hover:scale-125"
            on:click={removeOverview}
        >
            <Close color={$darkTheme ? 'white' : 'black'} />
        </div>
        <div class="w-full h-full overflow-auto flex mx-10" style="">
            <div
                class="reveal slide embedded focused has-horizontal-slides has-vertical-slides ready"
                role="application"
                data-transition-speed="default"
                data-background-transition="fade"
            >
                <div class="slides-viewport arrange-mode">
                    <div class="slides">
                        {#each slides as verticalSlides, indexH (indexH)}
                            <div
                                data-h={indexH + 1}
                                data-v={0}
                                data-direction="horizontal"
                                class="transition-opacity opacity-0 move-slide-bar absolute h-full w-[5px] bg-blue-500"
                                style="transform: translate3d({(indexH + 1) *
                                    (slideWidth + 50) -
                                    27.5}px, 0px, 0px)"
                            />
                            <section
                                class="stack present"
                                style="transform: translate3d({indexH *
                                    (slideWidth + 50)}px, 0px, 0px);"
                            >
                                <div
                                    data-h={indexH}
                                    data-v={0}
                                    data-direction="vertical"
                                    class="transition-opacity opacity-0 move-slide-bar absolute w-[90%] h-[5px] bg-blue-500"
                                    style="transform: translate3d(0px, {-slideHeight /
                                        2 -
                                        27.5}px, 0px)"
                                />
                                {#each verticalSlides as slide, indexV (slide.id)}
                                    <section
                                        data-h={indexH}
                                        data-v={indexV}
                                        on:mousedown={startDrag}
                                        style="transform: translate3d(0px, {indexV *
                                            (slideHeight + 50)}px, 0px);"
                                    >
                                        {@html slide.getOverview($darkTheme)}
                                    </section>
                                    <div
                                        data-h={indexH}
                                        data-v={indexV + 1}
                                        data-direction="vertical"
                                        class="transition-opacity opacity-0 move-slide-bar absolute w-[90%] h-[5px] bg-blue-500"
                                        style="transform: translate3d(0px, {indexV *
                                            (slideHeight + 50) +
                                            (slideHeight / 2 + 27.5)}px, 0px)"
                                    />
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
        border: 2px solid rgb(116, 116, 116);
        pointer-events: all !important;
        cursor: grab;
        z-index: 99;
        display: block !important;
        visibility: visible !important;
    }
</style>
