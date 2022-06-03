<script lang="ts">
import { Layouts } from "../../types";

    import { revealSlides } from "../../stores";

    const newSlide = () => {
		$revealSlides = [...$revealSlides, Layouts.BODY];
	};
</script>

<aside class="overview">
    <button on:click="{newSlide}">New Slide</button>
    <button>New vertical Slide</button>
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
</style>
