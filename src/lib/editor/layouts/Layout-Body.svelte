<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import { onMount } from "svelte";
    import SelectElement from "../SelectElement.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";

    export let slide: Slide;

    let body: HTMLDivElement;

    let textBody: HTMLElement;

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

    async function setElement(value: Types): Promise<void> {
        bodyType = value;

        if (bodyType == Types.TEXT) {
            const { default: Quill } = await import("quill");
            var ColorClass = Quill.import('attributors/class/color');
            var SizeStyle = Quill.import('attributors/style/size');
            Quill.register(ColorClass, true);
            Quill.register(SizeStyle, true);

            new Quill(textBody, {
                theme: "bubble",
            });
        }
    }

    onMount(() => {});
</script>

<section bind:this={slide.html} class={slideState()}>
    {#if false}
        <p class="ql-editor"></p>
        <ul></ul>
    {/if}
    <!-- title class: custom style for titles -->
    <h3 class="title" contenteditable="true">Title</h3>

    <div
        bind:this={body}
        style="width: 80%; height: 80%; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: auto; font-size: 2rem;"
        class={bodyType == undefined
            ? "border-solid border-2 border-[#aa2233]"
            : ""}
    >
        {#if bodyType == undefined}
            <SelectElement onSelect={setElement} />
        {:else if bodyType == Types.TEXT}
            <div style="width: 100%; padding: 0 8%; box-sizing: border-box; font-size: 25px !important" bind:this={textBody}>Your text...</div>
        {:else if bodyType == Types.CODE}
            <Icp {slide} />
        {/if}
    </div>
</section>

<style>
    @import 'https://cdn.quilljs.com/1.3.6/quill.bubble.css';
</style>