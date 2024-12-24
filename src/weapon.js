import { WeaponBase } from "./weapon_base.js";

export class Weapon extends WeaponBase {
  #rotation = 0;
  #speed;

  constructor(shooterObject, bulletConfig) {
    super(shooterObject, bulletConfig, "enemy_bullet1");

    this.#speed = this.bulletConfig.speed;
  }

  updateShootingBullet(delta) {
    const bullet = this.bulletGroup.getFirstDead();
    if (bullet === undefined || bullet === null) {
      console.log(`bullet is empty`);
      return;
    }

    this.shootABullet(bullet);
  }

  shootABullet(bullet) {
    const x = this.shooterObject.x;
    const y = this.shooterObject.y;
    // https://docs.phaser.io/api-documentation/namespace/physics-arcade-components-enable#enablebody
    // 位置を調整して active 化、表示
    bullet.enableBody(true, x, y, true, true);

    this.#rotation += 0.1;
    let rad = this.#rotation * Math.PI * 2;

    bullet.body.velocity.x += this.#speed * Math.cos(rad);
    bullet.body.velocity.y -= this.#speed * Math.sin(rad);

    this.#rotation += 0.01;
    this.#speed -= 0.001;

    bullet.setState(this.bulletConfig.lifespan);
    bullet.setScale(0.4);
    bullet.body.setSize(10, 10);
  }

  updateShootedBullet(bullet, delta) {
    // 発射後の弾の変化は無し
  }
}
