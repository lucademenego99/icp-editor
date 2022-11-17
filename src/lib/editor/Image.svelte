<script lang="ts">
    import ImageAlt from "../modals/ImageAlt.svelte";

    /**
     * @param {() => void} removeImage - Function called when the image is removed
     */
    export let removeImage: () => void;

    /**
     * @param {string} encodedImage - Image encoded in base64
     */
    export let encodedImage: string;

    /**
     * @param {string} imageAlt - Alt text for the image
     */
    export let imageAlt: string;

    /**
     * Whether the image ALT dialog should be shown or not
     */
    let showImageAltDialog: boolean = false;
</script>

<!-- Modal for modifying the image ALT -->
<ImageAlt
    show={showImageAltDialog}
    alt={imageAlt}
    onConfirm={(alt) => {
        imageAlt = alt;
        showImageAltDialog = false;
    }}
/>
<div class="relative w-full h-full">
    <img
        src={encodedImage}
        alt={imageAlt}
        class="w-full h-full object-contain m-0 p-0"
    />
    <div
        class="transition-all opacity-0 absolute top-0 left-0 w-full h-full bg-black flex flex-col items-center justify-center gap-9 hover:opacity-80"
    >
        <button
            on:click={() => {
                showImageAltDialog = true;
            }}
            class="transition-all text-white font-semibold text-xl w-3/12 rounded-lg p-2 border-2 hover:bg-white hover:text-black"
            >Change ALT</button
        >
        <button
            on:click={removeImage}
            class="transition-all font-semibold text-xl w-3/12 rounded-lg p-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >Remove image</button
        >
    </div>
</div>
