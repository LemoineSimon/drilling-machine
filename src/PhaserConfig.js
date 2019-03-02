import Phaser from 'phaser'

export default {
    type: Phaser.AUTO,
    parent: 'game',
    width: 770,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1500},
            debug: true
        }
    },
    localStorageName: 'space-miner'
}