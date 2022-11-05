<script lang="ts">
    import ImageAlt from "../modals/ImageAlt.svelte";

    export let removeImage: () => void;
    export let encodedImage: string;
    export let imageAlt: string;

    let showImageAltDialog: boolean = false;
</script>

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
            class="transition-all font-semibold text-xl w-3/12 rounded-lg p-2 border-2 hover:bg-white hover:text-black"
            >Change ALT</button
        >
        <button
            on:click={removeImage}
            class="transition-all font-semibold text-xl w-3/12 rounded-lg p-2 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >Remove image</button
        >
    </div>
</div>
