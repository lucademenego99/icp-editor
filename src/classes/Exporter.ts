import type { Slide } from "./Slide";
import customStyleCSS from "../styles/custom-styles.css?inline";
import bundle from 'icp-bundle/dist/base/full.iife.js?raw';

/**
 * Class exposing functions to export the slides
 */
export default class Exporter {

    /**
     * Create the HTML code from the slides
     * @param slides array of slides
     * @param darkTheme whether the dark theme is enabled
     * @returns HTML code representing the slides
     */
    private static mapSlidesToHTML(slides: Slide[][], darkTheme: boolean) {
        return slides.map(
            (slides) =>
                "<section>" +
                slides
                    .map((slide) => `<section>${slide.getHtml(darkTheme)}</section>`)
                    .join("\n") +
                "</section>"
        )
            .join("\n");
    }

    /**
     * Generate a redbean single-file distributable web-server from the slides
     * @param revealSlides array of slides
     * @param darkTheme whether the dark theme is enabled
     * @param onWorkerMessage function to call when the worker sends a message
     */
    static generateRedbean(revealSlides: Slide[][], darkTheme: boolean, onWorkerMessage: (event: MessageEvent) => void): void {
        // For each element in revealSlides, get its innerHTML, put it inside a <section></section>tag, and add it to a newly created array
        const slidesHTML = this.mapSlidesToHTML(revealSlides, darkTheme);

        // Generate the HTML file
        const html = `
            <!DOCTYPE html>
            <html lang="en">
                ${this.getHtmlHeader(false, darkTheme)}
                ${this.getHtmlBody(slidesHTML, false, darkTheme)}
            </html>`;

        // Create a new web worker and ask it to generate the file
        // We need a worker because the file generation is a blocking operation
        const worker = new Worker(
            new URL("../lib/slidesExport.js", import.meta.url),
            {
                type: "module",
            }
        );
        worker.postMessage({ slides: html });

        // Wait for a response from the worker
        worker.onmessage = onWorkerMessage;
    }

    /**
     * Generate an HTML file from the slides
     * @param revealSlides array of slides
     * @param online whether the slides should require an internet connection
     * @param darkTheme whether the dark theme is enabled
     * @returns blob representing the HTML file
     */
    static generateHTML(revealSlides: Slide[][], online: boolean, darkTheme: boolean): Blob {
        // For each element in revealSlides, get its innerHTML, put it inside a <section></section>tag, and add it to a newly created array
        const slidesHTML = this.mapSlidesToHTML(revealSlides, darkTheme);

        // Generate the HTML file
        const html = `
            <!DOCTYPE html>
            <html lang="en">
                ${this.getHtmlHeader(online, darkTheme)}
                ${this.getHtmlBody(slidesHTML, online, darkTheme)}
            </html>`;

        // Create the blob file
        const blob = new Blob([html], {
            type: "text/html",
        });

        return blob;
    }

    /**
     * Generate the HTML header
     * @param online whether the slides should require an internet connection
     * @param darkTheme whether the dark theme is enabled
     * @returns HTML header
     */
    private static getHtmlHeader = (online: boolean, darkTheme: boolean) => `
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Interactive Code Playgrounds</title>

        <!-- Main Reveal Stylesheet -->
        <link rel="stylesheet" href="${online ? 'https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/reveal.css' : 'reveal.css'}">

        <!-- Blood Reveal Theme Stylesheet -->
        <link rel="stylesheet" href="${online ? (darkTheme ? 'https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/theme/blood.css' : 'https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/theme/white.css') : (darkTheme ? 'blood.css' : 'white.css')}" id="theme">

        <!-- Custom stylesheet to make reveal work with our playgrounds -->
        <style>
            ${customStyleCSS}
        </style>

        <!-- If the user asks for the pdf version, set section height to auto -->
        <!-- Otherwise reveal.js breaks if the section height is set to 100% -->
        <script>
            if (window.location.href.indexOf('?print-pdf') > -1) {
                // Create a new css element setting the height of .section to none
                var css = document.createElement("style");
                css.innerHTML = "section { height: auto; }";
                // Append the css to the head
                document.head.appendChild(css);
            }
        </script>

        <!-- Bundle containing the code playground web components -->
        ${online ? `<script>${bundle}</script>` : `<script src="full-offline.iife.js"></script>`}
    </head>`;

    /**
     * Generate the HTML body
     * @param slidesHtml HTML code representing the slides
     * @param online whether the slides should require an internet connection
     * @param darkTheme whether the dark theme is enabled
     * @returns HTML body
     */
    private static getHtmlBody = (slidesHtml: string, online: boolean, darkTheme: boolean) => `
        <body class="h-screen full-page-demo reveal-viewport" data-page="icp" style="transition: transform 0.8s ease 0s;">
            <div class="reveal slide focused has-horizontal-slides ready" role="application" data-transition-speed="default"
                data-background-transition="fade">
                <div class="slides">
                    ${slidesHtml}
                </div>
            </div>

            <!-- Import the main reveal script -->
            <script src="${online ? 'https://cdn.jsdelivr.net/npm/reveal.js@4.1.0/dist/reveal.js' : 'reveal.js'}"></script>

            <!-- Initialize reveal -->
            <script>
                Reveal.initialize({
                    // Display controls in the bottom right corner
                    controls: true,
                    // Display a presentation progress bar
                    progress: true,
                    // Push each slide change to the browser history
                    history: true,
                    // Enable keyboard shortcuts for navigation
                    keyboard: true,
                    // Enable the slide overview mode
                    overview: true,
                    // Set the width of the slides
                    width: "90%",
                    // Set the height of the slides
                    height: "90%",
                    // Vertical centering of slides
                    center: true,
                    // Loop the presentation
                    loop: false,
                    // Enables touch navigation on devices with touch input
                    touch: true,
                    // Apply a 3D roll to links on hover
                    rollingLinks: true,
                    // Transition style for full page slide backgrounds
                    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
                    // Select a theme
                    theme: '${darkTheme ? "blood" : "white"}',
                    // Select the type of slides transition
                    transition: 'slide',
                    // IMPORTANT: disable the default layout (centering and scaling) to make the code editors work correctly
                    disableLayout: true
                });
            </script>
        </body>`;
}