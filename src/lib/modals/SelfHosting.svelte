<script lang="ts">
    import Close from "../icons/Close.svelte";
    import { darkTheme, showSelfHosting, revealSlides, deckName } from "../../stores";
    import JSZip from "jszip";
    import revealCSS from "../../styles/reveal.css?inline";
    import revealJS from "reveal.js/dist/reveal?raw";
	import bloodCSS from "../../styles/blood.css?inline";
    import whiteCSS from "../../styles/white.css?inline";
	import customCSS from "../../styles/custom-styles.css?inline";
	import bundle from 'icp-bundle/dist/base/full-offline.iife.js?raw';
    import utilsZip from '../../assets/utils.zip?url';
    import { saveAs } from "file-saver";
    import Exporter from "../../classes/Exporter";

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
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {$showSelfHosting
        ? 'opacity-100 pointer-events-all'
        : 'opacity-0 pointer-events-none'}"
>
    <div
        class="w-[800px] h-[290px] relative bg-primary rounded-lg flex flex-col justify-end pb-4"
    >
        <div class="absolute left-5 top-3">
            <p class="text-primary text-xl">How to host the slides in your own server</p>
        </div>
        <div
            class="transition-all absolute right-5 top-5 scale-110 cursor-pointer z-50 hover:scale-125"
            on:click={() => (showSelfHosting.set(false))}
        >
            <Close color={$darkTheme ? 'white' : 'black'} />
        </div>
        <ol class="text-lg list-decimal"
        style="margin-left: 3rem !important;">
            <li style="margin: 1rem 0 !important; padding: 0 !important;"><div class="flex flex-row items-center gap-3"><button on:click={downloadRequirements} class="transition-all text-gray-600 dark:text-white font-semibold text-sm rounded-lg p-2 ml-3 border-2 border-gray-500 hover:bg-[#3b82f6] hover:border-white dark:hover:border-[#1A1A1D] dark:hover:bg-[#AA2233] hover:text-white">Download requirements</button><p class="text-primary text-base">- skip this step if you already have them</p></div></li>
            <li style="margin: 1rem 0 !important; padding: 0 !important;"><p class="text-primary text-base ml-3">Unzip the requirements and put them in the same directory in which the slides will be available</p></li>
            <li style="margin: 1rem 0 !important; padding: 0 !important;"><button on:click={() => exportHTML(false)} class="transition-all text-gray-600 dark:text-white font-semibold text-sm rounded-lg p-2 ml-3 border-2 border-gray-500 hover:bg-[#3b82f6] hover:border-white dark:hover:border-[#1A1A1D] dark:hover:bg-[#AA2233] hover:text-white">Download the slide deck</button></li>
            <li style="margin: 1rem 0 !important; padding: 0 !important;"><p class="text-primary text-base ml-3">Put it in the previously chosen directory</p></li>
        </ol>
    </div>
</div>
