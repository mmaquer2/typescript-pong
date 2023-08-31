import { Engine } from "excalibur";
import { PlayerBlue } from "./player_blue"

const game = new Engine({
  width: 800,
  height: 600,
});

const playerBlue = new PlayerBlue();
game.add(playerBlue);

//const playerRed = new PlayerRed();
//game.add(playerRed);

//const scoreboard = new Scoreboard();
//game.add(scoreboard);

game.start();
