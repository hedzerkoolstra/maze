<script>
  // Components
  import TileButton from "./TileButton.svelte";
  import PlayButtons from "./PlayButtons.svelte";

  // Store
  import { gridSize, mazeLength, gameIsUntouched, gameIsPlaying, triggerReplay, clickedBlack, clickedColored } from "../../store";

  // Variables
  let grid = [];
  let endTile = { x: 0, y: 0 };
  let lastModifiedTile = {};
  let adjacentTiles = [];

  let tileClass = {x: 0, y: 0}
   
  class Tile {
    constructor(direction, type, x, y) {
      this.direction = direction;
      this.type = type;
      this.x = x;
      this.y = y;
    }
  }

  function createTile(direction, type, x, y) {
    return {direction: direction, type: type, x: x, y: y}
  }

  // On mount
  import { onMount } from "svelte";
  onMount(() => {
    createGrid();
    createMaze();
  });

  // Watcher triggered when 'Play again' is pressed
  triggerReplay.subscribe((doReplay) => {
    if (doReplay) {
      console.log("Refresh triggered");
      resetGrid();
      resetScore();
      createMaze();
      gameIsUntouched.set(true);
    }
    triggerReplay.set(false);
  });

  function resetScore() {
    clickedBlack.set(0);
    clickedColored.set(0);
  }

  function resetGrid() {
    grid.forEach((col) => {
      col.forEach((tile) => {
        tile.type = "empty";
        tile.direction = "none";
      });
    });
    // grid.length = 0
    // createGrid()
  }

  // Functions for setting up the game
  function createGrid() {
    for (let i = 0; i < $gridSize; i++) {
      let col = [];
      for (let j = 0; j < $gridSize; j++) {
        // let tile = new Tile("none", "empty", i, j);
        let tile = createTile("none", "empty", i, j)
        col.push(tile);
      }
      grid.push(col);
    }
    grid = grid;
  }

  function setEndTile() {
    endTile.x = Math.round(Math.random() * ($gridSize - 1));
    endTile.y = Math.round(Math.random() * ($gridSize - 1));
    grid[endTile.x][endTile.y].type = "endtile";
    lastModifiedTile = grid[endTile.x][endTile.y];
  }

  function createMaze() {
    setEndTile();
    for (let i = 0; i < $mazeLength; i++) {
      adjacentTiles = setAdjacentTiles(lastModifiedTile);
      let newTile = pickTile();
      if (newTile) {
        if (i < $mazeLength - 1) {
          grid[newTile.x][newTile.y].type = "passable";
          grid[newTile.x][newTile.y].direction = newTile.directionToLastPoint;
          lastModifiedTile = newTile;
        } else {
          grid[newTile.x][newTile.y].type = "starttile";
          grid[newTile.x][newTile.y].direction = newTile.directionToLastPoint;
        }
      } else {
        resetGrid();
        createMaze();
        break;
      }
    }
    grid = grid;
  }

  function setAdjacentTiles(originalTile) {
    let northTile = { x: originalTile.x, y: originalTile.y - 1, directionToLastPoint: "south" };
    let eastTile = { x: originalTile.x + 1, y: originalTile.y, directionToLastPoint: "west" };
    let southTile = { x: originalTile.x, y: originalTile.y + 1, directionToLastPoint: "north" };
    let westTile = { x: originalTile.x - 1, y: originalTile.y, directionToLastPoint: "east" };
    return [northTile, eastTile, southTile, westTile];
  }

  function pickTile() {
    let n = Math.floor(Math.random() * adjacentTiles.length);
    let newTile = adjacentTiles[n];
    if (adjacentTiles.length > 0) {
      if (isValidTile(newTile)) {
        return newTile;
      } else {
        // Remove invalid tile and pick a new tile
        adjacentTiles.splice(n, 1);
        return pickTile();
      }
    } else {
      return null;
    }
  }

  function isValidTile(tile) {
    //Check if tile is within grid and is already in use
    if (tile.x >= 0 && tile.x < $gridSize && tile.y >= 0 && tile.y < $gridSize) {
      if (grid[tile.x][tile.y].type != "empty") {
        return false;
      }
    } else {
      return false;
    }

    // Check if tile has enough available adjacent tiles
    let validTiles = 0;
    let secondaryAdjacentTiles = setAdjacentTiles(tile);
    for (let i = 0; i < secondaryAdjacentTiles.length; i++) {
      // Check if adjacent tile is withing the grid
      if (
        secondaryAdjacentTiles[i].x >= 0 &&
        secondaryAdjacentTiles[i].x < $gridSize &&
        secondaryAdjacentTiles[i].y >= 0 &&
        secondaryAdjacentTiles[i].y < $gridSize
      ) {
        let secondaryAdjacentTile = grid[secondaryAdjacentTiles[i].x][secondaryAdjacentTiles[i].y];

        // Check if adjacent tile is available
        if (secondaryAdjacentTile.type == "empty") {
          validTiles += 1;
        }
      }
    }
    // If there are three valid adjacent tiles, the tile can be used.
    if (validTiles >= 3) {
      return true;
    } else {
      return false;
    }
  }
</script>

<style>
  .gameboard {
    display: flex;
    position: relative;
    padding: 1rem;
    background-color: grey;
    width: 100%;
    margin: auto;
  }
  .col {
    flex: 1;
    margin-right: 4px;
  }
</style>

<div>
  <div class="gameboard">
    {#each grid as col}
      <div class="col">
        {#each col as tile}
          <TileButton bind:tile />
        {/each}
      </div>
    {/each}
    <PlayButtons />
  </div>
</div>
