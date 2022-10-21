<script lang="ts">
    import LayoutMain from "./layouts/Layout-Main.svelte";
    import LayoutBody from "./layouts/Layout-Body.svelte";
    import LayoutColumns from "./layouts/Layout-Columns.svelte";
    import Login from "../navbar/Login.svelte";
    import { Layouts, type Language } from "../../types";
    import { generateRedbeanFile } from "icp-create-server";
    import redbean from "../../assets/redbean.com?url";
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

    $: {
        deckName.set(currentDeckName);
    }

    function bufferToHex(buffer) {
        return [...new Uint8Array(buffer)]
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    }

    async function saveSlides() {
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

        const response = await fetch(redbean);
        const file = await response.blob();

        // Get the hex string
        let zipString = bufferToHex(await file.arrayBuffer());

        const generated: Uint8Array = await generateRedbeanFile(
            $slidesHTML,
            zipString
        );
        const blob = new Blob([generated.buffer], { type: "application/zip" });
        saveAs(blob, `${$deckName}.com`);
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
                        on:click={saveSlides}>Save as</button
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
