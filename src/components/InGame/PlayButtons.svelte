
<script>
import { timeLeft, totalTime, gameIsUntouched, gameNumber, gameIsPlaying, triggerReplay } from "../../store";

function startTimer() {
    $timeLeft = $totalTime;
    console.log('once');
    gameIsPlaying.set(true);
    gameIsUntouched.set(false);
    let timer = setInterval(function () {
      timeLeft.update((n) => n - 1);
      console.log(timeLeft);
      if ($timeLeft == 0) {
        console.log("works2");
        gameNumber.update((n) => n + 1);
        gameIsPlaying.set(false);
        clearInterval(timer);
      }
    }, 1000);
  }

  function refreshGame() {
    triggerReplay.set(true);
  }
</script>
{#if !$gameIsPlaying}

<div class="buttons">
  {#if $gameIsUntouched}
    <button class="btn" on:click={startTimer}>
      <img src="./icons/play.png" alt="" />
    </button>
  {:else}
    <button class="btn" on:click={refreshGame}>
      <img src="./icons/refresh.png" alt="" />
    </button>
  {/if}
</div>
{/if}

<style>
  .buttons {
    position: absolute;
    background-color: rgba(95, 78, 78, 0.6);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
