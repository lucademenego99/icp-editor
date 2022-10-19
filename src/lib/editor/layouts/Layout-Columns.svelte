<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";
    import SelectElement from "../SelectElement.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";

    export let slide: Slide;

    let col1: HTMLDivElement;
    let col2: HTMLDivElement;

    let col1Type: Types | undefined, col2Type: Types | undefined;

    function setElement(value: Types, col: HTMLDivElement) {
        if (col == col1) {
            col1Type = value;
        } else if (col == col2) {
            col2Type = value;
        }
    }
</script>

<section bind:this={slide.html} class="{slide.indexH == $currentSlideH && slide.indexV == $currentSlideV ? 'present' : 'future'}">
    <h3 class="title" contenteditable="true">Title</h3>

    <div class="w-[80%] h-[80%] flex flex-row justify-center items-center">
        <div
            bind:this={col1}
            class="w-full h-full overflow-auto flex-1"
            style="flex: 1;"
        >
            <div
                class="w-full h-full flex justify-center items-center box-border {col1Type == undefined
                    ? 'w-full h-full border-2 border-[#aa2233]'
                    : ''}"
            >
                {#if col1Type == undefined}
                    <SelectElement
                        onSelect={(value) => setElement(value, col1)}
                    />
                {:else if col1Type == Types.TEXT}
                    <p contenteditable="true" class="editable text-3xl">Text</p>
                {:else if col1Type == Types.CODE}
                    <Icp language={slide.language} />
                {/if}
            </div>
        </div>
        <div
            bind:this={col2}
            class="w-full h-full overflow-auto flex-1"
            style="flex: 1;"
        >
            <div
                class="w-full h-full flex justify-center items-center box-border {col2Type == undefined
                    ? 'w-full h-full border-2 border-[#aa2233]'
                    : ''}"
            >
                {#if col2Type == undefined}
                    <SelectElement
                        onSelect={(value) => setElement(value, col2)}
                    />
                {:else if col2Type == Types.TEXT}
                    <p contenteditable="true" class="editable text-3xl">Text</p>
                {:else if col2Type == Types.CODE}
                    <Icp language={slide.language} />
                {/if}
            </div>
        </div>
    </div>
</section>
