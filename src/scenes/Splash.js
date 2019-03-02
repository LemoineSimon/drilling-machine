import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'SplashScene'})
    }

    preload() {
        //
        // load your assets
        //
        this.load.image('dirt', 'assets/sprite/dirt.png');
        this.load.image('rock', 'assets/sprite/rock.png');
        this.load.image('rock-unbreakable', 'assets/sprite/rock-unbreakable.png');
        this.load.image('iron', 'assets/sprite/iron.png');
        this.load.image('robot', 'assets/sprite/robot.png');
        this.load.image('building-shop', 'assets/sprite/building-shop.png');
        this.load.image('building-fuel', 'assets/sprite/building-fuel.png');
        this.load.image('building-factory', 'assets/sprite/building-factory.png');
        this.load.image('motor', 'assets/sprite/motor.png');
    }

    create() {
        this.scene.start('GameScene')
    }

    update() {
    }
}