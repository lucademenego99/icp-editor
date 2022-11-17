<script lang="ts">

    /**
     * @param {boolean} show - Whether the modal should be shown or not
     */
    export let show: boolean = false;

    /**
     * @param {string} alt - Alt text of the image
     */
    export let alt: string = "";

    /**
     * @param {(alt: string) => void} onConfirm - Function called when the user confirms the changes
     */
    export let onConfirm: (alt: string) => void;
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {show
        ? 'opacity-100 pointer-events-all'
        : 'opacity-0 pointer-events-none'}"
>
    <div
        class="w-[400px] h-[230px] py-2 bg-white rounded-lg flex flex-col justify-evenly items-center"
    >
        <div class="flex flex-col h-full items-center justify-evenly">
            <h3 class="text-gray-500 text-xl tracking-wider">
                Please provide an alt text for your image.
            </h3>
            <p class="text-gray-400 text-sm self-left">
                It helps those who cannot view the image to understand it.
            </p>

            <div>
                <input
                    type="text"
                    class="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Alt text"
                    bind:value={alt}
                />
                <button on:click={() => onConfirm(alt)}>Done</button>
            </div>
        </div>
    </div>
</div>

<!-- !important CSS is used here to override Reveal's default styles -->
<style>
    h3,
    p {
        text-shadow: none !important;
        color: rgb(87, 87, 87) !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    h3 {
        font-size: 1.25rem !important;
    }

    p {
        font-size: 0.9rem !important;
    }

    input {
        width: 80%;
        padding: 0.5em;
        font-size: 0.5em;
        outline: 0;
        color: rgb(87, 87, 87) !important;
    }

    button {
        width: 80%;
        padding: 0.5em;
        font-size: 0.5em;
        background-color: #000;
        color: #fff;
        border: none;
        border-radius: 0.5em;
        transition: all 0.15s ease-in-out;
    }

    button:hover {
        background-color: rgb(29, 29, 29);
    }
</style>
