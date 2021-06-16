<script lang=ts>
	import { createEventDispatcher } from 'svelte';
	import { scale } from 'svelte/transition';
	export let index: number | null;
	export let flipped: boolean;

	const dispatch = createEventDispatcher();

	function roundOver(passed): void {
		setTimeout(() => {
			dispatch('roundOver', {
				"passed": passed
			});
		}, 300);
	}

	function clickHandler(e): void {
		e.target.classList.add('hidden');
		
		if(document.querySelectorAll('.tile:not(.hidden)').length === 0) roundOver(true);
		if(!flipped) dispatch('flip');
	}

</script>

<button 
	class="tile"
	class:hidden={index === -1}
	class:flipped
	data-index={index}
	on:click={clickHandler}
	in:scale={{duration: 200, delay: 200, opacity: 0.0, start: 0.6}}
>
	{#if index !== -1}
		{index + 1}
  {/if}
</button>

<style>
	.tile {
		--darken: #d81b60;
		--scale-amount: 1;
		--y-rotation: 0turn;

		height: var(--tile-dimensions);
		width: var(--tile-dimensions);
		background: transparent !important;
		border-radius: var(--spacing);
		border: #d81b60 calc(var(--spacing) / 2) solid;
		color: #ffffff;
		font-size: 2.2rem;
		font-weight: 500;
		margin: 0;
		line-height: 100%;
		opacity: 1;
		pointer-events: auto;

		transform-style: preserve-3d;
		transition: background-color 100ms, opacity 200ms, transform 300ms;

		transform: scale(var(--scale-amount)) rotateY(var(--y-rotation));
	}

	.tile:hover {
		background: var(--darken) !important;
	}

	.tile.hidden {
		opacity: 0;
		pointer-events: none;
		--scale-amount: 0.6;
	}

	.tile.flipped {
		--y-rotation: .5turn;
		background: #f48fb1 !important;
		color: transparent;
		border-color: #f48fb1;
	}
</style>