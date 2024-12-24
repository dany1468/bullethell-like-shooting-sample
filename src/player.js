import phaser from "../lib/phaser.js";
import { PlayerWeapon } from "./player_weapon.js";

export class Player extends phaser.GameObjects.Container {
  #shipSprite;
  #weaponComponent;

  constructor(scene) {
    console.log("Player constructor");

    // プレイヤーの初期位置は画面の中央下部
    super(scene, scene.scale.width / 2, scene.scale.height - 32, []);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setSize(24, 24);
    this.body.setOffset(-12, -12);
    this.body.setCollideWorldBounds(true);

    this.#shipSprite = scene.add.sprite(0, 0, "player");
    this.#shipSprite.setScale(0.4); // 画像のサイズが大きい場合にはここで調整

    this.add(this.#shipSprite);

    // update event
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.#weaponComponent = new PlayerWeapon(this, {
      maxCount: 500,
      speed: 500,
      lifespan: 5,
      interval: 50,
    });
  }

  update(ts, delta) {
    console.log("player update");

    const cursorKeys = this.scene.input.keyboard.createCursorKeys();
    const speed = 100;
    const body = this.body;

    if (cursorKeys.left.isDown) {
      body.setVelocityX(-speed);
    } else if (cursorKeys.right.isDown) {
      body.setVelocityX(speed);
    } else {
      body.setVelocityX(0);
    }

    if (cursorKeys.up.isDown) {
      body.setVelocityY(-speed);
    } else if (cursorKeys.down.isDown) {
      body.setVelocityY(speed);
    } else {
      body.setVelocityY(0);
    }

    if (cursorKeys.space.isDown) {
      this.#shoot(delta);
    }
  }

  #shoot(delta) {
    this.#weaponComponent.update(delta);
  }

  dead() {
    this.setActive(false);
    this.setVisible(false);
  }
}
