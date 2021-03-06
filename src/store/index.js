import { writable } from 'svelte/store';

// State
export const appState = writable(0)
export const gameIsPlaying = writable(false)
export const gameIsUntouched = writable(true)
export const gameNumber = writable(0)
export const triggerReplay = writable(false)
export const activeLocale = writable('english')

// Settings
export const totalTime = writable(30);
export const gridSize = writable(18);
export const mazeLength = writable(50);
export const totalTrials = writable(12);
export const timeLeft = writable(30);

//Score
export const clickedColored = writable(0);
export const clickedBlack = writable(0);
export const playerInfo = writable({});



