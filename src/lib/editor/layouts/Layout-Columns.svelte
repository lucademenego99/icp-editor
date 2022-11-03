<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";
    import SelectElement from "../SelectElement.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";
    import { onMount } from "svelte";
    import QuillEditor from "../QuillEditor.svelte";

    export let slide: Slide;

    let QuillInstance;

    let textBody1: HTMLElement, textBody2: HTMLElement;

    onMount(async () => {
        console.log(slide.template);
        const { default: Quill } = await import("quill");
        QuillInstance = Quill;
        var ColorClass = Quill.import('attributors/class/color');
        var SizeStyle = Quill.import('attributors/style/size');
        Quill.register(ColorClass, true);
        Quill.register(SizeStyle, true);
    })

    $: {
        if (slide.template.column1 && slide.template.column1.bodyType != undefined && slide.template.column1.bodyType == Types.TEXT && textBody1) {
            new QuillInstance(textBody1, {
                theme: "bubble",
            });
        }
    }

    $: {
        if (slide.template.column2 && slide.template.column2.bodyType != undefined && slide.template.column2.bodyType == Types.TEXT && textBody2) {
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

    async function setElement(value: Types, image: string, col: HTMLDivElement) {
        if (col == slide.template.column1) {
            slide.template.column1.bodyType = value;
            if (slide.template.column1.bodyType == Types.IMAGE) {
                slide.template.column1.encodedImage = image;
            }
        } else if (col == slide.template.column2) {
            slide.template.column2.bodyType = value;
            if (slide.template.column2.bodyType == Types.IMAGE) {
                slide.template.column2.encodedImage = image;
            }
        }
    }
</script>

<section class="{slideState()}" >
    <h3 class="title" contenteditable="true" bind:textContent={slide.template.title}></h3>

    <div style="width: 85%; height: 70%; display: flex; justify-content: space-around; align-items: center; gap: 2.5%">
        <div
            bind:this={slide.template.column1.html}
            style="width: 100%; height: 100%; overflow: auto; flex: 1 1 auto;"
        >
            <div
                style="width: 100%; height: 100%; display: flex; flex-direction: column; box-sizing: border-box; {slide.template.column1.bodyType == Types.TEXT ? 'text-align: start;' : 'justify-content: center; align-items: center;'}"
                class="{slide.template.column1.bodyType == undefined
                    ? 'w-full h-full border-2 border-[#aa2233]'
                    : ''}"
            >
                {#if slide.template.column1.bodyType == undefined}
                    <SelectElement
                        onSelect={(value, image) => setElement(value, image, slide.template.column1)}
                    />
                {:else if slide.template.column1.bodyType == Types.TEXT}
                    <QuillEditor bind:text={slide.template.column1.text} bind:quillDelta={slide.template.column1.quillDelta} boundsParent={slide.template.column1.html} />
                {:else if slide.template.column1.bodyType == Types.CODE}
                    <Icp {slide} bind:code={slide.template.column1.code} />
                {:else if slide.template.column1.bodyType == Types.IMAGE}
                    <img src={slide.template.column1.encodedImage} alt="{slide.template.column1.imageAlt}" style="width: 100%; height: 80%; object-fit: contain; margin: 10px 0;" />
                    <p class="caption" contenteditable="true" style="max-height: 20%; margin: 0; padding: 0; font-size: 18px;">Image Caption</p>
                {/if}
            </div>
        </div>
        <div
            bind:this={slide.template.column2.html}
            style="width: 100%; height: 100%; overflow: auto; flex: 1 1 auto;"
        >
            <div
                style="width: 100%; height: 100%; display: flex; flex-direction: column; box-sizing: border-box; {slide.template.column2.bodyType == Types.TEXT ? 'text-align: start;' : 'justify-content: center; align-items: center;'}"
                class="{slide.template.column2.bodyType == undefined
                    ? 'w-full h-full border-2 border-[#aa2233]'
                    : ''}"
            >
                {#if slide.template.column2.bodyType == undefined}
                    <SelectElement
                        onSelect={(value, image) => setElement(value, image, slide.template.column2)}
                    />
                {:else if slide.template.column2.bodyType == Types.TEXT}
                    <QuillEditor bind:text={slide.template.column2.text} bind:quillDelta={slide.template.column2.quillDelta} boundsParent={slide.template.column2.html} />
                {:else if slide.template.column2.bodyType == Types.CODE}
                    <Icp {slide} bind:code={slide.template.column2.code} />
                {:else if slide.template.column2.bodyType == Types.IMAGE}
                    <img src={slide.template.column2.encodedImage} alt="{slide.template.column2.imageAlt}" style="width: 100%; height: 80%; object-fit: contain; margin: 10px 0;" />
                    <p class="caption" contenteditable="true" style="max-height: 20%; margin: 0; padding: 0; font-size: 18px;">Image Caption</p>
                {/if}
            </div>
        </div>
    </div>
</section>
