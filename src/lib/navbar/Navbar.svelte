<script lang="ts">
    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";
    import Login from "../navbar/Login.svelte";
    import { Layouts, type Language } from "../../types";
    import { saveAs } from "file-saver";

    import {
        slidesHTML,
        currentLanguage,
        revealSlides,
        currentSlideH,
        currentSlideV,
        deckName,
    } from "../../stores";

    let currentDeckName = "untitled";

    let savingFileDialog = false;

    $: {
        deckName.set(currentDeckName);
    }

    function bufferToHex(buffer) {
        return [...new Uint8Array(buffer)]
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    }

    async function saveSlides() {
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
        console.log(
            `Setting layout of ${$currentSlideH}, ${currentSlideV} to ${layout}`
        );
        $revealSlides[$currentSlideH][$currentSlideV].layout = layout;

        revealSlides.set($revealSlides);
    }
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {savingFileDialog ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'}"
>
    <div
        class="w-[400px] h-[250px] bg-white rounded-lg flex flex-col justify-evenly items-center"
    >
    <svg width="75" height="75" viewBox="0 0 57 57" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
        <g fill="#666666" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
                <circle cx="5" cy="50" r="5">
                    <animate attributeName="cy"
                         begin="0s" dur="2.2s"
                         values="50;5;50;50"
                         calcMode="linear"
                         repeatCount="indefinite" />
                    <animate attributeName="cx"
                         begin="0s" dur="2.2s"
                         values="5;27;49;5"
                         calcMode="linear"
                         repeatCount="indefinite" />
                </circle>
                <circle cx="27" cy="5" r="5">
                    <animate attributeName="cy"
                         begin="0s" dur="2.2s"
                         from="5" to="5"
                         values="5;50;50;5"
                         calcMode="linear"
                         repeatCount="indefinite" />
                    <animate attributeName="cx"
                         begin="0s" dur="2.2s"
                         from="27" to="27"
                         values="27;49;5;27"
                         calcMode="linear"
                         repeatCount="indefinite" />
                </circle>
                <circle cx="49" cy="50" r="5">
                    <animate attributeName="cy"
                         begin="0s" dur="2.2s"
                         values="50;50;5;50"
                         calcMode="linear"
                         repeatCount="indefinite" />
                    <animate attributeName="cx"
                         from="49" to="49"
                         begin="0s" dur="2.2s"
                         values="49;5;27;49"
                         calcMode="linear"
                         repeatCount="indefinite" />
                </circle>
            </g>
        </g>
    </svg>
    <div class="flex flex-col gap-1">
        <h3 class="text-gray-500 text-xl tracking-wider">
            Your file is being generated...
        </h3>
        <p class="text-gray-400 text-sm self-left">It should take approximately 10-20 seconds</p>
    </div>
    </div>
</div>
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
                        >New</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        >Open</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-[#434552] hover:text-[#f9f9f9]"
                        on:click={saveSlides}>Export</button
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
                <p class="py-1 px-2 text-sm">
                    Layout {$revealSlides[$currentSlideH][$currentSlideV]
                        .layout + 1}
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
        <div
            style="border-right: 1px solid white; margin-left: 2em; height: 10px;"
        />
        <div
            class="cursor-pointer text-left transition-all block hover:bg-[#434552] action-item group"
            style="margin-left: 2em;"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">
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
                </div>
            </div>
        </div>
        <div
            style="border-right: 1px solid white; margin-left: 2em; height: 10px;"
        />
        <div style="margin-left: 2em;">
            <p
                bind:innerHTML={currentDeckName}
                class="py-1 px-2 text-sm editable"
                contenteditable="true"
            >
                {$deckName}
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
