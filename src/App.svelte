<script>

  import { appState, gameIsPlaying, gameNumber, totalTrials } from "./store";

  gameIsPlaying.subscribe((isPlaying) => {
    if(!isPlaying && $gameNumber == $totalTrials) {
      appState.update((n) => n + 1)
    }
  })

  // Components
  import BeforeGame from "./components/BeforeGame.svelte";
  import InGame from "./components/InGame/InGame.svelte";
  import AfterGame from "./components/AfterGame.svelte";
  let views = [BeforeGame, InGame, AfterGame]

</script>


<main>
  <h1>Maze</h1>
  <svelte:component this={views[$appState]}/>
  <!-- <BeforeGame />
  <InGame />
  <AfterGame /> -->

</main>
