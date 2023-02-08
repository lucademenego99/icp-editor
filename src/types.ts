/**
 * All the available layouts
 */
export enum Layouts {
    MAIN = 0,
    BODY = 1,
    COLUMNS = 2
}

/**
 * Names of the layouts
 */
export let LayoutsNames = ['title page', 'one big element', 'two columns'];

/**
 * All the available elements that can be put in the slides
 */
export enum Types {
    TEXT = 0,
    CODE = 1,
    IMAGE = 2
}

/**
 * All the available languages for code editors
 */
export type Language = "python" | "java" | "cpp" | "javascript" | "typescript" | "sql" | "p5" | "processing";