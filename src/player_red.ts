import * as ex from "excalibur";

export class PlayerRed extends ex.Actor {
  constructor() {
    super({
      pos: new ex.Vector(770, 400),
      width: 20,
      height: 150,
      color: ex.Color.Red,
    });
  }

  update(engine: ex.Engine, delta: number) {
    super.update(engine, delta);

    if (this.pos.y >= 50 && engine.input.keyboard.isHeld(ex.Input.Keys.O)) {
      this.pos.y -= 5;
    }

    if (this.pos.y <= 550 && engine.input.keyboard.isHeld(ex.Input.Keys.L)) {
      this.pos.y += 5;
    }
  }

  onInitialize() {
    console.log("Player Red Initialized");
  }
}
