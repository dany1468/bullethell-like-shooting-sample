import Phaser from "../lib/phaser.js";
import { Stage1 } from "./scenes/stage1.js";

const D_WIDTH = 450;
const D_HEIGHT = 640;

const config = {
  type: Phaser.CANVAS,
  roundPixels: true,
  pixelArt: true,
  scale: {
    parent: "game-container",
    width: D_WIDTH,
    height: D_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
  },
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const phaser = new Phaser.Game(config);

// ステージ登録
phaser.scene.add("Stage1", Stage1);

function preload() {
  // 必要な画像を読み込む
  this.load.image("player", "./assets/images/player.png");
  this.load.image("enemy", "./assets/images/enemy.png");
  this.load.image("enemy2", "./assets/images/enemy2.png");
  this.load.image("player_bullet1", "./assets/images/player_bullet1.png");
  this.load.image("enemy_bullet1", "./assets/images/enemy_bullet1.png");
  this.load.image("enemy_bullet2", "./assets/images/enemy_bullet2.png");
}

function create() {
  // 最初のステージ開始
  this.scene.start("Stage1");
}

function update() {
  // no-op
}
