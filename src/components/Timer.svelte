<script>
  import { totalTime, gameIsPlaying, gameIsFresh, gameNumber, triggerReplay } from '../store'

  let timeLeft

  function startTimer() {
    timeLeft = $totalTime;  
    gameIsPlaying.set(true)
    gameIsFresh.set(false) 
    let timer = setInterval(function () {
      timeLeft--
      if (timeLeft == 0) {   
        gameNumber.update(n => n + 1)    
        gameIsPlaying.set(false)
        clearInterval(timer);
      }
    }, 1000);
  }

  function refreshGame() {
      triggerReplay.set(true)
  }


</script>

<style>
  .timer {
    margin-top: 1rem;
  }
  .timer .buttons {
      display: flex;
      justify-content: center;
  }
  .timer .btn {
    background-color: #ff3e00;
    color: white;
    border: none;
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
    margin: 0 1rem;
  }

  .timer span {
    font-size: 1.5rem;
    color: #ff3e00;
  }
</style>

<div class="timer">

    {#if $gameIsPlaying}
        <span>Time left: {timeLeft}</span> 
    {:else}
        
    <div class="buttons">
        
        {#if $gameIsFresh}
        <button class="btn" on:click={startTimer}>Start</button>
        {:else}
        <button class="btn" on:click={refreshGame}>Play Again</button>
        {/if}

    </div>

    {/if}
</div>
