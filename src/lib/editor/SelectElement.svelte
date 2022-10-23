<script lang="ts">
    import { Types } from "../../types";
    import textSVG from "../../assets/Text.svg?url";
    import codeSVG from "../../assets/Code.svg?url";
    import imageSVG from "../../assets/Image.svg?url";
    import ImageAlt from "../modals/ImageAlt.svelte";

    export let onSelect: (value: Types, image: string, imageAlt: string) => void;

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

<ImageAlt show={showImageAltDialog} onConfirm={(imageAlt) => {onSelect(Types.IMAGE, imageBase64, imageAlt)}} />
<div class="flex flex-col">
    <p class="font-mono text-3xl m-0 p-0">Select an element</p>
    <div class="px-1 flex justify-center items-center box-border">
        <div class="flex-1 text-center cursor-pointer hover group" on:click={() => onSelect(Types.TEXT, "", "")}>
            <img class="group-hover:bg-[#424242]" src="{textSVG}" alt="Add text on the slide" />
        </div>
        <div class="flex-1 text-center cursor-pointer hover group" on:click={() => onSelect(Types.CODE, "", "")}>
            <img class="group-hover:bg-[#424242]" src="{codeSVG}" alt="Add code on the slide" />
        </div>
        <div class="flex-1 text-center cursor-pointer hover group" on:click={inputImage}>
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img class="group-hover:bg-[#424242]" src="{imageSVG}" alt="Add an image on the slide" />
        </div>
    </div>
</div>
