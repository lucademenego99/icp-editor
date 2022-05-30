<script lang="ts">
    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";
    import Login from "../navbar/Login.svelte";
</script>

<nav>
    <div class="actions">
        <div class="action-item">
            <div class="dropdown">
                <p class="action-text">File</p>
                <div class="dropdown-content">
                    <a href="#">New</a>
                    <a href="#">Open</a>
                    <a href="#">Save as</a>
                </div>
            </div>
        </div>
        <div class="action-item">
            <p class="action-text">Help</p>
        </div>
        <div
            style="border-right: 1px solid white; margin-left: 2em; height: 10px;"
        />
        <div class="action-item" style="margin-left: 2em;">
            <div class="dropdown">
                <p class="action-text">Layout 1</p>
                <div class="transform-modal-body dropdown-content">
                    <LayoutMain />
                    <LayoutBody />
                    <LayoutColumns />
                </div>
            </div>
        </div>
        <div
            style="border-right: 1px solid white; margin-left: 2em; height: 10px;"
        />
        <div class="action-item" style="margin-left: 2em;">
            <div class="dropdown">
                <p class="action-text">Python</p>
                <div class="dropdown-content">
                    <a href="#">Python</a>
                    <a href="#">Typescript</a>
                    <a href="#">Javascript</a>
                    <a href="#">Java</a>
                </div>
            </div>
        </div>
        <div
            style="border-right: 1px solid white; margin-left: 2em; height: 10px;"
        />
        <div style="margin-left: 2em;">
            <p class="action-text" contenteditable="true">untitled</p>
        </div>
    </div>
    <Login />
</nav>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #1a1a1d;
        height: 30px;
    }

    .actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 0.1em;
    }

    .action-item {
        cursor: pointer;
        display: block;
        text-align: left;
        transition: background-color 0.2s ease-in-out;
    }

    .dropdown {
        overflow: hidden;
    }

    .dropdown-content {
        position: absolute;
        min-width: 8vw;
        margin: 0;
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        display: none;
        z-index: 999;
        flex-direction: column;
    }

    .dropdown-content a {
        padding: 0.4em;
        font-size: 0.8em;
        color: black;
        float: none;
        text-decoration: none !important;
        text-align: left;
    }

    .dropdown-content a:hover {
        background-color: #434552;
        color: #f9f9f9;
    }

    .action-item:hover .dropdown-content {
        display: flex;
    }

    .action-item:hover .transform-modal-body.dropdown-content {
        display: grid;
    }

    .transform-modal-body.dropdown-content {
        min-width: 15vw;
    }

    .action-item:hover {
        background: #434552;
    }

    .action-text {
        padding: 0.3em 0.7em;
        font-size: 0.9em;
    }

    .transform-modal-body {
        display: none;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 0.6em;
        grid-row-gap: 0.6em;
        padding: 0.6em;
    }
</style>
