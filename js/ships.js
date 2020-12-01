class Ships extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 200,
            key: 'ship',
            active: false,
            visible: false,
            classType: Ship
        });
    }

    spawnShip(x, speed, bullets) {
        let ship = this.getFirstDead(false);

        if (ship) {
            ship.spawn(x, speed, bullets);
        }
    }
}

