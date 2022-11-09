<script lang="ts">
    import { showHelp } from "../../stores";
    import Close from "../icons/Close.svelte";

    // Set showHelp to false on esc key
    function handleKeyDown(event) {
        if (event.key == "Escape" && $showHelp) {
            showHelp.set(false);
        }
    }
</script>

<svelte:window on:keydown={handleKeyDown} />
<div
    class="transition-all absolute flex items-center justify-center top-0 left-0 w-full h-full bg-black/75 z-50 {$showHelp
        ? ''
        : 'hidden'}"
>
    <div
        class="w-[95%] h-[95%] relative bg-primary rounded-lg flex flex-col justify-evenly items-center"
    >
        <div
            class="transition-all absolute right-5 top-5 scale-110 cursor-pointer z-50 hover:scale-125"
            on:click={() => showHelp.set(false)}
        >
            <Close />
        </div>
        <div class="w-full h-full overflow-auto flex flex-col gap-2 p-5">
            <h1 class="text-3xl tracking-wider">How to use this application</h1>
            <div class="mx-1">
                <div class="relative flex py-5 items-center">
                    <div
                        class="flex-grow border-t border-gray-500 dark:border-gray-300"
                    />
                    <span
                        class="flex-shrink mx-4 text-2xl text-gray-500 dark:text-gray-300"
                        >Slides creation</span
                    >
                    <div
                        class="flex-grow border-t border-gray-500 dark:border-gray-300"
                    />
                </div>
                <div>
                    <p class="text-lg m-0 p-0 mx-1 my-2">
                        To create a new slide, click on the <span
                            class="btn-explanation font-black">[+]</span
                        >
                        button on the right of the slide. This will create a new
                        slide with the default template "body", where you can
                        select which will be the content of your slide. <br /> You
                        can choose: text, code or image.
                    </p>

                    <ul
                        class="text-lg list-decimal"
                        style="margin-left: 3rem !important;"
                    >
                        <li
                            style="margin: 0.5rem 0 !important; padding: 0 !important;"
                        >
                            The <strong
                                ><span class="emph">text element</span></strong
                            > will give you a text editor where you can write your
                            text; to change its style you can simply select the part
                            of text you want to modify and a toolbar will be shown.
                        </li>
                        <li
                            style="margin: 0.5rem 0 !important; padding: 0 !important;"
                        >
                            The <strong
                                ><span class="emph">code element</span></strong
                            >
                            will give you an Interactive Code Playground where you
                            can write your code and run it. You can change the language
                            by selecting a new one from the
                            <span class="navbar-explanation"
                                >navigation bar</span
                            >.
                        </li>
                        <li
                            style="margin: 0.5rem 0 !important; padding: 0 !important;"
                        >
                            The <strong
                                ><span class="emph">image element</span></strong
                            > will give you a file selector where you can select
                            an image from your computer. You will be asked to provide
                            an ALT text: you can image it as a description of the
                            image, which will be shown if the image is not loaded.
                        </li>
                    </ul>

                    <p class="text-lg m-0 p-0 mx-1 my-2">
                        There are different <strong
                            ><span class="emph">pre-built templates</span
                            ></strong
                        >
                        you can use to create your slides. You can select one of
                        them by checking the "Selected Layout" option in the
                        <span class="navbar-explanation">navigation bar</span>.
                    </p>

                    <p class="text-lg m-0 p-0 mx-1 my-2">
                        Apart from the usual horizontal slides, you also have
                        the possibility to create vertical slides by clicking on
                        the <span class="btn-explanation font-black">[+]</span>
                        button on the bottom of the slide. This will create a new
                        slide that will be positioned below the current slide, creating
                        a
                        <em>grid-like</em> structure that you can navigate with the
                        arrow keys.
                    </p>

                    <p class="text-lg m-0 p-0 mx-1 my-2">
                        If you need to move the slides, you can easily do it in
                        the <strong><span class="emph">overview mode</span></strong>. You can easily activate it by
                        clicking on the button <span class="btn-explanation"
                            >[Overview]</span
                        > on top of the slide.
                    </p>

                    <p class="text-lg m-0 p-0 mx-1 my-2">
                        You can choose between two different themes: <strong><span class="emph">light</span></strong> and <strong><span class="emph">dark</span></strong>.
                        To change it, you can simply click on the button on the top-right corner of the screen.
                    </p>
                </div>
            </div>
            <div class="mx-1 my-6">
                <div class="relative flex py-5 items-center">
                    <div
                        class="flex-grow border-t border-gray-500 dark:border-gray-300"
                    />
                    <span
                        class="flex-shrink mx-4 text-2xl text-gray-500 dark:text-gray-300"
                        >Exporting the slides</span
                    >
                    <div
                        class="flex-grow border-t border-gray-500 dark:border-gray-300"
                    />
                </div>
                <div class="mx-1">
                    <p class="text-lg m-0 p-0 my-2">
                        There are different ways in which you can export the
                        created slides, all available under the <span
                            class="btn-explanation">[File]</span
                        >
                        section in the
                        <span class="navbar-explanation">navigation bar</span>.
                    </p>
                    <ul
                        class="text-lg m-2 list-decimal"
                        style="margin-left: 3rem !important;"
                    >
                        <li
                            style="margin: 0 !important; padding: 0 !important;"
                        >
                            <strong
                                ><span class="emph"
                                    >"Export for online use"</span
                                ></strong
                            > - create a simple HTML file that you can open in your
                            browser and share with other people. This file will only
                            work if you have an internet connection, as it will load
                            the necessary libraries from the internet.
                        </li>
                        <li
                            style="margin: 0 !important; padding: 0 !important;"
                        >
                            <strong
                                ><span class="emph"
                                    >Export for offline use"</span
                                ></strong
                            > - create a single-file distributable web server. To
                            see your slides, you simply have to execute it. This
                            file will work even if you don't have an internet connection,
                            and it is compatible with Windows, Linux and MacOS.
                        </li>
                        <li
                            style="margin: 0 !important; padding: 0 !important;"
                        >
                            <strong
                                ><span class="emph">Export for server"</span
                                ></strong
                            >
                            - this option should be used if you intend to host the
                            slides on your own server. In this case you will need
                            to:
                            <ul
                                class="text-lg m-2 list-disc"
                                style="margin-left: 3rem !important; margin-top: 0.3rem !important;"
                            >
                                <li
                                    style="margin: 0 !important; padding: 0 !important;"
                                >
                                    export the HTML file of the slides you have
                                    created
                                </li>
                                <li
                                    style="margin: 0 !important; padding: 0 !important;"
                                >
                                    download all requirements, provided in a ZIP
                                    file
                                </li>
                                <li
                                    style="margin: 0 !important; padding: 0 !important;"
                                >
                                    put all files in the same folder on your web
                                    server
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .btn-explanation {
        font-family: monospace;
        color: rgb(45, 170, 34);
    }

    .navbar-explanation {
        font-family: monospace;
        color: rgb(34, 150, 170);
    }
</style>
