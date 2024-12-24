import { WeaponBase } from "./weapon_base.js";

export class PlayerWeapon extends WeaponBase {
  #speed;

  constructor(playerObject, bulletConfig) {
    super(playerObject, bulletConfig, "player_bullet1");

    this.#speed = this.bulletConfig.speed;
  }

  updateShootingBullet(delta) {
    const bullet = this.bulletGroup.getFirstDead();
    if (bullet === undefined || bullet === null) {
      console.log(`bullet is empty`);
      return;
    }

    const x = this.shooterObject.x;
    const y = this.shooterObject.y;
    // https://docs.phaser.io/api-documentation/namespace/physics-arcade-components-enable#enablebody
    // 位置を調整して active 化、表示
    bullet.enableBody(true, x, y, true, true);

    bullet.body.velocity.y -= this.#speed;

    bullet.setState(this.bulletConfig.lifespan);
    bullet.setScale(1.0);
    bullet.body.setSize(10, 10);
  }

  updateShootedBullet(bullet, delta) {
    // 発射後の弾の変化は無し
  }
}
