<script lang="ts">
	import Tile from './Tile.svelte';
	import random from './random';
	import { currentNumber, lives, score } from './store';
	import playSound from './audio';

	const tileAmount = 8 * 6;
	let successfulRounds = 1;
	let flipTiles = false;
	let lost = false;

	$: randoms = random(tileAmount, successfulRounds + 3) as number[];

	function stageCleared(e) {
		if(successfulRounds >= 20) return;
		const { passed } = e.detail;
		if(!passed) {
			playSound('../sounds/incorrect.ogg', 0);
			lives.update(l => --l);

			lost = true;
			setTimeout(() => {lost = false}, 500)
		}

		setTimeout(() => {
			if(e.detail.passed) {
				successfulRounds++
				score.update(s => ++s);
			} else {
				// Recompute random values, but leave the amount of tiles the same
				randoms = random(tileAmount, successfulRounds + 3);
				
			}

			flipTiles = false;
			currentNumber.set(0);
		}, 300)
	}
</script>

<div class="game-container" class:incorrect={lost}>
	<!--Key to rerender each tile each time the board rebuilds. This is to prevent a bug where peices would not show up if they randomly get the same poition as the last game-->
	{#key randoms}
		{#each Array(tileAmount) as box, idx}
			<Tile
				index={randoms.indexOf(idx)}
				on:roundOver={stageCleared}
				on:flip={() => {flipTiles = true}}
				flipped={flipTiles}
			/>
		{/each}
	{/key}
</div>

<style>
	.game-container {
		--spacing: 0.6rem;
		--tile-dimensions: 5rem;
		--rows: 6;
		--cols: 8;
		background-image: linear-gradient(0.3turn, #f06292, #ec407a);
		height: 100%;
		width: 100%;
		border-radius: calc(var(--spacing) * 2);
		display: grid; 
  	grid-template-columns: repeat(var(--cols), 1fr); 
  	grid-template-rows: repeat(var(--rows), 1fr);
  	gap: var(--spacing);
		padding: calc(var(--spacing) * 1.25);
		box-shadow: rgba(0, 0, 0, 0.10) 0px 10px 20px, rgba(0, 0, 0, 0.13) 0px 6px 6px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.02) 0px 10px 10px -5px;
	}

	@media only screen and (max-width: 840px) {
		.game-container {
			--rows: 8;
			--cols: 6;
			--tile-dimensions: 3.5rem;
			--spacing: 0.4rem;
		}
	}

	.game-container.incorrect {
		animation: shake 0.5s ease-out;
	}

	@keyframes shake {
		0% {
			transform: translateX(0);
			filter: saturate(1.4);
		}

		20% {
			transform: translateX(-10px);
			filter: saturate(1.4);
		}

		40% {
			transform: translateX(10px);
			filter: saturate(1.32);
		}

		60% {
			transform: translateX(-10px);
			filter: saturate(1.2);
		}

		80% {
			transform: translateX(10px);
			filter: saturate(1.1);
		}

		100% {
			transform: translateX(0);
			filter: saturate(1);
		}
	}
</style>