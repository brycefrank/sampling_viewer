import Phaser from 'phaser';
import * as d3 from 'd3';
import { rnorm } from './popsim'

export default class extends Phaser.Scene {
    constructor() {
        super({key:"Forest"});
        this.cell_width = 12;
        this.cell_height = 12;
    }

    preload() {
    }

    create() {
        this.graphics = this.add.graphics();
        this.cameras.main.setBackgroundColor('#ffffff');

        this.color_scale = d3.scaleSequential()
            .domain([80, 140])
            .interpolator(d3.interpolateViridis);

        this.cells = [];
        for (var i = 0; i < window.innerHeight; i+=this.cell_height) {
            for (var j = 0; j < window.innerWidth; j+=this.cell_width){
                this.cells.push({
                    x: j,
                    y: i,
                    val: rnorm(100, 10)
                })
            }
        }

    }

    update() {
        this.graphics.clear();

        for (var i = 0; i < this.cells.length; i++) {
            var cell = this.cells[i];
            var color = parseInt(d3.color(this.color_scale(cell.val)).hex().substr(1), 16);
            this.graphics.fillStyle(color);
            this.graphics.fillRect(cell.x, cell.y, this.cell_width-2, this.cell_height-2);
        }
    }
}
