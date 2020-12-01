class Ship extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'ship');
    }

    spawn(x, speed, bullets) {
        this.body.reset(x, 0);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(speed);

    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y > 900) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}