<script lang="ts">
    export let onSelect = (value: number) => {};

    function select(value) {
        onSelect(value);
        close();
    }
</script>

<div style="display: flex; flex-direction: column; ">
    <p class="font-mono text-3xl m-0 p-0">Select an element</p>
    <div class="px-1 flex justify-center items-center box-border">
        <div class="flex-1 text-center cursor-pointer hover group" on:click={() => select(1)}>
            <img class="group-hover:bg-[#424242]" src="/assets/Text.svg" alt="" srcset="" />
        </div>
        <div class="flex-1 text-center cursor-pointer hover group" on:click={() => select(2)}>
            <img class="group-hover:bg-[#424242]" src="/assets/Code.svg" alt="" srcset="" />
        </div>
        <div class="flex-1 text-center cursor-pointer hover group" on:click={() => select(3)}>
            <img class="group-hover:bg-[#424242]" src="/assets/Image.svg" alt="" srcset="" />
        </div>
    </div>
</div>
