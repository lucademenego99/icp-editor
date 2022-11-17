<script lang="ts">
    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";
    import { Layouts, LayoutsNames, type Language } from "../../types";
    import { saveAs } from "file-saver";

    import {
        currentLanguage,
        revealSlides,
        currentSlideH,
        currentSlideV,
        RevealInstance,
        deckName,
        showHelp,
        darkTheme
    } from "../../stores";
    import Exporting from "../modals/Exporting.svelte";
    import Arrow from "../icons/Arrow.svelte";
    import { Slide } from "../../classes/Slide";
    import JSZip from "jszip";
    import revealCSS from "../../styles/reveal.css?inline";
    import revealJS from "reveal.js/dist/reveal?raw";
	import bloodCSS from "../../styles/blood.css?inline";
    import whiteCSS from "../../styles/white.css?inline";
	import customCSS from "../../styles/custom-styles.css?inline";
	import bundle from 'icp-bundle/dist/base/full-offline.iife.js?raw';
    import utilsZip from '../../assets/utils.zip?url';
    import Exporter from "../../classes/Exporter";
    import Theme from "../icons/Theme.svelte";

    /**
     * Initial deck name
     */
    let currentDeckName = "untitled";

    /**
     * Boolean indicating whether the user is currently exporting the deck
     */
    let savingFileDialog = false;

    /**
     * Update the deck name stored within the store when the user changes it
     */
    $: {
        deckName.set(currentDeckName);
    }

    /**
     * Reset the state of the application
     */
    function reset() {
        revealSlides.set([[new Slide(0, 0, "python", Layouts.MAIN)]]);
        $RevealInstance.slide(0, 0);
        setTimeout(() => {
            $RevealInstance.sync();
        }, 100);
    }

    /**
     * Save the slides as a redbean single-file distributable web server
     */
    function saveSlidesRedbean() {
        savingFileDialog = true;
        Exporter.generateRedbean($revealSlides, $darkTheme, (event) => {
            // Save the generated file
            const blob = new Blob([event.data.generated.buffer], {
                type: "application/zip",
            });
            savingFileDialog = false;
            saveAs(blob, `${$deckName}.com`);
        });
    }

    /**
     * Save the slides as an HTML file
     * @param {boolean} online - Whether the HTML file should be able to work without an internet connection
     */
    function exportHTML(online: boolean): void {
        // Generate the HTML file
        const blob = Exporter.generateHTML($revealSlides, online, $darkTheme);

        // Save it
        saveAs(blob, `${$deckName}.html`);
    }

    /**
     * Allow the user to download a zip file containing all the requirements to make the slides work locally
     * This is used when the user wants to export the slides for self-hosting
     */
    async function downloadRequirements() {
        // Get the utils.zip file
        const utils = await fetch(utilsZip);
        const zip = await JSZip.loadAsync(utils.arrayBuffer());

        // Add revealjs main script
        zip.file("reveal.js", revealJS);

        // Add revealjs css
        zip.file("reveal.css", revealCSS);

        // Add revealjs dark theme
        zip.file("blood.css", bloodCSS);

        // Add revealjs light theme
        zip.file("white.css", whiteCSS);

        // Add custom styles
        zip.file("custom-style.css", customCSS);

        // Add ICP bundle
        zip.file("full-offline.iife.js", bundle);

        // Generate the zip file and make the user download it
        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "icp-requirements.zip");
        });
    }

    /**
     * Change the current default language. Calling this function will:
     * - change the default programming language used when creating a new slide
     * - change the programming language used in the current slide
     * 
     * @param {MouseEvent} event event that triggered the function
     */
    function setCurrentLanguage(event: MouseEvent): void {
        // Get the selected language
        $currentLanguage = (
            event.target as HTMLLinkElement
        ).textContent.toLowerCase() as Language;

        // Change the programming language used in the current slide
        $revealSlides[$currentSlideH][$currentSlideV].setLanguage(
            $currentLanguage
        );

        revealSlides.set($revealSlides);
    }
</script>

