import {
  Actor,
  CollisionStartEvent,
  CollisionType,
  Color,
  Engine,
  vec,
} from "excalibur";
import {PlayerBlue} from "./player"

const game = new Engine({
  width: 800,
  height: 600,
});

const playerBlue = new PlayerBlue();
game.add(playerBlue);

//const playerRed = new PlayerRed();
//game.add(playerRed);

game.start();
