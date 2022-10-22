<script lang="ts">
    import { onMount } from "svelte";
    import type { Slide } from "../../classes/Slide";

    export let slide: Slide;
    export let type: "vertical" | "normal" = "normal";

    let editorParent: HTMLDivElement;

    onMount(() => {
        editorParent.addEventListener("changedcode", (e: any) => {
            slide.code = e.detail.content;
        });
    });
</script>

<div bind:this={editorParent} style="width: 100%; height: 100%;">
{#if slide.language == "python"}
    <python-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{:else if slide.language == "javascript"}
    <javascript-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{:else if slide.language == "typescript"}
    <typescript-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{:else if slide.language == "java"}
    <java-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{:else if slide.language == "sql"}
    <sql-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{/if}
</div>