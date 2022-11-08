import { writable, type Writable } from 'svelte/store';
import { Slide } from './classes/Slide';
import { Layouts, type Language } from './types';

/**
 * Current instance of the Reveal Plugin
 */
export const RevealInstance: any = writable(null);

/**
 * Chosen layouts of the slides created by the user
 */
export const revealSlides: Writable<Array<Array<Slide>>> = writable([[new Slide(0, 0, "python", Layouts.MAIN)]]);

/**
 * Inner HTML of all the slides created by the user
 */
export const slidesHTML = writable("");

/**
 * Current horizontal slide the user is modifying
 */
export const currentSlideH: Writable<number> = writable(0);

/**
 * Current vertical slide the user is modifying
 */
export const currentSlideV: Writable<number> = writable(0);

/**
 * Current language selected by the user
 */
export const currentLanguage: Writable<Language> = writable("typescript");

/**
 * Name of the slide deck
 */
export const deckName: Writable<string> = writable("untitled");

/**
 * Whether the overview mode is active or not
 */
export const showOverview: Writable<boolean> = writable(false);

/**
 * Whether the help modal is active or not
 */
 export const showHelp: Writable<boolean> = writable(false);