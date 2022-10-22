<script lang="ts">
    import { Types } from "../../types";
    import textSVG from "../../assets/Text.svg?url";
    import codeSVG from "../../assets/Code.svg?url";
    import imageSVG from "../../assets/Image.svg?url";

    export let onSelect: (value: Types) => void;
</script>

<div class="flex flex-col">
    <p class="font-mono text-3xl m-0 p-0">Select an element</p>
    <div class="px-1 flex justify-center items-center box-border">
        <div class="flex-1 text-center cursor-pointer hover group" on:click={() => onSelect(Types.TEXT)}>
            <img class="group-hover:bg-[#424242]" src="{textSVG}" alt="" srcset="" />
        </div>
        <div class="flex-1 text-center cursor-pointer hover group" on:click={() => onSelect(Types.CODE)}>
            <img class="group-hover:bg-[#424242]" src="{codeSVG}" alt="" srcset="" />
        </div>
        <div class="flex-1 text-center cursor-pointer hover group" on:click={() => onSelect(Types.IMAGE)}>
            <img class="group-hover:bg-[#424242]" src="{imageSVG}" alt="" srcset="" />
        </div>
    </div>
</div>
