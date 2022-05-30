<script lang="ts">
    import Reveal from "./Reveal.svelte";
    import Controls from "./Controls.svelte";
</script>

<main>
    <div class="main">
        <div class="slide">
            <Reveal />
        </div>
        <Controls />
    </div>
</main>

<style>
    main {
        width: 100%;
        height: calc(100% - 30px);
        display: flex;
        justify-content: center;
    }

    .main {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        height: 100%;
    }

    .slide {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 70vw;
        aspect-ratio: 16 / 9;
        box-sizing: border-box;
        background-color: white;
        border-radius: 5px;
        background: #222222;
        box-shadow: 4px 4px 9px -4px #000000;
    }
</style>
