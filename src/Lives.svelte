<script lang="ts">
import { each } from "svelte/internal";

	export let lives: number;
	export let totalLives: number;
</script>

<div class="lives-container">
	{#each Array(totalLives) as life, idx}
		<svg xmlns="http://www.w3.org/2000/svg" class="icon" class:disabled={lives < idx + 1} fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
		</svg>	
	{/each}
</div>

<style>
	.lives-container {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.4rem;
	}

	.icon {
		--size: 2.5rem;
		height: var(--size);
		width: var(--size);
		color: #f50057;

		transition: color 300ms;
	}

	.icon.disabled {
		color: #bdbdbd;
	}
</style>