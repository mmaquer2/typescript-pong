import * as ex from 'excalibur';


export class PlayerRed extends ex.Actor {
  constructor() {
    super({
     
      width: 200,
      height: 20,
      color: ex.Color.Red,
    });
  }

  update(engine: ex.Engine, delta: number){
    super.update(engine, delta);

    // if (engine.input.keyboard.isHeld(ex.Input.Keys.A)) {
    //   this.pos.x -= 5;
    // }

    // if (engine.input.keyboard.isHeld(ex.Input.Keys.D)) {
    //   this.pos.x += 5;
    // }

  }

  /*
    Check if the player is out of bounds and halt movement if so
  */

  isOutOfBounds() {
       
    return false;

  }



  onInitialize() {
    console.log("Player Red Initialized");
  }
}
