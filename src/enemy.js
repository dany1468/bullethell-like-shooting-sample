import phaser from "../lib/phaser.js";

export class Enemy extends phaser.GameObjects.Container {
  #shipSprite;
  #weaponComponent;

  constructor(scene, x, y, spriteKey, spriteScale) {
    console.log("Enemy constructor");
    super(scene, x, y, []);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setSize(24, 24);
    this.body.setOffset(-12, -12);
    this.body.setCollideWorldBounds(true);

    this.#shipSprite = scene.add.sprite(0, 0, spriteKey);
    this.#shipSprite.setScale(spriteScale); // 画像のサイズが大きい場合にはここで調整

    this.add(this.#shipSprite);

    // update event
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  // コンストラクタの呼び出しからそのまま使えるように callback 関数を受取り、自身を戻すようにしている
  // let enemy = new Enemy(scene, x, y, "enemy1").setWeapon((enemy) => { new Weapon(enemy, ... });
  setWeapon(settingWeaponCallback) {
    this.#weaponComponent = settingWeaponCallback(this);
    return this;
  }

  update(ts, delta) {
    console.log("enemy update");

    this.#weaponComponent.update(delta);
  }

  get weapon() {
    return this.#weaponComponent;
  }

  get weaponBulletGroup() {
    return this.#weaponComponent.bulletGroup;
  }
}
