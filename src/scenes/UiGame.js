export default class UiGame extends Phaser.Scene {
    constructor() {
        super({key: 'UiGame'});
        this.fuel = 100;
        this.money = 0;
    }

    preload() {

    }


    create() {
        var r1 = this.add.rectangle(30, 30, 100, 15, 0xaaaaaa);
        r1.setDisplayOrigin(0, 0);
        this.fuelMask = this.add.rectangle(30, 30, 20, 15, 0xdddddd);
        this.fuelMask.setDisplayOrigin(0, 0);
        let gameScene = this.scene.get('GameScene');
        gameScene.events.on('update-fuel', (fuel) => {
            this.fuel = fuel;
            if (this.fuel > 70) {
                this.fuelMask.setFillStyle(0x4BC427);
            } else if (this.fuel > 40) {
                this.fuelMask.setFillStyle(0xFF7E0C);
            } else {
                this.fuelMask.setFillStyle(0xFF1A1F);
            }
            this.fuelMask.width = this.fuel;
        })
        gameScene.events.on('update-money', (money) => {
            this.money = money;
        })
    }

    update() {

    }
}