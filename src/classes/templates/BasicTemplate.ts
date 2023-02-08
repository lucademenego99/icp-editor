import { Types, type Language } from "../../types";

/**
 * Basic template class that will be extended by other template classes.
 */
export default class BasicTemplate {
    constructor() {
        this.title = "Title";
    }

    /**
     * Build the main title of a template
     * @returns title h3 element
     */
    buildTitle(): HTMLHeadingElement {
        const title = document.createElement('h3');
        title.classList.add('title');
        title.innerText = this.title;
        return title;
    }

    /**
     * Build the main body of a slide
     * @param bodyType which kind of element will the body contain
     * @returns Container element for the actual content
     */
    buildBody(bodyType: Types, isOverview: boolean = false): HTMLDivElement {
        const body = document.createElement('div');
        body.style.width = isOverview ? '80%' : 'min(80vw, 160vh)';
        body.style.height = isOverview ? '80%' : 'min(40vw, 80vh)';
        body.style.display = "flex";
        body.style.flexDirection = "column";
        body.style.overflow = "auto";
        if (bodyType === Types.TEXT) {
            body.style.textAlign = "start";
        } else {
            body.style.justifyContent = "center";
            body.style.alignItems = "center";
        }
        return body;
    }

    /**
     * Build an Interactive Code Playgrounds element
     * @param codeText code that must be put inside the element
     * @param language used language by the code editor
     * @param darkTheme if the dark theme is enabled
     * @returns Container with the code editor
     */
    buildCode(codeText: string, language: Language, darkTheme: boolean, isOverview: boolean = false): HTMLDivElement {
        const container = document.createElement('div');
        container.style.width = "100%";
        container.style.height = "100%";

        const code = document.createElement(`${language}-editor`);
        code.setAttribute('contenteditable', 'true');
        code.setAttribute('code', codeText);
        code.setAttribute("theme", darkTheme ? "dark" : "light");
        code.setAttribute('type', language == "p5" || language == "processing" ? 'vertical' : 'normal');
        code.style.height = "100%";
        code.style.width = "100%";

        container.appendChild(code);
        return container;
    }

    /**
     * Build an image element
     * @param encodedImage image encoded in base64
     * @param imageAlt alt text for the image
     * @returns image element
     */
    buildImage(encodedImage: string, imageAlt: string, isOverview: boolean = false): HTMLImageElement {
        const image = document.createElement('img');
        image.setAttribute('src', encodedImage);
        image.setAttribute('alt', imageAlt);
        image.style.height = isOverview ? '100%' : "min(45vw, 80vh)";
        image.style.width = isOverview ? '100%' : "min(80vw, 160vh)";
        image.style.objectFit = "contain";
        image.style.margin = "0";
        image.style.padding = "0";
        return image;
    }

    /**
     * Build a container for a text portion
     * @param text text to put inside the container
     * @returns Container with text inside it
     */
    buildText(text: string, isOverview: boolean = false): HTMLDivElement {
        const container = document.createElement('div');
        container.style.width = "100%";
        container.style.padding = isOverview ? '0 8%' : "0 min(2vw, 4vh)";
        container.style.boxSizing = "border-box";
        container.innerHTML = text;
        return container;
    }

    /**
     * Disable pointer events on all children of a given element, recursively
     * @param element element to disable pointer events on
     */
    disablePointerEventsOnAllChildren(element: HTMLElement) {
        for (let i = 0; i < element.children.length; i++) {
            (element.children[i] as HTMLElement).style.pointerEvents = 'none';
            this.disablePointerEventsOnAllChildren((element.children[i] as HTMLElement));
        }
    }

    /**
     * Main title of the slide
     */
    title: string;
}