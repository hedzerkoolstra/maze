<script>
  import { gameIsPlaying, gameNumber, clickedEmpty, clickedEndtile, clickedPassable } from "../store";

  import { db } from '../firestore.js'

  let gameData = undefined
  let dataObject = {}

  class Score {
    constructor(game, wrongClicks, rightClicks, clickedEndtile, totalClicks, percentageRight, percentageWrong) {
      this.game = game;
      this.wrongClicks = wrongClicks;
      this.rightClicks = rightClicks;
      this.clickedEndtile = clickedEndtile;
      this.totalClicks = totalClicks;
      this.percentageRight = percentageRight;
      this.percentageWrong = percentageWrong;
    }
  }

  gameIsPlaying.subscribe((isPlaying) => {
    if (!isPlaying && $gameNumber > 0) {
      if (!gameData) {
        createDataset()
      }
      console.log('score triggered', $gameNumber, isPlaying);
      let wroCli = $clickedEmpty
      let rigCli = $clickedPassable
      let cliEnd = $clickedEndtile == 0 ? false : true
      let totCli = rigCli + wroCli
      let perRig = rigCli * 100 / totCli 
      let perWro = wroCli * 100 / totCli 
      let newGame = new Score($gameNumber, wroCli, rigCli, cliEnd, totCli, perRig, perWro);
      let gameCopy = Object.assign({}, newGame)
      dataObject['Game ' + $gameNumber] = gameCopy
      console.log(dataObject['Game ' + $gameNumber]);
      gameData.set(dataObject, { merge: true })
    }
  });

function createDataset() {
   gameData = db.collection('Games').doc()
   gameData.set({date: new Date() })
}
</script>
