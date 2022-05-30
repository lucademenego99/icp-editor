<script lang="ts">
    import { onMount } from "svelte";
    import SelectElement from "../SelectElement.svelte";

    let body: HTMLDivElement;

    let isContentUndefined = true;

    function setElement(value: number) {
        isContentUndefined = false;
        if (value == 1) {
            // Create a p element and append it to the body
            const p = document.createElement("p");
            p.innerHTML = "Hello World";
            p.contentEditable = "true";
            body.appendChild(p);
        } else if (value == 2) {
            // Create a p element and append it to the body
            const container = document.createElement("div");
            container.style.height = "100%";
            container.style.width = "100%";
            container.innerHTML = `
<base-editor contenteditable="true" language="python" theme="dark" type="vertical" style="height: 100%;" code="print('Write your code here!')" />
            `;
            body.appendChild(container);
        }
    }

    onMount(() => {});
</script>

<section>
    <!-- title class: custom style for titles -->
    <h3 class="title" contenteditable="true">Write your title here</h3>

    <div
        bind:this={body}
        style="width: 80%; height: 80%; display: flex; justify-content: center; align-items: center;"
        class={isContentUndefined ? "undefined" : ""}
    >
        {#if isContentUndefined}
            <SelectElement onSelect={setElement} />
        {:else}
            <div />
        {/if}
    </div>
</section>

<style>
    p {
        font-size: 2.5vmin;
    }

    .undefined {
        border: 4px solid #aa2233;
    }
</style>
