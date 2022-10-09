<script lang="ts">
    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";
    import Login from "../navbar/Login.svelte";
    import { Layouts } from "../../types";

    import { slidesHTML, currentLanguage, revealSlides, currentSlideH, currentSlideV } from "../../stores";

    function saveSlides() {
        // For each element in revealSlides, get its innerHTML, put it inside a <section></section>tag, and add it to a newly created array
        let listOfSlidesHTML: Array<string> = $revealSlides.map(
            (slides) =>
                "<section>" +
                slides
                    .map(
                        (slide) =>
                            `<section>${slide.getHtml()}</section>` +
                            "</section>"
                    )
                    .join("\n")
        );

        // Update the slidesHTML value inside the store
        $slidesHTML = listOfSlidesHTML.toString();

        console.log($slidesHTML);

        // TODO: get an instance of redbean, put the slides html inside it and make the user download it
    }

    function setCurrentLanguage(event: MouseEvent): void {
        $currentLanguage = (
            event.target as HTMLLinkElement
        ).textContent.toLowerCase();
    }
</script>

<nav class="flex flex-row items-center h-[30px] bg-[#1a1a1d]">
    <div class="flex flex-row items-center ml-2">
        <div
            class="cursor-pointer text-left transition-all block hover:bg-[#434552] action-item group"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">File</p>
                <div
                    class="dropdown-content absolute m-0 bg-[#f9f9f9] hidden flex flex-col z-50 group-hover:flex"
                >
                    <a
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        href="#">New</a
                    >
                    <a
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        href="#">Open</a
                    >
                    <a
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={saveSlides}
                        href="#">Save as</a
                    >
                </div>
            </div>
        </div>
        <div
            class="cursor-pointer text-left transition-all block hover:bg-[#434552] action-item"
        >
            <p class="py-1 px-2 text-sm">Help</p>
        </div>
        <div
            style="border-right: 1px solid white; margin-left: 2em; height: 10px;"
        />
        <div
            class="cursor-pointer text-left transition-all block hover:bg-[#434552] action-item group"
            style="margin-left: 2em;"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">Layout {$revealSlides[$currentSlideH][$currentSlideV].layout + 1}</p>
                <div
                    class="transform-modal-body dropdown-content absolute m-0 p-1 bg-[#f9f9f9] hidden flex flex-col z-50 group-hover:grid"
                >
                    <LayoutMain isActive={$revealSlides[$currentSlideH][$currentSlideV].layout == Layouts.MAIN} />
                    <LayoutBody isActive={$revealSlides[$currentSlideH][$currentSlideV].layout == Layouts.BODY} />
                    <LayoutColumns isActive={$revealSlides[$currentSlideH][$currentSlideV].layout == Layouts.COLUMNS} />
                </div>
            </div>
        </div>
        <div
            style="border-right: 1px solid white; margin-left: 2em; height: 10px;"
        />
        <div
            class="cursor-pointer text-left transition-all block hover:bg-[#434552] action-item group"
            style="margin-left: 2em;"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">{$currentLanguage.charAt(0).toUpperCase() + $currentLanguage.slice(1)}</p>
                <div
                    class="dropdown-content absolute m-0 bg-[#f9f9f9] hidden flex flex-col z-50 group-hover:flex"
                >
                    <a
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}
                        href="#">Python</a
                    >
                    <a
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}
                        href="#">Typescript</a
                    >
                    <a
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}
                        href="#">Javascript</a
                    >
                    <a
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}
                        href="#">Java</a
                    >
                </div>
            </div>
        </div>
        <div
            style="border-right: 1px solid white; margin-left: 2em; height: 10px;"
        />
        <div style="margin-left: 2em;">
            <p class="py-1 px-2 text-sm editable" contenteditable="true">
                untitled
            </p>
        </div>
    </div>
    <Login />
</nav>

<style>
    .dropdown-content {
        min-width: 8vw;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    }

    .transform-modal-body.dropdown-content {
        min-width: 15vw;
    }

    .transform-modal-body {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 0.6em;
        grid-row-gap: 0.6em;
    }
</style>
