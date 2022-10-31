<script lang="ts">
    import { revealSlides } from "../../stores";

    export let show: boolean = false;
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
                            <section
                                class="stack present"
                                style="transform: translate3d({indexH *
                                    1020}px, 0px, 0px);"
                            >
                                {#each verticalSlides as slide, indexV}
                                    <section
                                        style="transform: translate3d(0px, {indexV *
                                            580}px, 0px);"
                                    >
                                        {@html slide.html
                                            ? slide.getHtml()
                                            : ""}
                                    </section>
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
        border: 2px solid white;
        pointer-events: all !important;
        cursor: grab;
        z-index: 99;
        display: block !important;
        visibility: visible !important;
    }
</style>
