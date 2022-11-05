<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";
    import SelectElement from "../SelectElement.svelte";
    import Image from "../Image.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";
    import { onMount } from "svelte";
    import QuillEditor from "../QuillEditor.svelte";
    import ColumnsTemplate from "../../../classes/templates/ColumnsTemplate"

    /**
     * @param {Slide} slide - The slide to be rendered
     */
    export let slide: Slide;

    /**
     * Quill instance that will contain the Quill framework
     */
    let QuillInstance;

    let col1: HTMLDivElement, col2: HTMLDivElement;
    let textBody1: HTMLElement, textBody2: HTMLElement;

    /**
     * On mount initialize the Quill library
    */
    onMount(async () => {
        const { default: Quill } = await import("quill");
        QuillInstance = Quill;
        var ColorClass = Quill.import("attributors/class/color");
        var SizeStyle = Quill.import("attributors/style/size");
        Quill.register(ColorClass, true);
        Quill.register(SizeStyle, true);
    });

    $: {
        if (
            slide.template instanceof ColumnsTemplate &&
            slide.template.column1 &&
            slide.template.column1.bodyType != undefined &&
            slide.template.column1.bodyType == Types.TEXT &&
            textBody1
        ) {
            // If the chosen element is a text editor, initialize the Quill framework
            new QuillInstance(textBody1, {
                theme: "bubble",
            });
        }
    }

    $: {
        if (
            slide.template instanceof ColumnsTemplate &&
            slide.template.column2 &&
            slide.template.column2.bodyType != undefined &&
            slide.template.column2.bodyType == Types.TEXT &&
            textBody2
        ) {
            // If the chosen element is a text editor, initialize the Quill framework
            new QuillInstance(textBody2, {
                theme: "bubble",
            });
        }
    }

    /**
     * Get the current slide state, between past, present and future
     * @returns {string} - The current slide state
     */
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
</script>

{#if slide.template instanceof ColumnsTemplate}
    <section class={slideState()}>
        <h3
            class="title"
            contenteditable="true"
            bind:textContent={slide.template.title}
        />

        <div
            style="width: 85%; height: 70%; display: flex; justify-content: space-around; align-items: center; gap: 2.5%"
        >
            <div
                bind:this={col1}
                style="width: 100%; height: 100%; overflow: auto; flex: 1 1 auto;"
            >
                <div
                    style="width: 100%; height: 100%; display: flex; flex-direction: column; box-sizing: border-box; {slide
                        .template.column1.bodyType == Types.TEXT
                        ? 'text-align: start;'
                        : 'justify-content: center; align-items: center;'}"
                    class={slide.template.column1.bodyType == undefined
                        ? "w-full h-full border-2 border-[#aa2233]"
                        : ""}
                >
                    {#if slide.template.column1.bodyType == undefined}
                        <SelectElement
                            onSelect={(value, image, alt) => {
                                if (slide.template instanceof ColumnsTemplate) {
                                    slide.template.column1.bodyType = value;
                                    if (
                                        slide.template.column1.bodyType ==
                                        Types.IMAGE
                                    ) {
                                        slide.template.column1.encodedImage =
                                            image;
                                        slide.template.column1.imageAlt = alt;
                                    }
                                }
                            }}
                        />
                    {:else if slide.template.column1.bodyType == Types.TEXT}
                        <QuillEditor
                            bind:text={slide.template.column1.text}
                            bind:quillDelta={slide.template.column1.quillDelta}
                            boundsParent={col1}
                        />
                    {:else if slide.template.column1.bodyType == Types.CODE}
                        <Icp template={slide.template.column1} />
                    {:else if slide.template.column1.bodyType == Types.IMAGE}
                        <Image
                            removeImage={() => {
                                if (slide.template instanceof ColumnsTemplate) {
                                    slide.template.column1.bodyType = undefined;
                                    slide.template.column1.encodedImage = "";
                                }
                            }}
                            encodedImage={slide.template.column1.encodedImage}
                            bind:imageAlt={slide.template.column1.imageAlt}
                        />
                    {/if}
                </div>
            </div>
            <div
                bind:this={col2}
                style="width: 100%; height: 100%; overflow: auto; flex: 1 1 auto;"
            >
                <div
                    style="width: 100%; height: 100%; display: flex; flex-direction: column; box-sizing: border-box; {slide
                        .template.column2.bodyType == Types.TEXT
                        ? 'text-align: start;'
                        : 'justify-content: center; align-items: center;'}"
                    class={slide.template.column2.bodyType == undefined
                        ? "w-full h-full border-2 border-[#aa2233]"
                        : ""}
                >
                    {#if slide.template.column2.bodyType == undefined}
                        <SelectElement
                            onSelect={(value, image, alt) => {
                                if (slide.template instanceof ColumnsTemplate) {
                                    slide.template.column2.bodyType = value;
                                    if (
                                        slide.template.column2.bodyType ==
                                        Types.IMAGE
                                    ) {
                                        slide.template.column2.encodedImage =
                                            image;
                                        slide.template.column2.imageAlt = alt;
                                    }
                                }
                            }}
                        />
                    {:else if slide.template.column2.bodyType == Types.TEXT}
                        <QuillEditor
                            bind:text={slide.template.column2.text}
                            bind:quillDelta={slide.template.column2.quillDelta}
                            boundsParent={col2}
                        />
                    {:else if slide.template.column2.bodyType == Types.CODE}
                        <Icp template={slide.template.column2} />
                    {:else if slide.template.column2.bodyType == Types.IMAGE}
                        <Image
                            removeImage={() => {
                                if (slide.template instanceof ColumnsTemplate) {
                                    slide.template.column2.bodyType = undefined;
                                    slide.template.column2.encodedImage = "";
                                }
                            }}
                            encodedImage={slide.template.column2.encodedImage}
                            bind:imageAlt={slide.template.column2.imageAlt}
                        />
                    {/if}
                </div>
            </div>
        </div>
    </section>
{/if}
