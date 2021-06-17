import { writable } from 'svelte/store';

export const currentNumber = writable(0);
export const lives = writable(3);
export const score = writable(0);