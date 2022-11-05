<script lang="ts">
    import { onMount } from "svelte";
    import type BodyTemplate from "../../classes/templates/BodyTemplate";

    /**
     * @param {BodyTemplate} template - The template that will contain the code editor
     */
    export let template: BodyTemplate;

    let editorParent: HTMLDivElement;

    /**
     * When the code changes, update the template
     */
    onMount(() => {
        editorParent.addEventListener("changedcode", (e: any) => {
            if (e.detail.content) {
                template.code = e.detail.content;
            }
        });
    });
</script>

<div bind:this={editorParent} style="width: 100%; height: 100%;">
    {#if template.language == "python"}
        <python-editor
            contenteditable="true"
            theme="dark"
            type="normal"
            code={template.code}
            style="height: 100%; width: 100%;"
        />
    {:else if template.language == "javascript"}
        <javascript-editor
            contenteditable="true"
            theme="dark"
            type="normal"
            code={template.code}
            style="height: 100%; width: 100%;"
        />
    {:else if template.language == "typescript"}
        <typescript-editor
            contenteditable="true"
            theme="dark"
            type="normal"
            code={template.code}
            style="height: 100%; width: 100%;"
        />
    {:else if template.language == "java"}
        <java-editor
            contenteditable="true"
            theme="dark"
            type="normal"
            code={template.code}
            style="height: 100%; width: 100%;"
        />
    {:else if template.language == "sql"}
        <sql-editor
            contenteditable="true"
            theme="dark"
            type="normal"
            code={template.code}
            style="height: 100%; width: 100%;"
        />
    {/if}
</div>