<Exporting show={savingFileDialog} />
<nav class="flex flex-row items-center justify-between h-[30px] bg-primary text-black dark:text-white">
    <div class="flex flex-row items-center ml-2">
        <div
            class="cursor-pointer text-left transition-all block hover:bg-secondary action-item group/main"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">File</p>
                <div
                    class="dropdown-content absolute m-0 bg-primary-light hidden w-[170px] flex flex-col z-50 group-hover/main:flex"
                >
                    <!-- <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        >Open</button
                    > -->
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        on:click={() => exportHTML(true)}>Export for <strong>online</strong> use</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        on:click={saveSlidesRedbean}>Export for <strong>offline</strong> use</button
                    >
                    <div class="group/exportserver flex">
                        <button class="p-1 text-sm w-full text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9] flex flex-row justify-between items-center">
                            <p class="text-sm">Export for <strong>server</strong></p>
                            <Arrow width={10} height={10} customClass="rotate-[270deg]" />
                        </button>
                        <div class="w-0 overflow-hidden w-full text-sm text-black float-none text-left flex no-underline hover:bg-secondary hover:text-[#f9f9f9]">
                            <div class="dropdown-content hidden translateX absolute left-0 m-0 bg-primary-light w-[170px] flex flex-col z-50 group-hover/exportserver:flex">
                                <button
                                    class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                                    on:click={() => exportHTML(false)}>Export current slides</button
                                > 
                                <button
                                    class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                                    on:click={downloadRequirements}>Download Requirements</button
                                > 
                            </div>
                        </div>
                    </div>
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        on:click={reset}>Reset slides</button
                    >
                </div>
            </div>
        </div>
        <div
            class="cursor-pointer text-left transition-all block hover:bg-secondary action-item"
            on:click={() => showHelp.set(true)}
        >
            <p class="py-1 px-2 text-sm">Help</p>
        </div>
        <div class="ml-6 h-[10px] border-r-[1px] border-black dark:border-white" />
        <div
            class="cursor-pointer text-left transition-all block hover:bg-secondary action-item group ml-6"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">
                    <strong>Selected Layout</strong> - {LayoutsNames[
                        $revealSlides[$currentSlideH][$currentSlideV].layout
                    ]}
                </p>
                <div
                    class="transform-modal-body dropdown-content absolute m-0 p-1 bg-primary-light hidden flex flex-col z-50 group-hover:grid"
                >
                    <LayoutMain
                        isActive={$revealSlides[$currentSlideH][$currentSlideV]
                            .layout == Layouts.MAIN}
                    />
                    <LayoutBody
                        isActive={$revealSlides[$currentSlideH][$currentSlideV]
                            .layout == Layouts.BODY}
                    />
                    <LayoutColumns
                        isActive={$revealSlides[$currentSlideH][$currentSlideV]
                            .layout == Layouts.COLUMNS}
                    />
                </div>
            </div>
        </div>
        <div class="ml-6 h-[10px] border-r-[1px] border-black dark:border-white" />
        <div
            class="cursor-pointer text-left transition-all block hover:bg-secondary action-item group ml-6"
        >
            <div class="overflow-hidden">
                <p class="py-1 px-2 text-sm">
                    <strong>Selected language</strong> -
                    {$currentLanguage.charAt(0).toUpperCase() +
                        $currentLanguage.slice(1)}
                </p>
                <div
                    class="dropdown-content absolute m-0 bg-primary-light hidden flex flex-col z-50 group-hover:flex"
                >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Python</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Typescript</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Javascript</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Java</button
                    >
                    <button
                        class="p-1 text-sm text-black float-none text-left no-underline hover:bg-secondary hover:text-[#f9f9f9]"
                        on:click={setCurrentLanguage}>Sql</button
                    >
                </div>
            </div>
        </div>
        <div class="ml-6 h-[10px] border-r-[1px] border-black dark:border-white" />
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
    <div class="absolute top-3 right-3 btn-shadow" on:click={() => {$darkTheme = !$darkTheme}}>
        <Theme />
    </div>
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

    .translateX {
        transform: translateX(100%);
    }
</style>
