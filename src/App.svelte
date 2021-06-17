<script lang="ts">
	import GameContainer from './GameContainer.svelte';
	import { lives, score } from './store';
	import { fly, scale } from 'svelte/transition';
	import LivesCounter from './Lives.svelte';

	function retry() {
		lives.set(3);
		score.set(0);
	}
</script>

<h1 class="title">Chimp test</h1>

<main>
	{#if $lives > 0}
		<div class="content" 	in:scale={{duration: 200, opacity: 0, start: 0.8}}>
			<GameContainer />
		</div>
	{:else}
		<div class="game-over" in:fly={{duration: 500, y: 50,opacity: 0,}}>
			<h2>Score: {$score}</h2>
			<button class="retry-button" on:click={retry}>
				<svg xmlns="http://www.w3.org/2000/svg" class="rety-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
				</svg>
				Try Again!
			</button>
		</div>
	{/if}
</main>

<div class="lives-counter">
	<LivesCounter totalLives={3} lives={$lives}/>
</div>

<style>
	.title {
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

	.game-over {
		text-align: center;
	}

	.lives-counter {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
	}

	.retry-button {
		--content-size: 2rem;
		background: #ec407a;
		color: #ffffff;
		border: none;
		border-radius: 0.4rem;
		display: flex;
		align-items: center;
		font-size: calc(var(--content-size) * 0.75);
		line-height: 100%;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}

	.retry-button:hover, .retry-button:focus {
		background: #f06292;
	}

	.rety-icon {
		padding-right: calc(var(--content-size) / 2);
		height: var(--content-size);
		width: var(--content-size);
	}
</style>