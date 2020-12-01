
var worldSizeX = 900;
var worldSizeY = 900;
var cursors;
var gravity = 10;
var group;
var spawnTimer = 500;
var shipSpeed = 130;
var text;
var textLive;
var bullets;
var ships;
var turretGunHead;
var turretGunBody;
var score = 0;
var lives = 3;
var heart1;
var heart2;
var heart3;
var startGame = false;
var interval;
var gameOver = false;
var gameOverText;


function preload() {
    this.load.image('moon', 'assets/moon3.png');
    this.load.image('turretgunhead', 'assets/turret-gun-head.png');
    this.load.image('turretgunbody', 'assets/turret-gun-body.png');
    this.load.image('bullet', 'assets/sprites/bullets/bullet.png');
    this.load.image('ship', 'assets/sprites/ship2.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('heart', 'assets/heart.png');
}

function create() {

    this.cameras.main.setBounds(0, 0, worldSizeX, worldSizeY);
    this.physics.world.setBounds(0, 0, worldSizeX, worldSizeY);

    this.add.image(0, 0, 'moon').setOrigin(0);

    bullets = new Bullets(this);
    ships = new Ships(this);

    this.turretGunBody = this.add.sprite(450, 790, 'turretgunbody');
    this.turretGunHead = this.add.image(450, 790, 'turretgunhead');

    group = this.add.group();
    group.add(this.turretGunHead);

    cursors = this.input.keyboard.createCursorKeys();

    interval = setInterval(() => {
        if (startGame) {
            ships.spawnShip(calculateRandomValue(), shipSpeed, bullets)
        }
    }, spawnTimer);

    textLive = this.add.text(20, 846);
    textLive.setText('Lives: ');

    text = this.add.text(32, 32);
    text.setText('Score: ' + score);

    let startGameText = this.add.text(350, 350);
    startGameText.setText('Press mouse1 to start!');

    gameOverText = this.add.text(350, 350);

    this.input.on('pointermove', (pointer) => {
        if (pointer.x > 450) {
            Phaser.Actions.SetRotation(group.getChildren(), calculateRotatationValue(pointer));

        } else {
            Phaser.Actions.SetRotation(group.getChildren(), calculateRotatationValue2(pointer));
        }
    });

    this.input.on('pointerdown', (pointer) => {
        if (gameOver){
            location.reload();
        }
        startGame = true;
        startGameText.setText('');
        gameOverText.setText('');

        let bulletGroup = this.add.group();

        bullets.fireBullet(this.turretGunHead.x + 15, this.turretGunHead.y, pointer, bulletGroup, calculateRotatationValue(pointer), calculateRotatationValue2(pointer));
        bullets.fireBullet(this.turretGunHead.x - 15, this.turretGunHead.y, pointer, bulletGroup, calculateRotatationValue(pointer), calculateRotatationValue2(pointer));
    });

    heart1 = this.add.image(100, 850, 'heart');
    heart2 = this.add.image(150, 850, 'heart');
    heart3 = this.add.image(200, 850, 'heart');

    let walls = this.physics.add.group();
    let wall = this.add.image(450, 760, 'wall');
    walls.add(wall);
    wall.visible = false;

    this.physics.add.overlap(bullets, ships, destroyShip, null, this);

    this.physics.add.overlap(walls, ships, shipCrashed, null, this);

}


function destroyShip(bullet, ship) {
    if (ship.active === true && bullet.active === true) {
        ship.setActive(false);
        ship.setVisible(false);
        bullet.setActive(false);
        bullet.setVisible(false);
        score += 10
        text.setText('Score: ' + score);
    }
}

function shipCrashed(wall, ship) {
    if (ship.active === true) {
        ship.setActive(false);
        ship.setVisible(false);
        score -= 100
        text.setText('Score: ' + score);
        loseHealth();
    }
}

function loseHealth() {
    lives -= 1;
    if (heart3.active === true) {
        heart3.setActive(false);
        heart3.setVisible(false);

    } else if (heart2.active === true) {
        heart2.setActive(false);
        heart2.setVisible(false);

    } else if (heart1.active === true) {
        heart1.setActive(false);
        heart1.setVisible(false);
        gameover();
    }
}

function gameover() {
    gameOver = true;
    clearInterval(interval);
    gameOverText.setText('GameOver!! Press mouse1 to restart!');
}

function update() {
}

function calculateHypotenuse(pointer, adjacent) {
    let opposite;
    if (pointer.y < 600) {
        opposite = worldSizeY - pointer.y - 110;
    } else {
        opposite = worldSizeY - 600 - 110;
    }

    let adjacentSqr = adjacent * adjacent;
    let oppositeSqr = opposite * opposite;
    return Math.sqrt(adjacentSqr + oppositeSqr);
}

function calculateRotatationValue(pointer) {
    let adjacent = pointer.x - 450;
    let hypotenuse = calculateHypotenuse(pointer, adjacent);

    let value = adjacent / hypotenuse;
    let rotationValue = Math.acos(value);

    rotationValue = (Math.PI / 2) - rotationValue;

    return rotationValue;
}

function calculateRotatationValue2(pointer) {
    let adjacent = 450 - pointer.x;
    let hypotenuse = calculateHypotenuse(pointer, adjacent);

    let value = adjacent / hypotenuse;
    let rotationValue = Math.acos(value);

    rotationValue = (3 * Math.PI / 2) + rotationValue;

    return rotationValue;
}

function calculateRandomValue() {
    return Math.floor((Math.random() * (worldSizeX - 60)) + 1) + 30;
}

let config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    width: 900,
    height: 900,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
