<script lang="ts">
    import { Types } from "../../types";
    import Text from "../icons/Text.svelte";
    import Code from "../icons/Code.svelte";
    import Image from "../icons/Image.svelte";
    import ImageAlt from "../modals/ImageAlt.svelte";

    export let onSelect: (
        value: Types,
        image: string,
        imageAlt: string
    ) => void;

    let showImageAltDialog = false;

    let imageBase64: string;

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
