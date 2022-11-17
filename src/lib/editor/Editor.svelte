<script lang="ts">
    import Reveal from "./Reveal.svelte";

    /**
     * Check if the screen is in landscape mode
     */
    function isLandscape() {
        return window.innerWidth > window.innerHeight;
    }
</script>

<main class="w-full h-full flex justify-center">
    <div class="relative flex justify-center items-center float-left h-full">
        <div
            class="relative flex flex-col items-center justify-center {isLandscape() ? 'h-[calc(85vh-30px)]' : 'max-h-[calc(85vh-30px)] w-[90vw]'} box-border rounded-sm bg-[#222222] shadow-lg aspect-video"
        >
            <Reveal />
        </div>
    </div>
</main>
