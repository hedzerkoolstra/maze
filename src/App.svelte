<script>

  // import { Router, Route, Link } from "svelte-routing";
  // import Home from "./pages/Home.svelte";
  // import About from "./pages/About.svelte";
  // export let url = "";
  // Store
  import { gameNumber, totalTrials } from "./store";

  // Components
  import GameBoard from "./components/GameBoard.svelte";
  import Score from "./components/ScoreScript.svelte";
  import Timer from "./components/Timer.svelte";
  import AfterGame from "./components/AfterGame.svelte";
  // import GameSettings from "./components/GameSettings.svelte";


</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 600px;
    margin: 0 auto;
    height: 100%;
  }

  h1 {
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
    margin: 1rem;
  }
</style>

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

  {#if $totalTrials > $gameNumber}
    <GameBoard />
    <Score />
    <Timer />
    <!-- <GameSettings /> -->
  {:else}
    <AfterGame />
  {/if}
</main>
