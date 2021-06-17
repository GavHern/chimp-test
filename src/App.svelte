<script lang="ts">
	import GameContainer from './GameContainer.svelte';
	import { lives } from './store';
</script>

<h1>Chimp test</h1>

<main>
	{#if $lives > 0}
		<div class="content">
			<GameContainer />
		</div>
	{:else}
		<h2>You lost!</h2>
	{/if}
</main>

<style>
	:global(html, body) {
		overflow: hidden;
		height: 100vh;
	}

	h1 {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		text-align: center;
		padding-top: 1.4rem;
		font-size: 2.4rem;
	}
	main {
		height: 100vh;
		width: 100vw;
		display: grid;
		place-items: center;
	}

	.content {
		width: min-content;
		height: min-content;
	}
</style>