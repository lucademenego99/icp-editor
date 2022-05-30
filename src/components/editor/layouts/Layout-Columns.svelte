<script lang="ts">
    import { onMount } from "svelte";
    import SelectElement from "../SelectElement.svelte";

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
            p.innerText = "Write your text here";
            p.contentEditable = "true";
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
<base-editor contenteditable="true" language="python" theme="dark" ${type} style="height: 100%;" code="print('Write your code here!')" />
            `;
            col.appendChild(container);
        }
    }

    onMount(() => {});
</script>

<section>
    <h3 class="title" contenteditable="true">Write your title here</h3>

    <div
        style="width: 80%; height: 80%; display: flex; justify-content: center; align-items: center"
    >
        <div class="row" style="width: 100%; height: 100%;">
            <div bind:this={col1} class="col" style="flex: 1;">
                <div
                    style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"
                    class={isContentCol1Undefined ? "undefined" : ""}
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
            <div bind:this={col2} class="col" style="flex: 1;">
                <div
                    style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"
                    class={isContentCol2Undefined ? "undefined" : ""}
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

<style>
    p {
        font-size: 2.5vmin;
    }

    .col {
        width: 100%;
        height: 100%;
    }

    .undefined {
        width: 100%;
        height: 100%;
        border: 4px solid #aa2233;
    }
</style>
