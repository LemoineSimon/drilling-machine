import Phaser from 'phaser';
import GameConfig from '../GameConfig';
import Robot from "../entities/Robot";
import Ground from "../entities/Ground";

export default class extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
        this.config = GameConfig;
        this.dirtGround = [];
        this.tileWidth = 70;
        this.mapOffset = {
            x: 0,
            y: 400
        };
        this.money = 0;
        this.shopOpen = false;
    }

    init() {
    }

    preload() {
        this.robot = new Robot(this);
        this.ground = new Ground(this);
    }

    create() {
        this.ground.generateBoard(this.mapOffset);
        this.createBuildings();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.robot.create();
        var camera = this.cameras.main;
        camera.setBounds(0, 0, this.ground.cols * this.ground.tileWidth, this.ground.rows * this.ground.tileWidth + this.mapOffset.y);
        camera.startFollow(this.robot.entity);
        camera.setBackgroundColor('#003152');
        this.physics.add.collider(this.robot.entity, this.ground.group);
        this.setCollideBuildingsEffect();
        this.scene.launch('UiGame');
        this.scene.launch('Shop');
    }

    update() {
        this.robot.update();
        if (this.robot.IS_DRILLING()) {
            let destination = this.getDrillDestination();
            if (!destination) {
                return false;
            }
            if (!this.ground.isValidChunk(destination)) {
                return false;
            }
            if (!this.ground.isBreakableChunk(destination)) {
                return false;
            }
            let mineral = this.ground.getChunk(destination);
            let robotDestination = {
                x: destination.x * this.tileWidth + (this.robot.entity.body.halfWidth) + (this.tileWidth - this.robot.entity.width) / 2,
                y: destination.y * this.tileWidth + this.mapOffset.y + this.tileWidth / 2,
                way: destination.way
            };
            this.robot.moveTo(robotDestination, mineral, () => {
                this.ground.destroyChunk(destination);
            });
        }
    }

    getDrillDestination() {
        if (this.robot.entity.body.touching.down && this.robot.state === Robot.STATEMENT().down) {
            return {
                x: Math.round(Math.abs(this.robot.entity.body.x / this.tileWidth)),
                y: Math.round(Math.abs((this.robot.entity.body.bottom - this.mapOffset.y)) / this.tileWidth),
                way: 'bottom'
            }
        } else if (this.robot.entity.body.touching.left && this.robot.state === Robot.STATEMENT().left) {
            return {
                x: Math.round(Math.abs((this.robot.entity.body.left - this.tileWidth) / this.tileWidth)),
                y: Math.round(Math.abs((this.robot.entity.body.bottom - this.mapOffset.y - this.tileWidth) / this.tileWidth)),
                way: 'left'
            }
        } else if (this.robot.entity.body.touching.right && this.robot.state === Robot.STATEMENT().right) {
            return {
                x: Math.round(Math.abs(this.robot.entity.body.right / this.tileWidth)),
                y: Math.round(Math.abs((this.robot.entity.body.bottom - this.mapOffset.y - this.tileWidth)) / this.tileWidth),
                way: 'right'
            }
        } else {
            return false;
        }
    }

    createBuildings() {
        this.fuelBuilding = this.physics.add.sprite(this.tileWidth * 2, this.mapOffset.y - 140, 'building-fuel');
        this.fuelBuilding.setDisplayOrigin(0, 0);
        this.fuelBuilding.body.allowGravity = false;

        this.factoryBuilding = this.physics.add.sprite(this.tileWidth * 10, this.mapOffset.y - 140, 'building-factory');
        this.factoryBuilding.setDisplayOrigin(0, 0);
        this.factoryBuilding.body.setImmovable(true);
        this.factoryBuilding.body.allowGravity = false;

        this.shopBuilding = this.physics.add.sprite(this.tileWidth * 19, this.mapOffset.y - 140, 'building-shop');
        this.shopBuilding.setDisplayOrigin(0, 0);
        this.shopBuilding.body.allowGravity = false;
    }

    setCollideBuildingsEffect() {
        this.physics.add.overlap(this.fuelBuilding, this.robot.entity, () => {
            if (this.cursors.space.isDown) {
                this.robot.fuel = this.robot.fuelMax;
                this.events.emit('update-fuel', this.robot.fuel);
            }
        });

        this.physics.add.overlap(this.factoryBuilding, this.robot.entity, () => {
            if (this.cursors.space.isDown && Object.keys(this.robot.cargo).length > 0) {
                Object.keys(this.robot.cargo).forEach((mineral) => {
                    this.money += this.robot.cargo[mineral] * this.config.minerals[mineral].price;
                });
                this.robot.cargo = {};
            }
        });

        this.physics.add.overlap(this.shopBuilding, this.robot.entity, () => {
            if (this.cursors.space.isDown) {
                setTimeout(() => {
                    this.toggleShop();
                }, 50)
            }
        })
    }

    toggleShop() {
        console.log(this.shopOpen)
        if (this.shopOpen) {
            this.scene.sleep('Shop');
            this.scene.resume();
        } else {
            this.scene.wake('Shop');
            this.scene.pause();
        }
        this.shopOpen = !this.shopOpen;
        console.log(this.shopOpen)
    }
}