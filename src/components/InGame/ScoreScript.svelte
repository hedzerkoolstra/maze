<script>
  import { playerInfo, gameIsPlaying, gameNumber, clickedBlack, clickedColored } from "../../store";

  import { db } from '../../firestore.js'

  let gameData = undefined
  let dataObject = {}

  class Score {
    constructor(game, wrongClicks, rightClicks, totalClicks, percentageRight, percentageWrong) {
      this.game = game;
      this.wrongClicks = wrongClicks;
      this.rightClicks = rightClicks;
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
      let wroCli = $clickedBlack
      let rigCli = $clickedColored
      let totCli = rigCli + wroCli
      let perRig = rigCli * 100 / totCli 
      let perWro = wroCli * 100 / totCli 
      let newGame = new Score($gameNumber, wroCli, rigCli, totCli, perRig, perWro);
      let gameCopy = Object.assign({}, newGame)
      dataObject['Game ' + $gameNumber] = gameCopy
      console.log(dataObject['Game ' + $gameNumber]);
      gameData.set(dataObject, { merge: true })
    }
  });

playerInfo.subscribe((info) => {
  if (Object.keys(info).length !== 0) {
    gameData.set(info, { merge: true })
  }
  
})

function createDataset() {
   gameData = db.collection('Games').doc()
   gameData.set({date: new Date() })
}
</script>
