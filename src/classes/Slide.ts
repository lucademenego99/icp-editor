import type { Language, Layouts } from "src/types";
import { RevealInstance } from "../stores";

export class Slide {
    indexH: number;
    indexV: number;
    layout: Layouts;
    html: HTMLElement;
    language: Language;
    code: string;

    constructor(indexH: number, indexV: number, language: Language, layout: Layouts) {
        this.indexH = indexH;
        this.indexV = indexV;
        this.layout = layout;
        this.language = language;
        this.code = '';
    }

    setLanguage(language: Language) {
        this.html.innerHTML = this.html.innerHTML.replaceAll(this.language, language);
        this.language = language;
    }

    getHtml() {
        let slide: string = this.html.innerHTML;

        this.code = this.code.replaceAll('"', '&quot;');

        // Remove all occurrences of contenteditable=true from listOfSlidesHTML
        slide = slide.replace(/contenteditable="true"/g, "");
        
        // Add contenteditable=true when you find a <python-editor></python-editor> tag
        slide = slide.replace(/<python-editor /g, `<python-editor contenteditable="true" code="${this.code}"`);

        // Add contenteditable=true when you find a <java-editor></java-editor> tag
        slide = slide.replace(/<java-editor /g, `<java-editor contenteditable="true" code="${this.code}"`);

        // Add contenteditable=true when you find a <javascript-editor></javascript-editor> tag
        slide = slide.replace(/<javascript-editor /g, `<javascript-editor contenteditable="true" code="${this.code}"`);

        // Add contenteditable=true when you find a <typescript-editor></typescript-editor> tag
        slide = slide.replace(/<typescript-editor /g, `<typescript-editor contenteditable="true" code="${this.code}"`);

        // Add contenteditable=true when you find a <sql-editor></sql-editor> tag
        slide = slide.replace(/<sql-editor /g, `<sql-editor contenteditable="true" code="${this.code}"`);

        return slide;
    }
}