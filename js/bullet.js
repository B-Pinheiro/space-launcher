class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    fire(x, y, pointer, bulletGroup, rotationLeft, rotationRight) {
        if (pointer.x > 450) {
            Phaser.Actions.SetRotation(bulletGroup.getChildren(), rotationLeft);

        } else {
            Phaser.Actions.SetRotation(bulletGroup.getChildren(), rotationRight);
        }


        this.body.reset(x + ((pointer.x - 450) / 7), y - 62 + (Math.abs(pointer.x - 450)) / 8);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);
        this.setVelocityX(pointer.x - 450);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y <= -32) {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    destroyBullet() {
        this.setActive(false);
        this.setVisible(false);
    }

}