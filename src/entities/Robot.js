export default class Robot {
    constructor(scene) {
        this.scene = scene;
        this.spriteKey = 'robot';
        this.entity = null;
        this.state = Robot.STATEMENT().iddle;
        this.currentAction = Robot.ACTION().none;
        this.isAnimated = false;
        this.velocity = 200;
        this.minVelocityY = 300;
        this.velocityY = this.minVelocityY;
        this.particlesEmmiter = [];
        this.loseFuelEvent = null;
        this.fuelMax = 100;
        this.fuel = this.fuelMax;
        this.cargo = {};
        this.cargoSize = 15;
        this.diggerPower = 1;
        this.thrustPower = 1;
    }

    create() {
        this.entity = this.scene.physics.add.sprite(100, 300, this.spriteKey);
        this.entity.body.setMaxVelocity(1000);
        var particlesDirt = this.scene.add.particles('dirt');
        var particlesIron = this.scene.add.particles('iron');
        var particlesRock = this.scene.add.particles('rock');
        this.particlesEmmiter['dirt'] = particlesDirt.createEmitter({
            speed: 20,
            on: false,
            lifespan: 500,
            scale: {start: 0.1, end: 0.15},
        });
        this.particlesEmmiter['iron'] = particlesIron.createEmitter({
            speed: 20,
            on: false,
            lifespan: 500,
            scale: {start: 0.1, end: 0.15},
        });
        this.particlesEmmiter['rock'] = particlesRock.createEmitter({
            speed: 20,
            on: false,
            lifespan: 500,
            scale: {start: 0.1, end: 0.15},
        });
        this.loseFuelEvent = this.scene.time.addEvent({
            delay: 500,
            callback: this.looseFuel,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        this.loseFuelEvent.getProgress();
        this.move();
    }

    move() {
        if (this.scene.cursors.down.isDown && !this.isAnimated) {
            this.state = Robot.STATEMENT().down;
            this.entity.body.setVelocityX(0);
        } else if (this.scene.cursors.left.isDown && !this.isAnimated) {
            this.state = Robot.STATEMENT().left;
            this.entity.body.setVelocityX(this.velocity * -1);
        } else if (this.scene.cursors.right.isDown && !this.isAnimated) {
            this.state = Robot.STATEMENT().right;
            this.entity.body.setVelocityX(this.velocity);
        } else {
            this.state = Robot.STATEMENT().iddle;
            this.entity.body.setVelocityX(0);
        }
        if (this.scene.cursors.space.isDown && !this.isAnimated) {
            this.currentAction = Robot.ACTION().drill;
        } else if (this.scene.cursors.up.isDown && !this.isAnimated) {
            if (this.velocityY < this.minVelocityY) {
                this.velocityY = this.minVelocityY + 1;
            } else {
                this.velocityY++;
            }
            this.currentAction = Robot.STATEMENT().fly;
            this.entity.body.setVelocityY(this.velocityY * -1 * this.thrustPower);
            this.currentAction = Robot.ACTION().none;
        } else {
            if (this.velocityY < 0) {
                this.velocityY = 0
            } else {
                this.velocityY--;
            }
            this.currentAction = Robot.ACTION().none;
        }
    }

    moveTo(direction, mineral, callback) {
        this.scene.tweens.add({
            targets: this.entity,
            x: direction.x,
            y: direction.y,
            duration: 1500,
            onStart: () => {
                this.isAnimated = true;
                this.entity.body.enable = false;
                this.emitParticules(direction, mineral);
            },
            onComplete: () => {
                this.isAnimated = false;
                this.entity.body.enable = true;
                if (mineral.getData('canCollect')) {
                    this.addToCargo(mineral);
                }
                this.stopParticules(mineral);
                callback();
            }
        })
    }

    emitParticules(direction, mineral) {
        let offset = {
            x: 0,
            y: 0
        };
        if (direction.way === 'bottom') {
            offset.y = this.entity.body.halfHeight;
        } else if (direction.way === 'left') {
            offset.x = this.entity.body.halfWidth * -1;
        } else if (direction.way === 'right') {
            offset.x = this.entity.body.halfWidth;
        }
        this.particlesEmmiter[mineral.getData('type')].start();
        this.particlesEmmiter[mineral.getData('type')].startFollow(this.entity, offset.x, offset.y);
    }

    stopParticules(mineral) {
        this.particlesEmmiter[mineral.getData('type')].stop();
    }

    looseFuel() {
        if (this.fuel > 0) {
            this.fuel--;
            this.scene.events.emit('update-fuel', this.fuel)
        } else {
            console.log('Out of fuel')
        }
    }

    addToCargo(mineral) {
        let type = mineral.getData('type');
        if (this.cargo[type] === undefined) {
            this.cargo[type] = 1;
        } else {
            this.cargo[type]++;
        }
        console.log(this.cargo)
    }

    static STATEMENT() {
        return {
            'iddle': 0,
            'down': 1,
            'left': 2,
            'right': 3,
        }
    }

    static ACTION() {
        return {
            'none': 0,
            'drill': 1,
            'fly': 2,
            'refuel': 3,
            'repair': 4
        }
    }

    IS_DRILLING() {
        return this.currentAction === Robot.ACTION().drill
    }
}