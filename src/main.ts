import * as ex from 'excalibur';
import { PlayerBlue } from "./player_blue"
import { PlayerRed } from './player_red';

const game = new ex.Engine({
  width: 800,
  height: 600,
});

const players: ex.Actor[] = [];

const playerBlue = new PlayerBlue();
game.add(playerBlue);

const playerRed = new PlayerRed();
game.add(playerRed);

players.push(playerBlue, playerRed);
players.forEach((player) => {
  player.body.collisionType = ex.CollisionType.Fixed;
});


// Keep track of ball and score here before creating a separate class for them

let blue_score = 0;
let red_score = 0;
let score_display = `${blue_score} : ${red_score}`;

var text = new ex.Text({
  text: score_display,
  font: new ex.Font({ size: 30 }),
})

const textHolder = new ex.Actor({
  pos: new ex.Vector(400, 50),
})

textHolder.graphics.use(text);
game.add(textHolder);

const ball = new ex.Actor({
  x:400,
  y:300,
  radius:10,
  color: ex.Color.Black,
});

// possible starting directions for the ball negative is left and positive is right
// same with up and down y directionwd

const ballSpeed = ex.vec(120,0); // starting velocity of the ball

setTimeout(() => {
  // Set the velocity in pixels per second
  ball.vel = ballSpeed;
}, 1000);

ball.body.collisionType = ex.CollisionType.Passive;
game.add(ball);



ball.on("exitviewport", () => {
  
  if(ball.pos.x <= 0){
    console.log("Player Blue Scored");
    blue_score += 1;
  }
  
  if(ball.pos.x >= 800){
    console.log("Player Red Scored");
    red_score += 1;
  }

  // update the score display
  score_display = `${blue_score} : ${red_score}`;
  text.text = score_display;

  // check game over condition here
  if(blue_score >= 3 || red_score >= 3){
  
    console.log("Game Over");
    alert("Game Over - Refresh to play again!");
  
  } else {
    
    // reset the ball
    ball.pos = new ex.Vector(400, 300);

    // set the ball to a random vector
    ball.vel = ex.vec(60,0);
  }

});

let colliding = false;
ball.on("collisionstart", function (ev: ex.CollisionStartEvent) {
  var intersection = ev.contact.mtv.normalize();
  // Only reverse direction when the collision starts
  if (!colliding) {
    colliding = true;
    // The largest component of intersection is our axis to flip
    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
      ball.vel.x *= -1;
    } else {
      ball.vel.y *= -1;
    }
  }
});

ball.on("collisionend", () => {
  colliding = false;
});


// post update event to collide with the top and bottom of the screen
ball.on("postupdate", () => {
  if (ball.pos.y < ball.height / 2) {
    ball.vel.y = ballSpeed.y;
  }
});


game.start();



