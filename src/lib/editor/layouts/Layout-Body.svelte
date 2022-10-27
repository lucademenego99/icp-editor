<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import SelectElement from "../SelectElement.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";
    import QuillEditor from "../QuillEditor.svelte";

    export let slide: Slide;
    export let isOverview: boolean = false;

    let body: HTMLDivElement;

    let bodyType: Types | undefined;

    let encodedImage: string, imageAlt: string;

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
        bodyType = value;
        if (bodyType == Types.IMAGE) {
            encodedImage = image;
            imageAlt = alt;
        }
    }
</script>

<section bind:this={slide.html} class={slideState()} style="{isOverview ? 'all: unset !important; border: 3px solid black;' : ''}">
    <!-- title class: custom style for titles -->
    <h3 class="title" contenteditable="true">Title</h3>

    <div
        bind:this={body}
        style="width: 80%; height: 80%; display: flex; flex-direction: column; overflow: auto; font-size: 2rem; {bodyType ==
        Types.TEXT
            ? 'text-align: start;'
            : 'justify-content: center; align-items: center;'}"
        class={bodyType == undefined
            ? "border-solid border-2 border-[#aa2233]"
            : ""}
    >
        {#if bodyType == undefined}
            <SelectElement onSelect={setElement} />
        {:else if bodyType == Types.TEXT}
            <QuillEditor boundsParent={body} />
        {:else if bodyType == Types.CODE}
            <Icp {slide} />
        {:else if bodyType == Types.IMAGE}
            <img
                src={encodedImage}
                alt={imageAlt}
                style="width: 100%; height: 100%; object-fit: contain; margin: 0; padding: 0;"
            />
        {/if}
    </div>
</section>
