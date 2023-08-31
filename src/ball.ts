import * as ex from "excalibur";

export class Ball extends ex.Actor {
  speed = 0;
  angle = 0;

  // the location to where the ball should be set after a score
  resetLocation = new ex.Vector(200, 200);

  constructor() {
    super({
      pos: new ex.Vector(200, 200),
      width: 20,
      height: 150,
      color: ex.Color.Black,
    });
  }

  update(engine: ex.Engine, delta: number) {
    super.update(engine, delta);

    /*
    collision handing with player and change direction handling here
    */

    // move ball and update position based on speed and angle

    /*

    check if a player has scored and reset the ball if so

    */
    if (this.pos.x <= 0) {
      console.log("Player Blue Scored");
      this.resetBallAfterScore();
    }

    if (this.pos.x >= 800) {
      console.log("Player Red Scored");
      this.resetBallAfterScore();
    }
  }

  resetBallAfterScore() {
    this.pos = this.resetLocation;
    this.speed = 0;
    this.angle = 0;
  }

  /*
  Creates a random first move for the ball at the game start
  */

  firstMove() {
    this.speed = 100;
    this.angle = 45;
  }

  onInitialize() {
    console.log("Ball Initialized");
    // firstMove();
  }
}
