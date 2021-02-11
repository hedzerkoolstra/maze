<script>
  import { timeLeft, gameIsPlaying, gameNumber, totalTrials, clickedBlack, clickedColored } from "../../store";
</script>

<div class="game-info">
  <span>Trials: {$gameNumber + 1}/{$totalTrials}</span>
  <span>|</span>
  <span>Score: {$clickedColored}/{$clickedBlack + $clickedColored} </span>
  {#if $gameIsPlaying}
    <span>|</span>
    <div class="timer">
      <span
        >Time left:
        {$timeLeft}
      </span>
    </div>
  {/if}
</div>

<style>
  .game-info {
    display: flex;
    margin-top: 1rem;
  }
  .game-info span {
    margin-right: 2rem;
    font-weight: bold;
  }
  .timer {
  }
  /* .timer span {
    font-size: 2rem;
    color: #fe5f55;
  } */
</style>
