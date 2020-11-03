<script>
import GameBoard from './components/game/GameBoard.svelte'
import Score from './components/Score.svelte'


</script>

<main>
	<h1>Maze</h1>

	<!-- <p>
		Rules of the game:
	</p>
	<ul>
		<li>You start on the tile with the red dot.</li>
		<li>Find your way to the endpoint somewhere in the maze.</li>
		<li>Click on the tiles to see their color.</li>
		<li>Black tiles are impassable.</li>
	</ul> -->
	<GameBoard />
	<Score />

</main>



<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 600px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		margin: 1rem;
	}
ul {
	padding: 0;
}
	p, li {
		text-transform: uppercase;
		font-weight: 100;
		list-style: none;
		text-align: left;
	}

	@media (min-width: 640px) {
		main {
			/* max-width: none; */
		}
	}
</style>