class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 50,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y, pointer, bulletGroup, rotationLeft, rotationRight)
    {
        let bullet = this.getFirstDead(false);
        
        bulletGroup.add(bullet);

        if (bullet){
            bullet.fire(x, y, pointer, bulletGroup, rotationLeft, rotationRight);
        }
    }
}

