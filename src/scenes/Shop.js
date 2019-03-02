export default class Shop extends Phaser.Scene {
    constructor() {
        super({key: 'Shop'});
    }

    create() {
        this.scene.setVisible(false);
        this.motor = this.add.sprite(200, 200, 'motor');
        this.motor.setInteractive().on('pointerdown', (pointer) => {
            console.log('buy motor');
            this.scene.get('GameScene').toggleShop();
        })
    }
}