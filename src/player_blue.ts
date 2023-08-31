import * as ex from 'excalibur';


export class PlayerBlue extends ex.Actor {
  constructor() {
    super({
      pos: new ex.Vector(30, 400),
      width: 20,
      height: 150,
      color: ex.Color.Blue,
    });
  }

  update(engine: ex.Engine, delta: number){

    // console.log(this.pos.y)
    super.update(engine, delta);

      if (this.pos.y >= 50 && engine.input.keyboard.isHeld(ex.Input.Keys.A)) {
        this.pos.y -= 5;
      }

      if (this.pos.y <= 550 && engine.input.keyboard.isHeld(ex.Input.Keys.D)) {
        this.pos.y += 5;
      
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