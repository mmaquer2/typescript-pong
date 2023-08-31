import * as ex from 'excalibur';


export class PlayerBlue extends ex.Actor {
  constructor() {
    super({
      pos: new ex.Vector(400, 500),
      width: 150,
      height: 20,
      color: ex.Color.Blue,
    });
  }

  update(engine: ex.Engine, delta: number){
    super.update(engine, delta);

    if (engine.input.keyboard.isHeld(ex.Input.Keys.A)) {
      this.pos.x -= 5;
    }

    if (engine.input.keyboard.isHeld(ex.Input.Keys.D)) {
      this.pos.x += 5;
    }

  }

  /*
    Check if the player is out of bounds and halt movement if so
  */

  isOutOfBounds() {
       
    return false;

  }



  onInitialize() {
    console.log("Player Blue Initialized");
  }
}
