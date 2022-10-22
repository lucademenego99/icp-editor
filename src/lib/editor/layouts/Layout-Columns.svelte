<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";
    import SelectElement from "../SelectElement.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";
    import { onMount } from "svelte";

    export let slide: Slide;

    let QuillInstance;

    let col1: HTMLDivElement;
    let col2: HTMLDivElement;

    let col1Type: Types | undefined, col2Type: Types | undefined;
    let textBody1: HTMLElement, textBody2: HTMLElement;

    onMount(async () => {
        const { default: Quill } = await import("quill");
        QuillInstance = Quill;
        var ColorClass = Quill.import('attributors/class/color');
        var SizeStyle = Quill.import('attributors/style/size');
        Quill.register(ColorClass, true);
        Quill.register(SizeStyle, true);
    })

    $: {
        if (col1Type != undefined && col1Type == Types.TEXT && textBody1) {
            new QuillInstance(textBody1, {
                theme: "bubble",
            });
        }
    }

    $: {
        if (col2Type != undefined && col2Type == Types.TEXT && textBody2) {
            new QuillInstance(textBody2, {
                theme: "bubble",
            });
        }
    }

    function slideState(): string {
        let state: string;
        if (slide.indexH < $currentSlideH || (slide.indexH == $currentSlideH && slide.indexV < $currentSlideV)) {
            state = "past";
        } else if (slide.indexH == $currentSlideH && slide.indexV == $currentSlideV) {
            state = "present";
        } else {
            state = "future";
        }

        return state;
    }

    async function setElement(value: Types, col: HTMLDivElement) {
        if (col == col1) {
            col1Type = value;
        } else if (col == col2) {
            col2Type = value;
        }
    }
</script>

<section bind:this={slide.html} class="{slideState()}">
    <h3 class="title" contenteditable="true">Title</h3>

    <div style="width: 85%; height: 70%; display: flex; justify-content: space-around; align-items: center; gap: 2.5%">
        <div
            bind:this={col1}
            style="width: 100%; height: 100%; overflow: auto; flex: 1 1 auto;"
        >
            <div
                style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box;"
                class="{col1Type == undefined
                    ? 'w-full h-full border-2 border-[#aa2233]'
                    : ''}"
            >
                {#if col1Type == undefined}
                    <SelectElement
                        onSelect={(value) => setElement(value, col1)}
                    />
                {:else if col1Type == Types.TEXT}
                    <div style="width: 100%; padding: 0 8%; box-sizing: border-box; font-size: 25px !important" bind:this={textBody1}>Your text...</div>
                {:else if col1Type == Types.CODE}
                    <Icp {slide} />
                {/if}
            </div>
        </div>
        <div
            bind:this={col2}
            style="width: 100%; height: 100%; overflow: auto; flex: 1 1 auto;"
        >
            <div
                style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; box-sizing: border-box;"
                class="{col2Type == undefined
                    ? 'w-full h-full border-2 border-[#aa2233]'
                    : ''}"
            >
                {#if col2Type == undefined}
                    <SelectElement
                        onSelect={(value) => setElement(value, col2)}
                    />
                {:else if col2Type == Types.TEXT}
                    <div style="width: 100%; padding: 0 8%; box-sizing: border-box; font-size: 25px !important" bind:this={textBody2}>Your text...</div>
                {:else if col2Type == Types.CODE}
                    <Icp {slide} />
                {/if}
            </div>
        </div>
    </div>
</section>
