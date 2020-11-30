<script>
  import { totalTime, gameIsPlaying, gameIsUntouched, gameNumber, triggerReplay } from '../../store'

  let timeLeft

  function startTimer() {
    timeLeft = $totalTime;  
    gameIsPlaying.set(true)
    gameIsUntouched.set(false) 
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
  .timer span {
    font-size: 2rem;
    color:#fe5f55;
  }
  
</style>

<div class="timer">

    {#if $gameIsPlaying}
        <span>{timeLeft}</span> 
    {:else}
        
    <div class="buttons">
        
        {#if $gameIsUntouched}

        <button class="btn" on:click={startTimer}>
          <img src="./icons/play.png" alt="">
        </button>

        {:else}

        <button class="btn" on:click={refreshGame}>
          <img src="./icons/refresh.png" alt="">
        </button>

        {/if}

    </div>

    {/if}
</div>
