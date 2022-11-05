<script lang="ts">
    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";
    import { Layouts, LayoutsNames, type Language } from "../../types";
    import { saveAs } from "file-saver";

    import {
        slidesHTML,
        currentLanguage,
        revealSlides,
        currentSlideH,
        currentSlideV,
        RevealInstance,
        deckName,
    } from "../../stores";
    import Exporting from "../modals/Exporting.svelte";
    import { Slide } from "../../classes/Slide";

    let currentDeckName = "untitled";

    let savingFileDialog = false;

    $: {
        deckName.set(currentDeckName);
    }

    function reset() {
        revealSlides.set([[new Slide(0, 0, "python", Layouts.MAIN)]]);
        $RevealInstance.slide(0, 0);
        setTimeout(() => {
            $RevealInstance.sync();
        }, 100);
    }

    async function saveSlidesRedbean() {
        // Start the dialog showing the user that the file is being generated
        savingFileDialog = true;

        // For each element in revealSlides, get its innerHTML, put it inside a <section></section>tag, and add it to a newly created array
        $slidesHTML = $revealSlides
            .map(
                (slides) =>
                    "<section>" +
                    slides
                        .map((slide) => `<section>${slide.getHtml()}</section>`)
                        .join("\n") +
                    "</section>"
            )
            .join("\n");

        // Create a new web worker and ask it to generate the file
        // We need a worker because the file generation is a blocking operation
        const worker = new Worker(
            new URL("../slidesExport.js", import.meta.url),
            {
                type: "module",
            }
        );
        worker.postMessage({ slides: $slidesHTML });

        // Wait for a response from the worker
        worker.onmessage = (event) => {
            // Save the generated file
            const blob = new Blob([event.data.generated.buffer], {
                type: "application/zip",
            });
            savingFileDialog = false;
            saveAs(blob, `${$deckName}.com`);
        };
    }

    /**
     * Change the current default language. Calling this function will:
     * - change the default programming language used when creating a new slide
     * - change the programming language used in the current slide
     */
    function setCurrentLanguage(event: MouseEvent): void {
        // Get the selected language
        $currentLanguage = (
            event.target as HTMLLinkElement
        ).textContent.toLowerCase() as Language;

        console.log("Setting language to " + $currentLanguage);

        // Change the programming language used in the current slide
        $revealSlides[$currentSlideH][$currentSlideV].setLanguage(
            $currentLanguage
        );

        revealSlides.set($revealSlides);
    }

    function setLayout(layout: Layouts): void {
        $revealSlides[$currentSlideH][$currentSlideV].setLayout(layout);
    }
</script>

<Exporting show={savingFileDialog} />
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
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={reset}>New</button
                    >
                    <!-- <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        >Open</button
                    > -->
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={saveSlidesRedbean}>Export Redbean</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={() => {}}>Export HTML</button
                    >
                </div>
            </div>
        </div>
        <div
            class="cursor-pointer text-left transition-all block hover:bg-[#434552] action-item"
        >
            <p class="py-1 px-2 text-sm">Help</p>
        </div>
        <div class="ml-6 h-[10px] border-r-[1px] border-white" />
        <div
            class="cursor-pointer text-left transition-all block hover:bg-[#434552] action-item group ml-6"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">
                    <strong>Selected Layout</strong> - {LayoutsNames[
                        $revealSlides[$currentSlideH][$currentSlideV].layout
                    ]}
                </p>
                <div
                    class="transform-modal-body dropdown-content absolute m-0 p-1 bg-[#f9f9f9] hidden flex flex-col z-50 group-hover:grid"
                >
                    <LayoutMain
                        on:click={() => setLayout(Layouts.MAIN)}
                        isActive={$revealSlides[$currentSlideH][$currentSlideV]
                            .layout == Layouts.MAIN}
                    />
                    <LayoutBody
                        on:click={() => setLayout(Layouts.BODY)}
                        isActive={$revealSlides[$currentSlideH][$currentSlideV]
                            .layout == Layouts.BODY}
                    />
                    <LayoutColumns
                        on:click={() => setLayout(Layouts.COLUMNS)}
                        isActive={$revealSlides[$currentSlideH][$currentSlideV]
                            .layout == Layouts.COLUMNS}
                    />
                </div>
            </div>
        </div>
        <div class="ml-6 h-[10px] border-r-[1px] border-white" />
        <div
            class="cursor-pointer text-left transition-all block hover:bg-[#434552] action-item group ml-6"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">
                    <strong>Selected language</strong> -
                    {$currentLanguage.charAt(0).toUpperCase() +
                        $currentLanguage.slice(1)}
                </p>
                <div
                    class="dropdown-content absolute m-0 bg-[#f9f9f9] hidden flex flex-col z-50 group-hover:flex"
                >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Python</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Typescript</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Javascript</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Java</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Sql</button
                    >
                </div>
            </div>
        </div>
        <div class="ml-6 h-[10px] border-r-[1px] border-white" />
        <div class="flex flex-row ml-6">
            <p class="py-1 px-2 text-sm"><strong>Slide Deck name</strong> -</p>
            <p
                bind:innerHTML={currentDeckName}
                class="py-1 text-sm editable"
                contenteditable="true"
            >
                {$deckName}
            </p>
        </div>
    </div>
    <!-- <Login /> -->
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
