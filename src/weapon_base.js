import Phaser from "../lib/phaser.js";

export class WeaponBase {
  #bulletConfig;
  #shooterObject; // 弾を発射するオブジェクト
  #fireBulletInterval; // クールタイム

  #bulletGroup;

  constructor(shooterObject, bulletConfig, spriteKey) {
    this.#shooterObject = shooterObject;
    this.#bulletConfig = bulletConfig;

    this.#fireBulletInterval = 0;

    // 弾のグループを生成
    this.#createBulletPool(spriteKey);

    // update と同様に毎フレーム呼ばれるが、物理演算のステップ毎に呼ばれる
    // https://docs.phaser.io/api-documentation/namespace/physics-arcade-events#world_step
    this.#shooterObject.scene.physics.world.on(
      Phaser.Physics.Arcade.Events.WORLD_STEP,
      this.worldStep,
      this
    );
    // このオブジェクトが破壊されれば、このイベントリスナーも削除する
    this.#shooterObject.once(
      Phaser.GameObjects.Events.DESTROY,
      () => {
        this.#shooterObject.scene.physics.world.off(
          Phaser.Physics.Arcade.Events.WORLD_STEP,
          this.worldStep,
          this
        );
      },
      this
    );
  }

  get shooterObject() {
    return this.#shooterObject;
  }

  get bulletGroup() {
    return this.#bulletGroup;
  }

  get bulletConfig() {
    return this.#bulletConfig;
  }

  // 毎フレーム実行される
  update(delta) {
    this.#fireBulletInterval -= delta;
    if (this.#fireBulletInterval > 0) {
      // クールタイムが経過していなければ何もしない
      return;
    }

    this.updateShootingBullet(delta);

    this.#fireBulletInterval = this.#bulletConfig.interval;
  }

  // 弾を発射する処理
  updateShootingBullet(delta) {
    throw new Error("Method 'updateShootingBullet' must be implemented.");
  }

  // 物理演算のステップ毎に呼ばれる
  worldStep(delta) {
    this.#bulletGroup.getChildren().forEach((bullet) => {
      if (!bullet.active) {
        return;
      }

      this.updateShootedBullet(bullet, delta);

      // state は lifespan の残り時間を保持している
      // 要は弾の寿命。寿命が 0 になったら弾を消し、再び getFirstDead で取得できるようにする
      bullet.state -= delta;
      if (bullet.state <= 0) {
        bullet.disableBody(true, true);
      }
    });
  }

  // 発射後の弾の挙動を定義する
  updateShootedBullet(bullet, delta) {
    throw new Error("Method 'updateShootingBullet' must be implemented.");
  }

  #createBulletPool(spriteKey) {
    // 弾のグループを生成
    this.#bulletGroup = this.#shooterObject.scene.physics.add.group({
      name: `bullets-${Phaser.Math.RND.uuid()}`, // ユニークな名前を生成
      enable: false,
    });

    // 弾のプールを生成
    this.#bulletGroup.createMultiple({
      key: spriteKey,
      quantity: this.#bulletConfig.maxCount,
      active: false,
      visible: false,
    });
  }

  destroyBullet(bullet) {
    bullet.setState(0);
  }
}
