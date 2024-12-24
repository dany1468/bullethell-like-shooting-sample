export class GameOver extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene, scene.scale.width / 2, scene.scale.height / 2, []);

    this.scene.add.existing(this);
  }

  show() {
    // 画面の中央に表示
    this.scene.add.text(
      this.scene.scale.width / 2 - 140,
      this.scene.scale.height / 2,
      "Game Over",
      {
        fontSize: "48px",
        color: "#ffffff",
      }
    );
  }
}
