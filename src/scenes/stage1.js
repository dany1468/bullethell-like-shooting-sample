import Phaser from "../../lib/phaser.js";
import { Player } from "../player.js";
import { Enemy } from "../enemy.js";
import { Weapon } from "../weapon.js";
import { Weapon2 } from "../weapon2.js";
import { GameOver } from "../ui/game_over.js";

export class Stage1 extends Phaser.Scene {
  constructor() {
    super({ key: "Stage1" });
  }

  create() {
    // ステージ 1 にはプレイヤーと敵 2 体のみを配置
    const player = new Player(this);

    // エネミーはそれぞれ武器の設定を変えるので、プレイヤーとは初期化の方法が異なっている
    const enemy1 = new Enemy(this, 300, 100, "enemy", 0.2).setWeapon(
      (enemy) =>
        new Weapon(enemy, {
          maxCount: 500,
          speed: 100,
          lifespan: 10,
          interval: 10,
        })
    );
    const enemy2 = new Enemy(this, 100, 100, "enemy2", 1.5).setWeapon(
      (enemy) =>
        new Weapon2(enemy, {
          maxCount: 500,
          speed: 0.01,
          lifespan: 6,
          interval: 25,
        })
    );

    const gameOverUi = new GameOver(this);

    // プレイヤーと敵の弾の当たり判定
    this.physics.add.overlap(
      player,
      enemy1.weaponBulletGroup,
      (player, bullet) => {
        player.dead();
        enemy1.weapon.destroyBullet(bullet);
        gameOverUi.show();
      }
    );

    this.physics.add.overlap(
      player,
      enemy2.weaponBulletGroup,
      (player, bullet) => {
        player.dead();
        enemy2.weapon.destroyBullet(bullet);
        gameOverUi.show();
      }
    );
  }
}
