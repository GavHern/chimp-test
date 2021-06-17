<script lang=ts>
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	import currentNumber from './store';

	export let index: number | null;
	export let flipped: boolean;

	const dispatch = createEventDispatcher();

	function roundOver(passed): void {
		dispatch('roundOver', {
			"passed": passed
		});
	}

	function clickHandler(e): void {
		e.target.parentElement.classList.add('hidden');

		if($currentNumber !== parseInt(e.target.dataset.index)) {
			document.querySelectorAll('.tile-container').forEach(e => e.classList.add('hidden'));
			roundOver(false);
			return;
		}
		
		// Runs when the stage is cleared
		if(document.querySelectorAll('.tile-container:not(.hidden)').length === 0) return roundOver(true);

		// Will only flip the tiles after the first one is clicked. Ignored if the tiles are already flipped to avoid redundancy
		if(!flipped) dispatch('flip');

		// Keep track of the number of tiles clicked
		currentNumber.update(n => ++n);
	}

</script>


<div 
	class="tile-container"
	class:hidden={index === -1}
	data-index={index}
>
	<button 
		class="tile"
		class:flipped
		data-index={index}
		on:click={clickHandler}
		in:scale={{duration: 200, delay: 200, opacity: 0.0, start: 0.6}}
	>
		{#if index !== -1}
			{index + 1}
		{/if}
	</button>
</div>


<style>
	.tile {
		--darken: #d81b60;
		--scale-amount: 1;
		--y-rotation: 0turn;
		--flipped-color: #f48fb1;

		height: var(--tile-dimensions);
		width: var(--tile-dimensions);
		background: transparent !important;
		border-radius: var(--spacing);
		border: var(--darken) calc(var(--spacing) / 2) solid;
		color: #ffffff;
		font-size: 2.2rem;
		font-weight: 500;
		margin: 0;
		line-height: 100%;

		transform-style: preserve-3d;
		transition: background-color 100ms;

		transform: rotateY(var(--y-rotation));
	}

	.tile:hover {
		background: var(--darken) !important;
	}

	.tile.flipped {
		--y-rotation: -.5turn;
		background: var(--flipped-color) !important;
		color: transparent;
		border-color: var(--flipped-color);

		transition:
			background-color 0ms ease 200ms,
			border-color 0ms ease 200ms,
			color 0ms ease 200ms,
			transform 700ms ease,
			filter 400ms ease;
	}

	.tile.flipped:hover {
		filter: brightness(1.1);
	}

	.tile-container {
		--scale-amount: 1;
		opacity: 1;
		pointer-events: auto;
		user-select: none;

		/* 3D Flip Effect*/
		perspective: 20rem;

		transition: opacity 200ms, transform 300ms;
		transform: scale(var(--scale-amount));
	}

	.tile-container.hidden {
		opacity: 0;
		pointer-events: none;
		--scale-amount: 0.6;
	}
</style>