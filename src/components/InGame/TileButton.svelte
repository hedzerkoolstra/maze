<script>
  // Store
  import { gameIsUntouched, clickedBlack, clickedColored, gameIsPlaying } from "../../store";

  // Variables
  export let tile;
  let isClicked = false;

  // Functions
  function registerClick(tile) {
    isClicked = true;
    tile = tile;
    if (tile.type == "empty") {
      clickedBlack.update((n) => n + 1);
    } else if (tile.type == "passable") {
      clickedColored.update((n) => n + 1);
    }
  }

  // Watcher that resets the tile variables
  gameIsUntouched.subscribe((IsUntouched) => {
    if (IsUntouched) {
      isClicked = false;
      if (tile.type == "starttile") {
        isClicked = true;
      }
    }   
  });
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
    outline: none;
    transition: 0.05s;
  }
  .tile:hover {
      filter: brightness(120%);
  }
  .turned.north {
    background-color: #4fc1e9;
  }
  .turned.east {
    background-color: #ed5565;
  }
  .turned.south {
    background-color: #48cfad;
  }
  .turned.west {
    background-color: #ffce54;
  }
  .turned.empty {
    background-color: rgb(26, 26, 26);
  }
  .turned.endtile {
    background-color: rgb(26, 26, 26);
  }
  .circle {
    position: absolute;
    top: calc((100% - 40%) / 2);
    left: calc((100% - 40%) / 2);
    height: 40%;
    width: 40%;
    border-radius: 50%;
    background-color: rgb(26, 26, 26);
  }
</style>

<button on:click={registerClick(tile)} 
        class="tile {tile.type} {tile.direction} {isClicked ? 'turned' : ''}" 
        disabled={isClicked || !$gameIsPlaying}>
  <div class={isClicked ? 'circle' : ''} />
</button>
