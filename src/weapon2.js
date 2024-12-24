import Phaser from "../lib/phaser.js";
import { WeaponBase } from "./weapon_base.js";

export class Weapon2 extends WeaponBase {
  #speed;
  #baseAngle = 0;

  constructor(shooterObject, bulletConfig) {
    super(shooterObject, bulletConfig, "enemy_bullet2");

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

    this.#baseAngle += 0.05;
    this.#baseAngle -= Phaser.Math.FloorTo(this.#baseAngle);
    bullet.rotation = this.#baseAngle;

    this.#speed += 0.006;

    bullet.setState(this.bulletConfig.lifespan);
    bullet.setScale(0.4);
    bullet.body.setSize(10, 10);
  }

  updateShootedBullet(bullet, delta) {
    let rad = bullet.rotation * Math.PI * 2;
    
    bullet.body.velocity.x += 1 * Math.cos(rad);
    bullet.body.velocity.y += 1 * Math.sin(rad);
  }
}
