import { writable } from 'svelte/store';
import { Layouts } from './types';

/**
 * Current instance of the Reveal Plugin
 */
export const RevealInstance: any = writable(null);

/**
 * Chosen layouts of the slides created by the user
 */
export const revealSlides = writable([Layouts.MAIN]);

/**
 * Inner HTML of all the slides created by the user
 */
export const slidesHTML = writable("");