<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import SelectElement from "../SelectElement.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";
    import QuillEditor from "../QuillEditor.svelte";

    export let slide: Slide;

    let body: HTMLDivElement;

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

    async function setElement(
        value: Types,
        image: string,
        alt: string
    ): Promise<void> {
        slide.template.bodyType = value;
        if (slide.template.bodyType == Types.IMAGE) {
            slide.template.encodedImage = image;
            slide.template.imageALt = alt;
        }
    }
</script>

<section bind:this={slide.template.html} class={slideState()}>
    <!-- title class: custom style for titles -->
    <h3 class="title" contenteditable="true" bind:textContent={slide.template.title}></h3>

    <div
        bind:this={body}
        style="width: 80%; height: 80%; display: flex; flex-direction: column; overflow: auto; font-size: 2rem; {slide.template.bodyType ==
        Types.TEXT
            ? 'text-align: start;'
            : 'justify-content: center; align-items: center;'}"
        class={slide.template.bodyType == undefined
            ? "border-solid border-2 border-[#aa2233]"
            : ""}
    >
        {#if slide.template.bodyType == undefined}
            <SelectElement onSelect={setElement} />
        {:else if slide.template.bodyType == Types.TEXT}
            <QuillEditor bind:text={slide.template.text} bind:quillDelta={slide.template.quillDelta} boundsParent={body} />
        {:else if slide.template.bodyType == Types.CODE}
            <Icp {slide} bind:code={slide.template.code} />
        {:else if slide.template.bodyType == Types.IMAGE}
            <img
                src={slide.template.encodedImage}
                alt={slide.template.imageAlt}
                style="width: 100%; height: 100%; object-fit: contain; margin: 0; padding: 0;"
            />
        {/if}
    </div>
</section>

