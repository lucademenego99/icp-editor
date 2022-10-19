<script lang="ts">
    import type { Language } from "src/types";


    export let language: Language;
</script>

<div class="code-container">
{#if language == "python"}
    <python-editor
        contenteditable="true"
        theme="dark"
        type="vertical"
        code=""
        style="height: 100%;"
    />
{:else if language == "javascript"}
    <javascript-editor
        contenteditable="true"
        theme="dark"
        type="vertical"
        code=""
        style="height: 100%;"
    />
{:else if language == "typescript"}
    <typescript-editor
        contenteditable="true"
        theme="dark"
        type="vertical"
        code=""
        style="height: 100%;"
    />
{:else if language == "java"}
    <java-editor
        contenteditable="true"
        theme="dark"
        type="vertical"
        code=""
        style="height: 100%;"
    />
{:else if language == "sql"}
    <sql-editor
        contenteditable="true"
        theme="dark"
        type="vertical"
        code=""
        style="height: 100%;"
    />
{/if}
</div>

<style>
    .code-container {
        height: 100%;
        width: 100%;
    }
</style>