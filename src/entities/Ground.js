import Phaser from "phaser";

export default class Ground {
    constructor(scene) {
        this.scene = scene;
        this.rows = 10;
        this.cols = 25;
        this.map = [];
        this.group = this.scene.physics.add.staticGroup();
        this.tileWidth = 70;
    }

    generateBoard(mapOffset) {
        this.mapOffset = mapOffset;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let chunk = this.createChunk(x, y);
                this.map.push(chunk);
            }
        }
    }

    createChunk(x, y) {
        let chunk = null;
        let xD = (this.mapOffset.x + this.tileWidth * .5) + (x * this.tileWidth);
        let yD = this.mapOffset.y + (y * this.tileWidth) + this.tileWidth * .5;
        if (((x > 1 && x < 5) && y === 0) || ((x > 9 && x < 15) && y === 0) || ((x > 18 && x < 23) && y === 0)) {
            chunk = this.group.create(xD, yD, 'rock-unbreakable');
            chunk.setData('breakable', false);
        } else {
            let random = Phaser.Math.RND.between(0, 10)
            if (random <= 1 && y > 0) {
                chunk = null;
            } else if (random <= 3) {
                chunk = this.group.create(xD, yD, 'rock');
                chunk.setData({
                    'type': 'rock',
                    'breakable': true,
                    'canCollect': false
                });
            } else if (random <= 5) {
                chunk = this.group.create(xD, yD, 'iron');
                chunk.setData({
                    'type': 'iron',
                    'breakable': true,
                    'canCollect': true
                });
            } else {
                chunk = this.group.create(xD, yD, 'dirt');
                chunk.setData({
                    'type': 'dirt',
                    'breakable': true,
                    'canCollect': false
                });
            }

        }
        return chunk;
    }

    isValidChunk(destination) {
        return this.map[(destination.y * this.cols) + destination.x] !== undefined;
    }

    isBreakableChunk(destination) {
        return this.map[(destination.y * this.cols) + destination.x].getData('breakable');
    }

    getChunk(destination) {
        return this.map[(destination.y * this.cols) + destination.x]
    }

    destroyChunk(destination) {
        this.map[(destination.y * this.cols) + destination.x].destroy();
    }
}