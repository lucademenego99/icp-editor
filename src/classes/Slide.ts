import { Layouts, type Language, type Types } from "../types";
import { BodyTemplate, ColumnsTemplate, MainTemplate } from "./Templates";
import { v4 as uuidv4 } from 'uuid';

export class Slide {
    id: string;
    indexH: number;
    indexV: number;
    layout: Layouts;
    language: Language;
    template: any;

    constructor(indexH: number, indexV: number, language: Language, layout: Layouts) {
        this.id = uuidv4();
        this.indexH = indexH;
        this.indexV = indexV;
        this.layout = layout;
        this.language = language;
        switch (layout) {
            case Layouts.BODY:
                this.template = new BodyTemplate();
                break;
            case Layouts.COLUMNS:
                this.template = new ColumnsTemplate();
                break;
            case Layouts.MAIN:
                this.template = new MainTemplate();
                break;
        }
    }

    setLayout(layout: Layouts) {
        switch (layout) {
            case Layouts.BODY:
                this.template = new BodyTemplate();
                break;
            case Layouts.COLUMNS:
                this.template = new ColumnsTemplate();
                break;
            case Layouts.MAIN:
                this.template = new MainTemplate();
                break;
        }
        this.layout = layout;
    }

    setLanguage(language: Language) {
        this.language = language;
    }

    getHtml() {
        return this.template.getHtml();
    }

    getOverview() {
        return this.template.getOverview();
    }
}