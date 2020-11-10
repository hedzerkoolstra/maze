<script>
  import { onMount } from "svelte";
  import TileButton from "./TileButton.svelte";

  let gridSize = 16;
  let roadLength = 30;
  let grid = [];
  let endTileX = 0;
  let endTileY = 0;
  let lastModifiedTile = {};
  let adjacentTiles = [];
  let timeleft = undefined
  let totalTime = 30
  let disableButtons = true

  class Tile {
    constructor(direction, type, turned, x, y) {
      this.direction = direction;
      this.type = type;
      this.turned = turned;
      this.x = x;
      this.y = y;
    }
  }

  onMount(() => {
    setupGame();
  });

  
  function startTimer() {
    disableButtons = false;
    timeleft = totalTime;
    let timer = setInterval(function(){
      timeleft--;
      if (timeleft == 0) {
        timeleft = 'Done'
        disableButtons = true
        clearInterval(timer)
      }
    },1000)
  }
  

  function setupGame() {
    createGrid();
    setEndTile();
    createMaze();
  }

  function createGrid() {
    console.log(grid, length);
    for (let i = 0; i < gridSize; i++) {
      let col = [];
      for (let j = 0; j < gridSize; j++) {
        let tile = new Tile("none", "empty", false, i, j);
        col.push(tile);
      }
      grid.push(col);
    }
    grid = grid;
  }

  function setEndTile() {
    endTileX = Math.round(Math.random() * (gridSize - 1));
    endTileY = Math.round(Math.random() * (gridSize - 1));
    grid[endTileX][endTileY].type = "endtile";
    grid[endTileX][endTileY].turned = true;
    setLastModifiedTile(grid[endTileX][endTileY]);
  }

  function createMaze() {
    for (let i = 0; i < roadLength; i++) {
      let newTile = getAdjacentTile();
      if (newTile) {
        // console.log("Iteration: " + i + " New Tile - x:", newTile.x, "y:", newTile.y);
        if (i < roadLength - 1) {
          grid[newTile.x][newTile.y].type = "passable";
          grid[newTile.x][newTile.y].direction = newTile.directionToLastPoint;
          setLastModifiedTile(newTile);
        } else {
          grid[newTile.x][newTile.y].type = "starttile";
        }    
      } else {
        grid.splice(0, grid.length);
        setupGame();
        break;
      }
    }
  }

  function setLastModifiedTile(tile) {
    lastModifiedTile = tile
  }

  function getAdjacentTile() {
    adjacentTiles = setAdjacentTiles(lastModifiedTile);
    return pickTile();
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
    // Check if tile is valid
    if (adjacentTiles.length > 0) {
      if (isValidTile(newTile)) {
        // Return valid tile
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
    if (tile.x >= 0 && tile.x < gridSize && tile.y >= 0 && tile.y < gridSize) {
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
      let secAdjTileX = secondaryAdjacentTiles[i].x;
      let secAdjTileY = secondaryAdjacentTiles[i].y;

      // Check if adjacent tile is withing the grid
      if (secAdjTileX >= 0 && secAdjTileX < gridSize && secAdjTileY >= 0 && secAdjTileY < gridSize) {
        let secondaryAdjacentTile = grid[secAdjTileX][secAdjTileY];

        // Check if adjacent tile is available
        if (secondaryAdjacentTile.type == "empty") {
          validTiles += 1;
        }
      }
    }
    // If there are at least three valid adjacent tiles, the tile can be used.
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
    padding: 1rem;
    background-color: grey;
    width: 100%;
    margin: auto;
  }
  .col {
    flex: 1;
    margin-right: 4px;
  }
  .starter {
    margin-top: 2rem;
  }
</style>

<div>
  <div class="gameboard">
    {#each grid as col}
      <div class="col">
        {#each col as tile}
          <TileButton {tile} {disableButtons} />
        {/each}
      </div>
    {/each}
    
  </div>
  <div class="starter">
    <button on:click={startTimer} >Start</button>
    {#if timeleft}
    <span>Time left: {timeleft}</span>
    {/if}
  </div>
</div>
