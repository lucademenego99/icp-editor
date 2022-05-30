<div class="grid-item active" style="display: none" />
<div
    class="grid-item"
    style="display: flex; justify-content: center; align-items: center;"
>
    <div
        style="position: absolute; border-radius: 10px; left: 10%; top: 40%; width: 35%; height: 20%; background-color: #6C6C6C;"
    />
    <div
        style="position: absolute; border-radius: 10px; right: 10%; top: 40%; width: 35%; height: 20%; background-color: #6C6C6C;"
    />
</div>

<style>
    .grid-item {
        position: relative;
        cursor: pointer;
        border-radius: 5px;
        width: 100%;
        padding-top: 56.25%;
        background-color: white;
        transition: background-color 0.2s ease-in-out;
    }

    .grid-item.active {
        border: 2px solid #c3073f;
    }

    .grid-item:hover {
        background-color: #adadad;
    }
</style>
