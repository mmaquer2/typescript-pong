import * as ex from "excalibur";
import { PlayerBlue } from "./player_blue";
import { PlayerRed } from "./player_red";

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

// score display
let blue_score = 0;
let red_score = 0;
let score_display = `${blue_score} : ${red_score}`;

var text = new ex.Text({
  text: score_display,
  font: new ex.Font({ size: 30 }),
});

const textHolder = new ex.Actor({
  pos: new ex.Vector(400, 50),
});

textHolder.graphics.use(text);
game.add(textHolder);

const ball = new ex.Actor({
  x: 400,
  y: 300,
  radius: 10,
  color: ex.Color.Black,
});

const ballSpeed = ex.vec(100, 100); // starting velocity of the ball

setTimeout(() => {
  // Set the velocity in pixels per second
  ball.vel = ballSpeed;
}, 1000);

ball.body.collisionType = ex.CollisionType.Passive;
game.add(ball);

ball.on("exitviewport", () => {
  if (ball.pos.x <= 0) {
    console.log("Player Blue Scored");
    blue_score += 1;
  }

  if (ball.pos.x >= 800) {
    console.log("Player Red Scored");
    red_score += 1;
  }

  // update the score display
  score_display = `${blue_score} : ${red_score}`;
  text.text = score_display;

  // check game over condition here
  if (blue_score >= 3 || red_score >= 3) {
    console.log("Game Over");
    alert("Game Over - Refresh to play again!");
  } else {
    // set the ball to the center of the screen
    ball.pos = new ex.Vector(400, 300);

    // set starting speed of the ball
    ball.vel = ballSpeed;
    //ball.vel = randomStartVector(); // set the ball to a random vector of the possible starting directions
  }
});

let colliding = false;
const MAX_BOUNCE_ANGLE = Math.PI / 4; // 45 degrees in radians
const MAX_SPIN_VELOCITY = 5; // Adjust this value based on how much spin you want

ball.on("collisionstart", function (ev: ex.CollisionStartEvent) {
  var intersection = ev.contact.mtv.normalize();

  if (!colliding) {
    colliding = true;

    console.log("collision start");

    // simple bounce and reflection off the paddle:
    /*
    if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
      
      console.log("x bounce")
      //ball.vel.x = ballSpeed.x * Math.cos(bounceAngle);
        ball.vel.x *= -1;
    } else {
      
      //ball.vel.y = ballSpeed.y * -Math.sin(bounceAngle);
      ball.vel.y *= -1;
    }
    */

    // ===== attempt at a more realistic bounce and reflection off the paddle - not working yet =======

    // Calculate the bounce angle based on where the ball hits the paddle
    //let relativeIntersectY = paddle.pos.y + (150 / 2) - ball.pos.y;

    let normalizedRelativeIntersectionY = intersection.y / (150 / 2);
    let bounceAngle = normalizedRelativeIntersectionY * MAX_BOUNCE_ANGLE; // MAX_BOUNCE_ANGLE determines the maximum angle of reflection

    // Adjust the ball's velocity based on the bounce angle
    ball.vel.x = 5 * Math.cos(bounceAngle);
    ball.vel.y = -5 * Math.sin(bounceAngle);

    // Add spin based on where the ball hit the paddle (left or right side)
    //let spinFactor = normalizedRelativeIntersectionY;
    //ball.vel = MAX_SPIN_VELOCITY * spinFactor; // MAX_SPIN_VELOCITY determines the maximum spin

    // Increase ball speed for added difficulty
    //ballSpeed += SPEED_INCREASE;
  }
});

ball.on("collisionend", () => {
  colliding = false;
});

// post update event to collide with the top and bottom of the screen
ball.on("postupdate", () => {
  // if the ball hits the top or bottom of the screen, reverse the y velocity
  if (ball.pos.y < ball.height / 2) {
    ball.vel.y = Math.abs(ball.vel.y);
  }

  if (ball.pos.y + ball.height / 2 > game.drawHeight) {
    ball.vel.y = -Math.abs(ball.vel.y);
  }
});

game.start();

function randomStartVector() {
  let x = Math.random() * 120;
  let y = Math.random() * 120;
  return ex.vec(x, y);
}
