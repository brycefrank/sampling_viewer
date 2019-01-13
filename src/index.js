import 'phaser';
import Forest from './Forest';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scene: [ Forest ]
};

var game = new Phaser.Game(config);
