<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import { onMount } from "svelte";
    import SelectElement from "../SelectElement.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";

    export let slide: Slide;

    let body: HTMLDivElement;

    let bodyType: Types | undefined;

    function slideState(): string {
        let state: string;
        if (
            slide.indexH < $currentSlideH ||
            (slide.indexH == $currentSlideH && slide.indexV < $currentSlideV)
        ) {
            state = "past";
        } else if (
            slide.indexH == $currentSlideH &&
            slide.indexV == $currentSlideV
        ) {
            state = "present";
        } else {
            state = "future";
        }

        return state;
    }

    function setElement(value: Types): void {
        bodyType = value;
    }

    onMount(() => {});
</script>

<section bind:this={slide.html} class={slideState()}>
    <!-- title class: custom style for titles -->
    <h3 class="title" contenteditable="true">Title</h3>

    <div
        bind:this={body}
        style="width: 80%; height: 80%; display: flex; justify-content: center; align-items: center; overflow: auto"
        class={bodyType == undefined
            ? "border-solid border-2 border-[#aa2233]"
            : ""}
    >
        {#if bodyType == undefined}
            <SelectElement onSelect={setElement} />
        {:else if bodyType == Types.TEXT}
            <p contenteditable="true" class="editable text-3xl">Text</p>
        {:else if bodyType == Types.CODE}
            <Icp {slide} />
        {/if}
    </div>
</section>
