import { writable } from 'svelte/store';

const currentNumber = writable(0);

export default currentNumber;