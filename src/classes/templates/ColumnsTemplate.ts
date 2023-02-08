import { Types, type Language } from "../../types";
import BasicTemplate from "./BasicTemplate";
import BodyTemplate from "./BodyTemplate";

/**
 * Template for the Columns layout
 */
export default class ColumnsTemplate extends BasicTemplate {

    /**
     * Create a new ColumnsTemplate
     * @param language programming language of the code editor
     */
    constructor(language: Language) {
        super();
        this.column1 = new BodyTemplate(language);
        this.column2 = new BodyTemplate(language);
    }

    /**
     * First column
     * @type {BodyTemplate}
     * @description This is the first column of the current template
     */
    column1: BodyTemplate;

    /**
     * Second column
     * @type {BodyTemplate}
     * @description This is the second column of the current template
     */
    column2: BodyTemplate;

    /**
     * Language used by the code editor
     * @type {Language}
     * @description This is used for the code editor
     * @see https://github.com/lucademenego99/icp-bundle
     */
    language: Language;

    /**
     * Build a column element
     * @returns {HTMLElement} column element
     */
    buildColumn() {
        const column = document.createElement('div');
        column.style.width = "100%";
        column.style.height = "100%";
        column.style.overflow = "auto";
        column.style.flex = "1 1 auto";
        return column;
    }

    /**
     * Generate the HTML of the template
     * @returns {HTMLElement} HTML of the template
     * @description This is used to generate the HTML of the current template
     */ 
    generateHtml(darkTheme: boolean): HTMLElement {
        const section = document.createElement('section');
        section.appendChild(this.buildTitle());

        const container = document.createElement('div');
        container.style.width = "min(85vw, 170vh)";
        container.style.height = "min(35vw, 70vh)";
        container.style.display = "flex";
        container.style.justifyContent = "space-around";
        container.style.alignItems = "center";
        container.style.gap = "min(3vw, 6vh)";

        const column1 = this.buildColumn();
        const body1 = this.buildBody(this.column1.bodyType);
        body1.style.width = "100%";
        body1.style.height = "100%";
        switch (this.column1.bodyType) {
            case Types.CODE:
                body1.appendChild(this.buildCode(this.column1.code, this.column1.language, darkTheme));
                break;
            case Types.IMAGE:
                body1.appendChild(this.buildImage(this.column1.encodedImage, this.column1.imageAlt));
                break;
            case Types.TEXT:
                body1.appendChild(this.buildText(this.column1.text));
                break;
        }
        column1.appendChild(body1);
        container.appendChild(column1);

        const column2 = this.buildColumn();
        const body2 = this.buildBody(this.column2.bodyType);
        body2.style.width = "100%";
        body2.style.height = "100%";
        switch (this.column2.bodyType) {
            case Types.CODE:
                body2.appendChild(this.buildCode(this.column2.code, this.column2.language, darkTheme));
                break;
            case Types.IMAGE:
                body2.appendChild(this.buildImage(this.column2.encodedImage, this.column2.imageAlt));
                break;
            case Types.TEXT:
                body2.appendChild(this.buildText(this.column2.text));
                break;
        }
        column2.appendChild(body2);
        container.appendChild(column2);

        section.appendChild(container);
        return section;
    }

    /**
     * Get the overview of the template
     * @returns {HTMLElement} overview of the template
     * @description This is used to show a general overview of all slides where the user can move them
     */
    getOverview(darkTheme): HTMLElement {
        const overviewHTML = this.generateHtml(darkTheme);
        // Set pointer events none to all children of section elements in overviewHTML
        this.disablePointerEventsOnAllChildren(overviewHTML);
        return overviewHTML;
    }
}