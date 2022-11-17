import BasicTemplate from "./BasicTemplate";

/**
 * Template for the Main layout
 */
export default class MainTemplate extends BasicTemplate {
    constructor() {
        super();
        this.subtitle = "Subtitle";
    }

    /**
     * Build a subtitle element
     * @returns {HTMLParagraphElement} subtitle element
     * @description This is used to build the subtitle element
     */
    buildSubtitle(): HTMLParagraphElement {
        const subtitle = document.createElement('p');
        subtitle.classList.add('subtitle');
        subtitle.innerText = this.subtitle;
        return subtitle;
    }

    /**
     * Generate the HTML of the template
     * @returns {HTMLElement} HTML of the template
     * @description This is used to generate the HTML of the current template
     */ 
    generateHtml(): HTMLElement {
        const section = document.createElement('section');
        section.appendChild(this.buildTitle());
        section.appendChild(this.buildSubtitle());
        return section;
    }

    /**
     * Get the overview of the template
     * @returns {HTMLElement} overview of the template
     * @description This is used to show a general overview of all slides where the user can move them
     */
    getOverview(): HTMLElement {
        const overviewHTML = this.generateHtml();
        // Set pointer events none to all children of section elements in overviewHTML
        this.disablePointerEventsOnAllChildren(overviewHTML);
        return overviewHTML;
    }

    /**
     * Subtitle of the template
     * @type {string}
     */
    subtitle: string;
}