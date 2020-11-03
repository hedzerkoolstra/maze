<script>
import { onMount } from "svelte";


  // import { data } from '../../store/scoreboard'
  export let tile;
  let isTurned = false
  let hasBeenWalked = false

  onMount(() => {
    if (tile.type == 'starttile') {
      hasBeenWalked = true
    }
  })
  
  function registerClick(tile) {
    isTurned = true; 
    if (tile.type != 'empty') {
      hasBeenWalked = true
    }
  }
</script>

<style>
  .tile {
    display: block;
    position: relative;
    border: none;
    background-color: rgb(161, 161, 161);
    width: 100%;
    padding: 0;
    padding-bottom: 100%;
    margin-bottom: 4px;
    box-sizing: border-box;
    transition: 0.2s;
  }
  .turned.endtile {
    background-color: #AC92EC;
  }
  .starttile {
    background-color: #ecae92;
  }
  .turned.north {
    background-color: #4FC1E9;
  }
  .turned.east {
    background-color: #ED5565;
  }
  .turned.south {
    background-color: #48CFAD;
  }
  .turned.west {
    background-color: #FFCE54;
  }
  .turned.empty {
    background-color: rgb(26, 26, 26);
  }
  .circle {
    position: absolute;
    top: calc((100% - 50%) /2);
    left: calc((100% - 50%) /2);
    height: 50%;
    width: 50%;
    border-radius: 50%;
    background-color: black;
  }
   
</style>

<button class="tile {tile.type} {tile.direction} {isTurned ? 'turned' : ''} " on:click="{registerClick(tile)}">
  <div class="{hasBeenWalked ? 'circle' : ''}">

  </div>
</button>
