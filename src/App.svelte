<script lang="ts">
	import GameContainer from './GameContainer.svelte';
</script>

<main>
	<div class="content">
		<GameContainer />
	</div>
</main>

<style>
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