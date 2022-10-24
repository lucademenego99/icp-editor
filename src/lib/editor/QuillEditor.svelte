<script lang="ts">
    import { onMount } from "svelte";

    export let boundsParent: HTMLDivElement;

    let textBody: HTMLDivElement;

    onMount(async () => {
        const { default: Quill } = await import("quill");

        // Set styles to inline
        const ColorClass = Quill.import("attributors/style/color");
        const SizeStyle = Quill.import("attributors/style/size");
        const backgroundClass = Quill.import("attributors/style/background");
        Quill.register(ColorClass, true);
        Quill.register(SizeStyle, true);
        Quill.register(backgroundClass, true);

        // Create the editor
        new Quill(textBody, {
            theme: "bubble",    // Minimal UI - no always-visible toolbar on top
            bounds: boundsParent,   // Set bigger outer bounds to make the toolbar be always completely visible
            modules: {
                // Custom toolbar with:
                // - header 2 for semi-title
                // - bold, italic and underline styles
                // - font and background color
                // - quote
                // - code block
                // - link
                toolbar: [
                    [{ header: "2" }, "bold", "italic", "underline"],
                    [{ color: [] }, { background: [] }],
                    ["blockquote", "code-block", "link"],
                ],
            },
        });
    });
</script>

<div
    style="width: 100%; padding: 0 8%; box-sizing: border-box; font-size: 25px !important"
    bind:this={textBody}
>
    Your text...
</div>

<style>
    @import "https://cdn.quilljs.com/1.3.6/quill.bubble.css";
</style>
