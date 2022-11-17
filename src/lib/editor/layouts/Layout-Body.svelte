<script lang="ts">
    import type { Slide } from "../../../classes/Slide";
    import SelectElement from "../SelectElement.svelte";
    import { currentSlideH, currentSlideV } from "../../../stores";
    import { Types } from "../../../types";
    import Icp from "../ICP.svelte";
    import QuillEditor from "../QuillEditor.svelte";
    import Image from "../Image.svelte";
    import BodyTemplate from "../../../classes/templates/BodyTemplate";

    /**
     * @param {Slide} slide - The slide to be rendered
     */
    export let slide: Slide;

    /**
     * Main content of this layout
     */
    let body: HTMLDivElement;

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

    /**
     * Choose the element that will compose the slide
     * @param {Types} value - The type of the element
     * @param {string} image - the encoded image, if type was Image
     * @param {string} alt - the alt text for the image, if type was Image
     */
    async function setElement(
        value: Types,
        image: string,
        alt: string
    ): Promise<void> {
        // Assert that slide.template is an instanceof BodyTemplate
        if (!(slide.template instanceof BodyTemplate)) {
            throw new Error(
                "slide.template is not an instance of BodyTemplate"
            );
        }

        slide.template.bodyType = value;
        if (slide.template.bodyType == Types.IMAGE) {
            slide.template.encodedImage = image;
            slide.template.imageAlt = alt;
        }
    }
</script>

{#if slide.template instanceof BodyTemplate}
    <section class={slideState()}>
        <h3
            class="title"
            contenteditable="true"
            bind:textContent={slide.template.title}
        />

        <div
            bind:this={body}
            style="width: 80%; height: 80%; display: flex; flex-direction: column; overflow: auto; font-size: 2rem; {slide
                .template.bodyType == Types.TEXT
                ? 'text-align: start;'
                : 'justify-content: center; align-items: center;'}"
            class={slide.template.bodyType == undefined
                ? "border-solid border-2 border-[#aa2233]"
                : ""}
        >
            {#if slide.template.bodyType == undefined}
                <SelectElement onSelect={setElement} />
            {:else if slide.template.bodyType == Types.TEXT}
                <QuillEditor
                    bind:text={slide.template.text}
                    bind:quillDelta={slide.template.quillDelta}
                    boundsParent={body}
                />
            {:else if slide.template.bodyType == Types.CODE}
                <Icp template={slide.template} />
            {:else if slide.template.bodyType == Types.IMAGE}
                <Image
                    removeImage={() => {
                        if (slide.template instanceof BodyTemplate) {
                            slide.template.bodyType = undefined;
                            slide.template.encodedImage = "";
                        }
                    }}
                    encodedImage={slide.template.encodedImage}
                    bind:imageAlt={slide.template.imageAlt}
                />
            {/if}
        </div>
    </section>
{/if}
