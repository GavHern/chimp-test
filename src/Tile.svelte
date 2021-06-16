<script lang=ts>
	import { createEventDispatcher } from 'svelte';
	export let index: number | null;

	const dispatch = createEventDispatcher();

	function passed(): void {
		dispatch('passed')
	}

	function clickHandler(e): void {
		e.target.classList.add('hidden');
		
		if(document.querySelectorAll('.tile:not(.hidden)').length === 0) passed();
	}

</script>

<button class="tile" class:hidden={index === -1} data-index={index} on:click={clickHandler}>
	{#if index !== -1}
		{index + 1}
  {/if}
</button>

<style>
	.tile {
		--darken: #d81b60;
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

		transition: background-color 100ms, opacity 200ms;
	}

	.tile:hover {
		background: var(--darken) !important;
	}

	.tile.hidden {
		opacity: 0;
		pointer-events: none;
	}
</style>