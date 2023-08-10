const Application = PIXI.Application;
const app = new Application({
  width: 800,
  height: 600,
  antialias: true,
  transparent: false,
  backgroundColor: 0x23395d,
});
app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

let score = 0;

const Graphics = PIXI.Graphics;

/* class Mario {
    constructor({position, velocity}) {
    this.position = position;
    this.velocity = velocity;
  }
}
const mario = new Mario(); */

const mario = new Graphics();
mario
  .beginFill(0xff1493)
  .lineStyle(2, 0xffc0cb)
  .drawRect(0, 0, 50, 50)
  .endFill();

const floor = new Graphics();
floor
  .beginFill(0x964b00)
  .lineStyle(2, 0xaa33bb)
  .drawRect(0, 0, 5000, 50)
  .endFill();

const rectangle2 = new Graphics();
rectangle2
  .beginFill(0xff0000)
  .lineStyle(2, 0xaa33bb)
  .drawRect(500, 300, 100, 50)
  .endFill();
const rectangle1 = new Graphics();
rectangle1
  .beginFill(0xff0000)
  .lineStyle(2, 0xaa33bb)
  .drawRect(300, 375, 100, 50)
  .endFill();
const rectangle3 = new Graphics();
rectangle3
  .beginFill(0xff0000)
  .lineStyle(2, 0xaa33bb)
  .drawRect(100, 450, 100, 50)
  .endFill();

const coin1 = new Graphics();
coin1.beginFill(0xffff00).drawCircle(150, 425, 25).endFill();
const coin2 = new Graphics();
coin2.beginFill(0xffff00).drawCircle(350, 350, 25).endFill();
const coin3 = new Graphics();
coin3.beginFill(0xffff00).drawCircle(550, 275, 25).endFill();
app.stage.addChild(
  mario,
  rectangle2,
  floor,
  rectangle1,
  rectangle3,
  coin1,
  coin2,
  coin3,
);

mario.position.set(0, 0);
floor.position.set(0, 550);

const circle = new Graphics();
circle.beginFill(0x00ff00).drawCircle(400, 200, 80).endFill();
circle.position.set(400, 50);
app.stage.addChild(circle);

const style = new PIXI.TextStyle({
  fontSize: 20,
  fill: "deepskyblue",
  stroke: "black",
  fontSize: 40,
});

const text = new PIXI.Text(`Score: ${score}`, style);
app.stage.addChild(text);

const spaceShipTexture = PIXI.Texture.from("./spaceship.png");
const spaceShipSprite = new PIXI.Sprite(spaceShipTexture);

app.stage.addChild(spaceShipSprite);
spaceShipSprite.position.set(100, 50);
spaceShipSprite.scale.x = 0.5;
spaceShipSprite.scale.y = 0.5;
spaceShipSprite.rotation = 1.5;

app.ticker.add((delta) => {
  // console.log(score)
  /* text.x = Math.random() * app.screen.width;
  text.y = Math.random() * app.screen.height; */
console.log(mario.y)
  spaceShipSprite.x += 1;
  if (circle.position.y < floor.position.y / 2) {
    circle.y += 2;
  }
  if (mario.position.y + 50 < floor.position.y) {
    mario.y += 10;
  }
  // console.log(keys);
  if (keys.d) {
    mario.x += 5;
  }
  if (keys.a) {
    mario.x -= 5;
  }
  if (keys.w) {
    mario.y -= 20;
  }
  if (rectsIntersectPlatform(mario, rectangle2)) {
    mario.y -= 10;
  }
  if (rectsIntersectPlatform(mario, rectangle1)) {
    mario.y -= 10;
  }
  if (rectsIntersectPlatform(mario, rectangle3)) {
    mario.y -= 10;
  }
  if (rectsIntersectCoin(mario, coin1)) {
    app.stage.removeChild(coin1);
  }
  if (rectsIntersectCoin(mario, coin2)) {
    app.stage.removeChild(coin2);
  }
  if (rectsIntersectCoin(mario, coin3)) {
    app.stage.removeChild(coin3);
  }
  score = app.stage.children.length;
  updateScore(11-score);
});

console.log(score);
mario.buttonMode = true;
mario.interactive = true;
/* rectangle.on("pointerdown", () => {
    rectangle.x += 0.1
}) */

let keys = {};
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

const rectsIntersectPlatform = (a, b) => {
  let aBox = a.getBounds();
  let bBox = b.getBounds();
  return (
    aBox.x + aBox.width > bBox.x &&
    aBox.x < bBox.x + bBox.width &&
    aBox.y + aBox.height - 18 <= bBox.y &&
    aBox.y + aBox.height - 10 >= bBox.y
  );
};
const rectsIntersectCoin = (a, b) => {
  let aBox = a.getBounds();
  let bBox = b.getBounds();
  return (
    aBox.x + aBox.width > bBox.x &&
    aBox.x < bBox.x + bBox.width &&
    aBox.y + aBox.height > bBox.y &&
    aBox.y < bBox.y + bBox.height
  );
};
/* const rectPlatform = (a, b) => {
  let aBox = a.getBounds();
  let bBox = b.getBounds();
  return (
    aBox.x + aBox.width > bBox.x 
  );
}; */

const updateScore = (score) => {
  text.text = `Score: ${score}`;
};
