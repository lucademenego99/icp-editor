<script lang="ts">
    export let onSelect = (value: number) => {};

    function select(value) {
        onSelect(value);
        close();
    }
</script>

<div style="display: flex; flex-direction: column; ">
    <p class="select-text">Select an element</p>
    <div class="elements">
        <div class="element" on:click={() => select(1)}>
            <img src="/assets/Text.svg" alt="" srcset="" />
        </div>
        <div class="element" on:click={() => select(2)}>
            <img src="/assets/Code.svg" alt="" srcset="" />
        </div>
        <div class="element" on:click={() => select(3)}>
            <img src="/assets/Image.svg" alt="" srcset="" />
        </div>
    </div>
</div>

<style>
    .select-text {
        font-family: monospace;
        font-size: 2.7vmin;
    }

    p {
        margin: 0;
        padding: 0;
    }

    .elements {
        box-sizing: border-box;
        padding: 0 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .element {
        text-align: center;
        flex: 1;
        cursor: pointer;
    }

    .element img:hover {
        background-color: #424242;
    }
</style>
