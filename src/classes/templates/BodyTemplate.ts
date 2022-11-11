import { Types, type Language } from "../../types";
import BasicTemplate from "./BasicTemplate";

/**
 * Template for the Body layout
 */
export default class BodyTemplate extends BasicTemplate {

    /**
     * Create a new BodyTemplate
     * @param language programming language of the code editor
     */
    constructor(language) {
        super();
        this.language = language;
        this.code = '';
    }

    /**
     * Image encoded in base64
     * @type {string}
     */
    encodedImage: string;

    /**
     * Alt text for the image
     * @type {string}
     * @example 'A picture of a cat'
     * @description This is used for accessibility purposes
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt
     */
    imageAlt: string;

    /**
     * Text to put inside the container
     * @type {string}
     */
    text: string;

    /**
     * Delta element containing details to reconstruct the quill editor
     * @type {Delta}
     * @see https://quilljs.com/docs/delta/
     */
    quillDelta: any;

    /**
     * Code to put inside the container
     * @type {string}
     * @description This is used for the code editor
     */
    code: string;

    /**
     * Type of element the body will contain
     * @type {Types}
     */
    bodyType: Types;

    /**
     * Language used by the code editor
     * @type {Language}
     * @description This is used for the code editor
     * @see https://github.com/lucademenego99/icp-bundle
     */
    language: Language;

    /**
     * Get the overview of the template
     * @param {boolean} darkTheme if the dark theme is enabled
     * @returns {HTMLElement} overview of the template
     * @description This is used to show a general overview of all slides where the user can move them
     */
    getOverview(darkTheme: boolean): HTMLElement {
        const overviewHTML = this.generateHtml(darkTheme);
        // Set pointer events none to all children of section elements in overviewHTML
        this.disablePointerEventsOnAllChildren(overviewHTML);
        return overviewHTML;
    }

    /**
     * Generate the HTML of the template
     * @param {boolean} darkTheme if the dark theme is enabled
     * @returns {HTMLElement} HTML of the template
     * @description This is used to generate the HTML of the current template
     */ 
    generateHtml(darkTheme: boolean): HTMLElement {
        const section = document.createElement('section');
        section.appendChild(this.buildTitle());

        const body = this.buildBody(this.bodyType);
        switch (this.bodyType) {
            case Types.CODE:
                body.appendChild(this.buildCode(this.code, this.language, darkTheme));
                break;
            case Types.IMAGE:
                body.appendChild(this.buildImage(this.encodedImage, this.imageAlt));
                break;
            case Types.TEXT:
                body.appendChild(this.buildText(this.text));
                break;
        }
        section.appendChild(body);
        return section;
    }   
}