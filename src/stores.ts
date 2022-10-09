import { writable, type Writable } from 'svelte/store';
import { Slide } from './classes/Slide';
import { Layouts } from './types';

/**
 * Current instance of the Reveal Plugin
 */
export const RevealInstance: any = writable(null);

/**
 * Chosen layouts of the slides created by the user
 */
export const revealSlides: Writable<Array<Array<Slide>>> = writable([[new Slide(0, 0, Layouts.MAIN)]]);

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
export const currentLanguage: Writable<string> = writable("python");