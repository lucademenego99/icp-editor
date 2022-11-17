<script lang="ts">
    import { onMount } from "svelte";

    /**
     * @param {HTMLDivElement} boundsParent - HTML element defining the actual bounds of the editor
     */
    export let boundsParent: HTMLDivElement;

    /**
     * @param {Delta} quillDelta - A Quill Delta object containing the initial text for the editor
    */
    export let quillDelta: any;

    /**
     * @param {string} text - HTML text defining the editor's state
     */
    export let text: string;

    /**
     * Html element that will contain the Quill editor
     */
    let textBody: HTMLDivElement;

    onMount(async () => {
        // Dynamically import quill
        const { default: Quill } = await import("quill");

        // Set styles to inline instead of class
        const ColorClass = Quill.import("attributors/style/color");
        const SizeStyle = Quill.import("attributors/style/size");
        const backgroundClass = Quill.import("attributors/style/background");
        Quill.register(ColorClass, true);
        Quill.register(SizeStyle, true);
        Quill.register(backgroundClass, true);

        // Create the editor
        const quill = new Quill(textBody, {
            theme: "bubble", // Minimal UI - no always-visible toolbar on top
            bounds: boundsParent, // Set bigger outer bounds to make the toolbar be always completely visible
            modules: {
                // Custom toolbar with:
                // - header 2 for semi-title
                // - bold, italic and underline styles
                // - font and background color
                // - quote
                // - code block
                // - link
                // - button to clean the style
                toolbar: [
                    [{ header: "2" }, "bold", "italic", "underline"],
                    [{ color: [] }, { background: [] }],
                    ["blockquote", "code-block", "link"],
                    ["clean"],
                ],
            },
        });
        // If a delta is defined, set the initial content of the editor. Otherwise set it to "Your text..."
        if (quillDelta) quill.setContents(quillDelta);
        else quill.setText("Your text...");
        quill.on("text-change", (_data, _oldContents, _source) => {
            // When the text changes update the text variable containing the Quill HTML and the Quill Delta
            text = quill.root.innerHTML;
            quillDelta = quill.getContents();
        });
    });
</script>

<div
    style="width: 100%; padding: 0 8%; box-sizing: border-box; font-size: 25px !important"
    bind:this={textBody}
/>

<style>
    /* Import needed CSS for the Quill editor from the CDN */
    @import "../../styles/quill.bubble.css";
</style>
