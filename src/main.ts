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

const ballSpeed = ex.vec(200, 200); // Reduced from 400 to 200

setTimeout(() => {
  ball.vel = ballSpeed;
}, 1000);

ball.body.collisionType = ex.CollisionType.Active;
game.add(ball);

ball.on("exitviewport", () => {
  if (ball.pos.x <= 0) {
    console.log("Player Red Scored");
    red_score += 1;
  }

  if (ball.pos.x >= 800) {
    console.log("Player Blue Scored");
    blue_score += 1;
  }

  // update the score display
  score_display = `${blue_score} : ${red_score}`;
  text.text = score_display;

  // check game over condition here
  if (blue_score >= 3 || red_score >= 3) {
    console.log("Game Over");
    const winner = blue_score >= 3 ? "Blue" : "Red";
    alert(`Game Over - ${winner} wins! Refresh to play again!`);
  } else {
    // set the ball to the center of the screen
    ball.pos = new ex.Vector(400, 300);

    ball.vel = randomStartVector(); // set the ball to a random vector of the possible starting directions
  }
});

let colliding = false;
const MAX_BOUNCE_ANGLE = Math.PI / 4; // 45 degrees in radians
const MAX_SPIN_VELOCITY = 5; // Adjust this value based on how much spin you want

ball.on("collisionstart", function (ev: ex.CollisionStartEvent) {
  if (!colliding) {
    colliding = true;
    
    // Base speed - either maintain current speed or use minimum
    const currentSpeed = ball.vel.size;
    const baseSpeed = Math.max(currentSpeed, 200);
    
    const paddle = ev.other;
    
    // Calculate relative intersection point (-1 to 1)
    const hitPoint = (ball.pos.y - paddle.pos.y) / (paddle.height / 2);
    
    // Calculate bounce angle (limit to MAX_BOUNCE_ANGLE)
    const bounceAngle = hitPoint * MAX_BOUNCE_ANGLE;
    
    // Determine direction based on which paddle was hit
    const direction = ball.pos.x < game.drawWidth / 2 ? 1 : -1;
    
    // Calculate new velocity components
    const newVelX = direction * baseSpeed * Math.cos(bounceAngle);
    const newVelY = baseSpeed * Math.sin(bounceAngle);
    
    // Apply new velocity
    ball.vel = ex.vec(newVelX, newVelY);
    
    // Optional: Increase speed slightly with each hit
    ball.vel = ball.vel.scale(1.1);
    
    // Optional: Add maximum speed cap
    const maxSpeed = 400;
    if (ball.vel.size > maxSpeed) {
      ball.vel = ball.vel.normalize().scale(maxSpeed);
    }
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
  // Random angle between -45 and 45 degrees
  const angle = (Math.random() - 0.5) * Math.PI / 2;
  
  // Random direction (left or right)
  const direction = Math.random() < 0.5 ? -1 : 1;
  
  // Convert angle to velocity components
  const speed = 200; // Initial speed
  const vx = direction * speed * Math.cos(angle);
  const vy = speed * Math.sin(angle);
  
  return ex.vec(vx, vy);
}
