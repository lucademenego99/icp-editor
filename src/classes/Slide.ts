import { Layouts, type Language, type Types } from "../types";
import MainTemplate from "./templates/MainTemplate";
import BodyTemplate from "./templates/BodyTemplate";
import ColumnsTemplate from "./templates/ColumnsTemplate";
import { v4 as uuidv4 } from 'uuid';

/**
 * Slide class
 * @description This class is used to create a slide
 * @see https://revealjs.com/
 */ 
export class Slide {

    /**
     * ID of the slide
     * @type {string}
     * @description This is used to identify the slide
     * @see uuidv4
     */
    id: string;

    /**
     * Horizontal index of the slide
     * @type {number}
     * @description This is used to identify the slide horizontally
     */
    indexH: number;

    /**
     * Vertical index of the slide
     * @type {number}
     * @description This is used to identify the slide vertically
     * @see https://revealjs.com/vertical-slides/
     */
    indexV: number;

    /**
     * Layout chosen for the slide
     * @type {Layouts}
     */
    layout: Layouts;

    /**
     * Template of the slide
     * @type {MainTemplate | BodyTemplate | ColumnsTemplate}
     * @description This is the template the slide will use, containing all information needed to generate the HTML
     */
    template: MainTemplate | BodyTemplate | ColumnsTemplate;

    constructor(indexH: number, indexV: number, language: Language, layout: Layouts) {
        this.id = uuidv4();
        this.indexH = indexH;
        this.indexV = indexV;
        this.layout = layout;
        switch (layout) {
            case Layouts.BODY:
                this.template = new BodyTemplate(language);
                break;
            case Layouts.COLUMNS:
                this.template = new ColumnsTemplate(language);
                break;
            case Layouts.MAIN:
                this.template = new MainTemplate();
                break;
        }
    }

    /**
     * Set a new layout for the slide
     * @param {Layouts} layout New layout
     * @param {Language} language Currently selected programming language
     * @description This is used to change the layout of the slide
     * @see Layouts
     */
    setLayout(layout: Layouts, language: Language) {
        // Get the language used in the current layout
        let usedLang: Language;
        if (this.template instanceof BodyTemplate) {
            usedLang = this.template.language;
        } else if (this.template instanceof ColumnsTemplate) {
            usedLang = this.template.column1.language;
        } else {
            usedLang = language;
        }

        // Switch layout
        this.layout = layout;
        switch (layout) {
            case Layouts.BODY:
                this.template = new BodyTemplate(usedLang);
                break;
            case Layouts.COLUMNS:
                this.template = new ColumnsTemplate(usedLang);
                break;
            case Layouts.MAIN:
                this.template = new MainTemplate();
                break;
        }
    }

    /**
     * Set a new language for the slide
     * @param {Language} language New language
     * @description This is used to change the language of the slide
     * @see Language
     */
    setLanguage(language: Language) {
        if (this.template instanceof BodyTemplate) {
            this.template.language = language;
        } else if (this.template instanceof ColumnsTemplate) {
            this.template.column1.language = language;
            this.template.column2.language = language;
        }
    }

    /**
     * Generate the HTML of the slide
     * @param {boolean} darkTheme Whether the dark theme is enabled or not
     * @returns {HTMLElement} HTML of the slide
     * @description This is used to generate the HTML of the current slide
     * @see https://revealjs.com/
     */ 
    getHtml(darkTheme: boolean) {
        return this.template.generateHtml(darkTheme).innerHTML;
    }

    /**
     * Get the overview of the slide
     * @param {boolean} darkTheme Whether the dark theme is enabled or not
     * @returns {HTMLElement} overview of the slide
     * @description This is used to show a general overview of all slides where the user can move them
     */ 
    getOverview(darkTheme: boolean) {
        return this.template.getOverview(darkTheme).innerHTML;
    }
}