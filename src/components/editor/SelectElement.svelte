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
            <img src="/assets/Previous.png" alt="" srcset="" />
        </div>
        <div class="element" on:click={() => select(2)}>
            <img src="/assets/Previous.png" alt="" srcset="" />
        </div>
        <div class="element" on:click={() => select(3)}>
            <img src="/assets/Previous.png" alt="" srcset="" />
        </div>
    </div>
</div>

<style>
    .select-text {
        font-family: monospace;
        font-size: 2.7vmin;
    }

    .elements {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2em;
    }

    .element {
        text-align: center;
        flex: 1;
        cursor: pointer;
    }
</style>
