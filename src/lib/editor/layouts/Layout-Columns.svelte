<script lang="ts">
    import type { Slide } from "src/classes/Slide";
    import { onMount } from "svelte";
    import SelectElement from "../SelectElement.svelte";

    export let slide: Slide;

    let col1: HTMLDivElement;
    let col2: HTMLDivElement;

    let isContentCol1Undefined = true,
        isContentCol2Undefined = true;

    function setElement(value: number, col: HTMLDivElement) {
        if (col == col1) {
            isContentCol1Undefined = false;
        } else if (col == col2) {
            isContentCol2Undefined = false;
        }
        col.innerHTML = "";
        if (value == 1) {
            // Create a container that centers the text inside it horizontally and vertically
            const container = document.createElement("div");
            container.style.height = "100%";
            container.style.width = "100%";
            container.style.display = "flex";
            container.style.justifyContent = "center";
            container.style.alignItems = "center";
            // Create a p element and append it to the body
            const p = document.createElement("p");
            p.innerText = "Text";
            p.contentEditable = "true";
            p.classList.add("editable");
            container.appendChild(p);
            col.appendChild(container);
        } else if (value == 2) {
            // Create a p element and append it to the body
            const container = document.createElement("div");
            container.style.height = "100%";
            container.style.width = "100%";
            const type =
                col.clientHeight > col.clientWidth ? "" : "type='vertical'";
            container.innerHTML = `
<base-editor contenteditable="true" language="python" theme="dark" ${type} style="height: 100%; box-sizing: border-box;" code="print('Write your code!')" />
            `;
            col.appendChild(container);
        }
    }

    onMount(() => {});
</script>

<section bind:this={slide.html} class="future">
    <h3 class="title" contenteditable="true">Title</h3>

    <div class="w-[80%] h-[80%] flex justify-center items-center">
        <div class="w-full h-full">
            <div
                bind:this={col1}
                class="w-full h-full overflow-auto flex-1"
                style="flex: 1;"
            >
                <div
                    class="w-full h-full flex justify-center items-center box-border {isContentCol1Undefined
                        ? 'w-full h-full border-2 border-[#aa2233]'
                        : ''}"
                >
                    {#if isContentCol1Undefined}
                        <SelectElement
                            onSelect={(value) => setElement(value, col1)}
                        />
                    {:else}
                        <div />
                    {/if}
                </div>
            </div>
            <div
                bind:this={col2}
                class="w-full h-full overflow-auto flex-1"
                style="flex: 1;"
            >
                <div
                    class="w-full h-full flex justify-center items-center box-border {isContentCol2Undefined
                        ? 'w-full h-full border-2 border-[#aa2233]'
                        : ''}"
                >
                    {#if isContentCol2Undefined}
                        <SelectElement
                            onSelect={(value) => setElement(value, col2)}
                        />
                    {:else}
                        <div />
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>
