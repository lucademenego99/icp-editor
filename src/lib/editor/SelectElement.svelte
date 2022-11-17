<script lang="ts">
    import { Types } from "../../types";
    import Text from "../icons/Text.svelte";
    import Code from "../icons/Code.svelte";
    import Image from "../icons/Image.svelte";
    import ImageAlt from "../modals/ImageAlt.svelte";

    /**
     * @param {(Types, string, string) => void} onSelect - Function called when an element is selected
     */
    export let onSelect: (
        value: Types,
        image: string,
        imageAlt: string
    ) => void;

    /**
     * Whether the image ALT dialog should be shown or not
     */
    let showImageAltDialog = false;

    /**
     * Image encoded in base64
     */
    let imageBase64: string;

    /**
     * Prepare a dialog for the user to select an image
     * When the image is selected, a dialog is shown to let the user input the ALT text
     */
    function inputImage() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                showImageAltDialog = true;
                imageBase64 = reader.result as string;
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }
</script>

<ImageAlt
    show={showImageAltDialog}
    onConfirm={(imageAlt) => {
        onSelect(Types.IMAGE, imageBase64, imageAlt);
    }}
/>
<div class="flex flex-col">
    <p class="font-mono text-3xl m-0 p-0">Select an element</p>
    <div class="px-1 flex justify-center items-center box-border">
        <div
            class="flex-1 text-center cursor-pointer hover group"
            on:click={() => onSelect(Types.TEXT, "", "")}
        >
            <Text customClass="group-hover:bg-secondary" />
        </div>
        <div
            class="flex-1 text-center cursor-pointer hover group"
            on:click={() => onSelect(Types.CODE, "", "")}
        >
            <Code customClass="group-hover:bg-secondary" />
        </div>
        <div
            class="flex-1 text-center cursor-pointer hover group"
            on:click={inputImage}
        >
            <Image customClass="group-hover:bg-secondary" />
        </div>
    </div>
</div>
