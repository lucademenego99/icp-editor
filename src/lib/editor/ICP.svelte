<script lang="ts">
    import type { Language } from "src/types";

    export let language: Language;
    export let type: "vertical" | "normal" = "normal";
</script>

<div style="width: 100%; height: 100%;">
{#if language == "python"}
    <python-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{:else if language == "javascript"}
    <javascript-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{:else if language == "typescript"}
    <typescript-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{:else if language == "java"}
    <java-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{:else if language == "sql"}
    <sql-editor
        contenteditable="true"
        theme="dark"
        type={type}
        code=""
        style="height: 100%; width: 100%;"
    />
{/if}
</div>