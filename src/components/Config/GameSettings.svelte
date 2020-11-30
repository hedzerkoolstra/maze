<script>
  // Store
  import { totalTime, gridSize, mazeLength, totalTrials } from "../../store";

  // Database
  import { db } from '../../firestore.js'

  // Variables
  let word = 'this'
  let showPopup;
  let inputTotalTime = $totalTime
  let inputGridSize = $gridSize
  let inputMazeLength = $mazeLength
  let inputTotalTrials = $totalTrials
  let gameSettings = [
    {
      class: 'gridsize',
      desc: 'Number of tiles',
      value: inputGridSize
    },
    {
      class: 'maze-length',
      desc: 'Length of maze',
      value: inputMazeLength
    },
    {
      class: 'total-time',
      desc: 'Time per trial',
      value: inputTotalTime
    },
    {
      class: 'total-trials',
      desc: 'Amount fo trials',
      value: inputTotalTrials
    },

  ]

  // Functions
  function togglePopup() {
    showPopup = !showPopup;
  }

  function saveSettings() {
    console.log(inputTotalTime);
    let settings = {   
      gridSize: inputGridSize,
      mazeLength: inputMazeLength,
      totalTime: inputTotalTime,
      totalTrials: inputTotalTrials
    }
    db.collection('Settings').doc('all').set(settings)
  }
</script>

<style>
  .game-settings {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
  }
</style>

<div class="game-settings">
  <div class="settings__btn" on:click={togglePopup}><span>S</span></div>
  <!-- <input type="text" bind:value={word}> -->
  {inputTotalTrials}
  {#if showPopup}
    <div class="settings__popup">
      <span>Settings</span>
      <div>
        {#each gameSettings as setting}
          <div class="{setting.class}">
              <span>{setting.desc}</span>
              <input type="range" bind:value={setting.value}>
          </div>
          {/each}
        </div>
      <button on:click={saveSettings}>Save</button>
    </div>
  {/if}
</div>
