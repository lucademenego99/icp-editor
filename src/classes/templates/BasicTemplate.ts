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
     * Build the main body of a slidde
     * @param bodyType which kind of element will the body contain
     * @returns Container element for the actual content
     */
    buildBody(bodyType: Types): HTMLDivElement {
        const body = document.createElement('div');
        body.style.width = '80%';
        body.style.height = '80%';
        body.style.display = "flex";
        body.style.flexDirection = "column";
        body.style.overflow = "auto";
        body.style.fontSize = "2rem";
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
     * @returns Container with the code editor
     */
    buildCode(codeText: string, language: Language): HTMLDivElement {
        const container = document.createElement('div');
        container.style.width = "100%";
        container.style.height = "100%";

        const code = document.createElement(`${language}-editor`);
        code.setAttribute('contenteditable', 'true');
        code.setAttribute('code', codeText);
        code.setAttribute("theme", "dark");
        code.setAttribute('type', 'normal');
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
    buildImage(encodedImage: string, imageAlt: string): HTMLImageElement {
        const image = document.createElement('img');
        image.setAttribute('src', encodedImage);
        image.setAttribute('alt', imageAlt);
        image.style.height = "100%";
        image.style.width = "100%";
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
    buildText(text: string): HTMLDivElement {
        const container = document.createElement('div');
        container.style.width = "100%";
        container.style.padding = "0 8%";
        container.style.boxSizing = "border-box";
        container.style.fontSize = "25px !important";
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