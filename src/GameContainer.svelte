<script lang="ts">
	import Tile from './Tile.svelte';
	import random from './random';
	import currentNumber from './store';

	const tileAmount = 8 * 6;
	let numberOfShownTiles = 1;
	let flipTiles = false;

	$: randoms = random(tileAmount, numberOfShownTiles + 3) as number[];

	function stageCleared(e) {
		if(e.detail.passed) numberOfShownTiles++;
		else {
		  // Recompute random values, but leave the amount of tiles the same
			randoms = random(tileAmount, numberOfShownTiles + 3);
		}

		flipTiles = false;
		currentNumber.set(0);
	}
</script>

<div class="game-container">
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
		background-image: linear-gradient(0.3turn, #f06292, #ec407a);
		height: 100%;
		width: 100%;
		border-radius: calc(var(--spacing) * 2);
		display: grid; 
  	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
  	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr; 
  	gap: var(--spacing);
		padding: calc(var(--spacing) * 1.25);
		box-shadow: rgba(0, 0, 0, 0.10) 0px 10px 20px, rgba(0, 0, 0, 0.13) 0px 6px 6px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.02) 0px 10px 10px -5px;
	}
</style>