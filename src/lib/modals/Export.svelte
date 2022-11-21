<script lang="ts">
    import Close from "../icons/Close.svelte";
    import {
        showExport,
        showSelfHosting,
        darkTheme,
        revealSlides,
        deckName,
        showExportingLoading,
    } from "../../stores";
    import Online from "../icons/Online.svelte";
    import Offline from "../icons/Offline.svelte";
    import Server from "../icons/Server.svelte";
    import { saveAs } from "file-saver";
    import Exporter from "../../classes/Exporter";

    /**
     * Save the slides as a redbean single-file distributable web server
     */
    function saveSlidesRedbean() {
        showExportingLoading.set(true);
        Exporter.generateRedbean($revealSlides, $darkTheme, (event) => {
            // Save the generated file
            const blob = new Blob([event.data.generated.buffer], {
                type: "application/zip",
            });
            showExportingLoading.set(false);
            showExport.set(false);
            saveAs(blob, `${$deckName}.com`);
        });
    }

    /**
     * Save the slides as an HTML file
     * @param {boolean} online - Whether the HTML file should be able to work without an internet connection
     */
    function exportHTML(online: boolean): void {
        showExport.set(false);

        // Generate the HTML file
        const blob = Exporter.generateHTML($revealSlides, online, $darkTheme);

        // Save it
        saveAs(blob, `${$deckName}.html`);
    }
</script>

<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {$showExport
        ? 'opacity-100 pointer-events-all'
        : 'opacity-0 pointer-events-none'}"
>
    <div
        class="w-[800px] h-[350px] relative bg-primary rounded-lg flex flex-col justify-end items-center pb-3"
    >
        <div class="absolute left-5 top-3">
            <p class="text-primary text-xl">Slides export</p>
        </div>
        <div
            class="transition-all absolute right-5 top-5 scale-110 cursor-pointer z-50 hover:scale-125"
            on:click={() => showExport.set(false)}
        >
            <Close color={$darkTheme ? "white" : "black"} />
        </div>
        <div class="flex flex-row justify-evenly">
            <div class="flex-1 flex flex-col items-center justify-around">
                <div
                    on:click={() => exportHTML(true)}
                    class="transition-all flex-1 border-4 flex justify-center items-center border-[#333333] rounded-xl bg-transparent cursor-pointer px-10 py-6 hover:border-white dark:hover:border-[#1A1A1D] hover:bg-[#3b82f6]/70 dark:hover:bg-[#AA2233]/80"
                >
                    <Online color={$darkTheme ? 'white' : 'black'} />
                </div>
                <div class="flex-1 flex items-center justify-center">
                    <p class="w-9/12 py-5 text-primary text-center text-base">
                        Single HTML file, only working with an internet
                        connection
                    </p>
                </div>
            </div>
            <div class="flex-1 flex flex-col items-center justify-around">
                <div
                    on:click={saveSlidesRedbean}
                    class="transition-all flex-1 border-4 flex justify-center items-center border-[#333333] rounded-xl bg-transparent cursor-pointer px-10 py-6 hover:border-white dark:hover:border-[#1A1A1D] hover:bg-[#3b82f6]/70 dark:hover:bg-[#AA2233]/80"
                >
                    <Offline color={$darkTheme ? 'white' : 'black'} />
                </div>
                <div class="flex-1 flex items-center justify-center">
                    <p class="w-9/12 py-5 text-primary text-center text-base">
                        Single executable file exposing the current slide deck
                    </p>
                </div>
            </div>
            <div class="flex-1 flex flex-col items-center justify-around">
                <div
                    on:click={() => {
                        showExport.set(false);
                        showSelfHosting.set(true);
                    }}
                    class="transition-all flex-1 border-4 flex justify-center items-center border-[#333333] rounded-xl bg-transparent cursor-pointer px-10 py-6 hover:border-white dark:hover:border-[#1A1A1D] hover:bg-[#3b82f6]/70 dark:hover:bg-[#AA2233]/80"
                >
                    <Server color={$darkTheme ? 'white' : 'black'} />
                </div>
                <div class="flex-1 flex items-center justify-center">
                    <p class="w-9/12 py-5 text-primary text-center text-base">
                        Export the slides for self-hosting
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
