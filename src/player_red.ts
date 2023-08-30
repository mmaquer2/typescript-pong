import { Actor, Color } from "excalibur";


export class PlayerRed extends Actor {
  constructor() {
    super({
      
      width: 200,
      height: 20,
      
      color: Color.Chartreuse,
    });
  }

  update(engine, delta){
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
