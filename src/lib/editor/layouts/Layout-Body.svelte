<script lang="ts">
    import type { Slide } from "src/classes/Slide";
    import { onMount } from "svelte";
    import SelectElement from "../SelectElement.svelte";

    export let slide: Slide;

    let body: HTMLDivElement;

    let isContentUndefined = true;

    function setElement(value: number) {
        isContentUndefined = false;
        if (value == 1) {
            // Create a p element and append it to the body
            const p = document.createElement("p");
            p.innerHTML = "Text";
            p.contentEditable = "true";
            p.classList.add("editable", "text-3xl");
            body.appendChild(p);
        } else if (value == 2) {
            // Create a p element and append it to the body
            const container = document.createElement("div");
            container.style.height = "100%";
            container.style.width = "100%";
            container.innerHTML = `
<python-editor contenteditable="true" theme="dark" type="vertical" code="print(&quot;ciao&quot;);" style="height: 100%;" />
            `;
            container.addEventListener("changedcode", (e: any) => {
                console.log(e);
                slide.code = e.detail.output;
            });
            body.appendChild(container);
        }
    }

    onMount(() => {});
</script>

<section bind:this={slide.html} class="future">
    <!-- title class: custom style for titles -->
    <h3 class="title" contenteditable="true">Title</h3>

    <div
        bind:this={body}
        class="w-[80%] h-[80%] flex justify-center items-center overflow-auto {isContentUndefined
            ? 'border-solid border-2 border-[#aa2233]'
            : ''}"
    >
        {#if isContentUndefined}
            <SelectElement onSelect={setElement} />
        {:else}
            <div />
        {/if}
    </div>
</section>
