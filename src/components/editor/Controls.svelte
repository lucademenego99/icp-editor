<aside class="overview">
    <div class="buttons">
        <img
            class="action-image"
            style="transform: rotate(90deg)"
            src="/assets/Previous.png"
            alt=""
            srcset=""
        />
    </div>
    <div class="buttons">
        <img class="action-image" src="/assets/Previous.png" alt="" srcset="" />
        <img class="action-image" src="/assets/Next.png" alt="" srcset="" />
    </div>
    <div class="buttons">
        <img
            class="action-image"
            style="transform: rotate(-90deg)"
            src="/assets/Previous.png"
            alt=""
            srcset=""
        />
    </div>
</aside>

<style>
    .overview {
        float: right;
        width: 15%;
        height: 100%;
        box-sizing: border-box;
        padding: 1em 1em;
        border-right: 4px solid #1a1a1d;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1em;
        overflow-y: auto;
    }

    .buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 5em;
    }
</style>
