<script lang="ts">
    export let show: boolean = false;
    export let onConfirm: (alt: string) => void;

    let altText: string;
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {show
        ? 'opacity-100 pointer-events-all'
        : 'opacity-0 pointer-events-none'}"
>
    <div
        class="w-[400px] h-[250px] bg-white rounded-lg flex flex-col justify-evenly items-center"
    >
        <div class="flex flex-col gap-1">
            <h3 class="text-gray-500 text-xl tracking-wider">
                Please provide an alt text for your image.
            </h3>
            <p class="text-gray-400 text-sm self-left">
                It helps visually impaired users to understand it.
            </p>

            <input
                type="text"
                class="w-full border border-gray-300 rounded-md p-2"
                placeholder="Alt text"
                bind:value={altText}
            />
            <button on:click={() => onConfirm(altText)}>Done</button>
        </div>
    </div>
</div>