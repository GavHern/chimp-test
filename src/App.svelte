<script lang="ts">
	import GameContainer from './GameContainer.svelte';
</script>

<h1>Chimp test</h1>

<main>
	<div class="content">
		<GameContainer />
	</div>
</main>

<style>
	:global(html) {
		overflow: hidden;
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
		width: 100hw;
		display: grid;
		place-items: center;
	}

	.content {
		width: min-content;
		height: min-content;
	}
</style>