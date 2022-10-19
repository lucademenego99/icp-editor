<script lang="ts">
    import Reveal from "./Reveal.svelte";
    import Controls from "./Controls.svelte";
</script>

<main class="w-full h-full flex justify-center">
    <div class="relative flex justify-center items-center float-left h-full">
        <div class="relative flex flex-col items-center justify-center w-[70vw] box-border rounded-sm bg-[#222222] shadow-lg aspect-video">
            <Reveal />
        </div>
        <Controls />
    </div>
</main>
