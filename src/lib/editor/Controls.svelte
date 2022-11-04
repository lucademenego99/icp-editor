<script lang="ts">
    import { Layouts } from "../../types";

    import { RevealInstance, revealSlides, currentSlideH, currentLanguage, showOverview } from "../../stores";
    import { Slide } from "../../classes/Slide";

    const newSlide = () => {
        $revealSlides = [
            ...$revealSlides,
            [new Slide($revealSlides.length, 0, $currentLanguage, Layouts.BODY)],
        ];
        $RevealInstance.sync();
        setTimeout(() => {
            $RevealInstance.slide($revealSlides.length - 1, 0);
        }, 50);
    };

    const newVerticalSlide = () => {
        const newSlides = [...$revealSlides];
        newSlides[$currentSlideH].push(
            new Slide(
                $currentSlideH,
                newSlides[$currentSlideH].length,
                $currentLanguage,
                Layouts.BODY
            )
        );
        $revealSlides = newSlides;
        $RevealInstance.sync();
        setTimeout(() => {
            $RevealInstance.slide(
                $currentSlideH,
                newSlides[$currentSlideH].length - 1
            );
        }, 50);
    };
</script>

<aside
    class="float-right w-[15%] h-full box-border p-3 border-r-4 border-[#1a1a1d] flex flex-col items-center justify-center gap-5 overflow-y-auto"
>
    <button on:click={newSlide}>New Slide</button>
    <button on:click={newVerticalSlide}>New vertical Slide</button>
    <button on:click={() => {revealSlides.set([...$revealSlides]); showOverview.set(true)}}>Slides overview</button>
</aside>
