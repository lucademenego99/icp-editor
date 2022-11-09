<script lang="ts">
    import { Layouts } from "../../types";

    import {
        RevealInstance,
        revealSlides,
        currentSlideH,
        currentLanguage,
        showOverview,
        darkTheme,
    } from "../../stores";
    import { Slide } from "../../classes/Slide";

    const newSlide = () => {
        $revealSlides = [
            ...$revealSlides,
            [
                new Slide(
                    $revealSlides.length,
                    0,
                    $currentLanguage,
                    Layouts.BODY
                ),
            ],
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
    class="float-right w-[15%] h-full box-border p-3 flex flex-col items-center justify-center gap-5 overflow-y-auto text-black dark:text-white"
>
</aside>
