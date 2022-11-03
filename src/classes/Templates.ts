import type { Types } from "../types";

interface BasicTemplate {
    getHtml(): string;
    getOverview(): string;

    html: HTMLElement;
    title: string;
}

class BodyTemplate implements BasicTemplate {
    constructor() {
        this.code = '';
        this.title = "Title";
    }

    encodedImage: string;
    imageAlt: string;
    text: string;
    quillDelta: string;
    code: string;
    html: HTMLElement;
    bodyType: Types;
    title: string;

    disablePointerEventsOnAllChildren(element: HTMLElement) {
        for (let i = 0; i < element.children.length; i++) {
            (element.children[i] as HTMLElement).style.pointerEvents = 'none';
            this.disablePointerEventsOnAllChildren((element.children[i] as HTMLElement));
        }
    }

    getOverview() {
        const overviewHTML = this.html.cloneNode(true) as HTMLElement;
        // Set pointer events none to all children of section elements in overviewHTML
        this.disablePointerEventsOnAllChildren(overviewHTML);
        return overviewHTML.innerHTML;
    }

    getHtml(): string {
        let slide: string = this.html.innerHTML;

        const encodedCode = this.code.replaceAll('"', '&quot;');

        // Remove all occurrences of contenteditable=true from listOfSlidesHTML
        slide = slide.replace(/contenteditable="true"/g, "");
        
        // Add contenteditable=true when you find a <python-editor></python-editor> tag
        slide = slide.replace(/<python-editor /g, `<python-editor contenteditable="true" code="${encodedCode}"`);

        // Add contenteditable=true when you find a <java-editor></java-editor> tag
        slide = slide.replace(/<java-editor /g, `<java-editor contenteditable="true" code="${encodedCode}"`);

        // Add contenteditable=true when you find a <javascript-editor></javascript-editor> tag
        slide = slide.replace(/<javascript-editor /g, `<javascript-editor contenteditable="true" code="${encodedCode}"`);

        // Add contenteditable=true when you find a <typescript-editor></typescript-editor> tag
        slide = slide.replace(/<typescript-editor /g, `<typescript-editor contenteditable="true" code="${encodedCode}"`);

        // Add contenteditable=true when you find a <sql-editor></sql-editor> tag
        slide = slide.replace(/<sql-editor /g, `<sql-editor contenteditable="true" code="${encodedCode}"`);

        return slide;
    }
        
}

class ColumnsTemplate implements BasicTemplate {
    constructor() {
        this.column1 = new BodyTemplate();
        this.column2 = new BodyTemplate();
        this.title = "Title";
    }

    column1: BodyTemplate;
    column2: BodyTemplate;
    title: string;
    html: HTMLElement;

    getHtml(): string {
        let col1: string = this.column1.getHtml();
        let col2: string = this.column2.getHtml();

        return `
            <div style="width: 85%; height: 70%; display: flex; justify-content: space-around; align-items: center; gap: 2.5%">
                ${col1}
                ${col2}
            </div>
        `;
    }

    getOverview(): string {
        let col1: string = this.column1.getOverview();
        let col2: string = this.column2.getOverview();

        return `
            <div style="width: 85%; height: 70%; display: flex; justify-content: space-around; align-items: center; gap: 2.5%">
                ${col1}
                ${col2}
            </div>
        `;
    }
}

class MainTemplate implements BasicTemplate {
    constructor() {
        this.title = "Title";
        this.subtitle = "Subtitle";
    }

    disablePointerEventsOnAllChildren(element: HTMLElement) {
        for (let i = 0; i < element.children.length; i++) {
            (element.children[i] as HTMLElement).style.pointerEvents = 'none';
            this.disablePointerEventsOnAllChildren((element.children[i] as HTMLElement));
        }
    }

    getHtml(): string {
        return this.html.innerHTML;
    }

    getOverview(): string {
        const overviewHTML = this.html.cloneNode(true) as HTMLElement;
        // Set pointer events none to all children of section elements in overviewHTML
        this.disablePointerEventsOnAllChildren(overviewHTML);
        return overviewHTML.innerHTML;
    }

    html: HTMLElement;
    title: string;
    subtitle: string;
}

export  {
    BodyTemplate,
    ColumnsTemplate,
    MainTemplate
}