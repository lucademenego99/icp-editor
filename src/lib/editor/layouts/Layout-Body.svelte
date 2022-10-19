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

    function setElement(value: Types) {
        bodyType = value;
    }

    onMount(() => {});
</script>

<section
    bind:this={slide.html}
    class="{slide.indexH == $currentSlideH && slide.indexV == $currentSlideV ? 'present' : 'future'}"
>
    <!-- title class: custom style for titles -->
    <h3 class="title" contenteditable="true">Title</h3>

    <div
        bind:this={body}
        class="w-[80%] h-[80%] flex justify-center items-center overflow-auto {bodyType == undefined
            ? 'border-solid border-2 border-[#aa2233]'
            : ''}"
    >
        {#if bodyType == undefined}
            <SelectElement onSelect={(value) => setElement(value)} />
        {:else if bodyType == Types.TEXT}
            <p contenteditable="true" class="editable text-3xl">Text</p>
        {:else if bodyType == Types.CODE}
            <Icp language={slide.language} />
        {/if}
    </div>
</section>
