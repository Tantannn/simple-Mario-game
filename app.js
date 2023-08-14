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
let bottom = 0;

const Graphics = PIXI.Graphics;

class Rect {
  constructor({ position, size }) {
    this.position = position;
    this.size = size;
  }
  draw() {
    this.shape = new Graphics();
    this.shape
      .beginFill(0xff0000)
      .drawRect(this.position.x, this.position.y, this.size.x, this.size.y)
      .endFill();
    app.stage.addChild(this.shape);
  }
  hit() {
    if (rectsIntersectPlatform(mario, this.shape)) {
       (mario.y -= 10);
    }
  }
}

class Coin {
  constructor({ position, size }) {
    this.position = position;
    this.size = size;
    this.color = 0xffff00;
  }
  draw() {
    this.shape = new Graphics();
    this.shape
      .beginFill(0xffff00)
      .drawCircle(this.position.x, this.position.y, this.size)
      .endFill();
    app.stage.addChild(this.shape);
  }
  hit() {
    if (rectsIntersectCoin(mario, this.shape)) {
     app.stage.removeChild(this.shape);
    }
  }
}

const rectangle1 = new Rect({
  position: { x: 300, y: 375 },
  size: { x: 100, y: 50 },
});
const rectangle2 = new Rect({
  position: { x: 500, y: 300 },
  size: { x: 100, y: 50 },
});
const rectangle3 = new Rect({
  position: { x: 100, y: 450 },
  size: { x: 100, y: 50 },
});
rectangle1.draw();
rectangle2.draw();
rectangle3.draw();

const coin1 = new Coin({position: {x: 150, y: 425}, size: 25});
const coin2 = new Coin({position: {x: 350, y: 350}, size: 25});
const coin3 = new Coin({position: {x: 550, y: 275}, size: 25});
coin1.draw();
coin2.draw();
coin3.draw();

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

app.stage.addChild(
  mario,
  floor,
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
  spaceShipSprite.x += 1;
  if (circle.position.y < floor.position.y / 2) {
    circle.y += 2;
  }
  if (mario.position.y + 50 < floor.position.y) {
    mario.y += 10;
  }
  if (keys.d) {
    mario.x += 5;
  }
  if (keys.a) {
    mario.x -= 5;
  }
  if (keys.w) {
    mario.y -= 20;
    const time = setTimeout(() => {
      keys.w = false;
    }, 230);
  }
  rectangle1.hit();
  rectangle2.hit();
  rectangle3.hit();
  coin1.hit();
  coin2.hit();
  coin3.hit();

  score = app.stage.children.length;
  updateScore(11 - score);
});

mario.buttonMode = true;
mario.interactive = true;

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


const updateScore = (score) => {
  text.text = `Score: ${score}`;
};

/* const jump = (second) => {
  bottom = mario.y + 20
  mario.y -= 20
  console.log( mario.y, bottom);
}; */

const jump = () => {
  const time = setTimeout(() => {
    mario.y -= 20;
  }, 50);
};
