import Phaser from 'phaser';
// FIXME importing too much from d3
import {scaleSequential, color, interpolateViridis} from 'd3';
import { sim_x } from './popsim'

export default class extends Phaser.Scene {
    constructor() {
        super({key:"Forest"});
        this.cell_width = 16;
        this.cell_height = 16;

        this.cell_x = 32;
        this.cell_y = 24;

    }

    preload() {
    }

    create() {
        this.graphics = this.add.graphics();
        this.cameras.main.setBackgroundColor('#e8e9ea');

        this.color_scale = scaleSequential()
            .domain([-3, 3])
            .interpolator(interpolateViridis);

        this.cells = [];
        var x = sim_x(this.cell_y, this.cell_x);
        // FIXME this is sloppy
        var k = 0;
        for (var i = 0; i < this.cell_y * this.cell_height; i+=this.cell_height) {
            for (var j = 0; j < this.cell_x * this.cell_width; j+=this.cell_width){
                var rect = new Phaser.Geom.Rectangle(j, i, this.cell_width, this.cell_height);
                rect.val = x.get(k, 0);
                this.cells.push(rect);
                k +=1;
            }
        }
    }

    update() {
        this.graphics.clear();

        for (var i = 0; i < this.cells.length; i++) {
            var cell = this.cells[i];
            var cell_color = parseInt(color(this.color_scale(cell.val)).hex().substr(1), 16);

            if (Phaser.Geom.Rectangle.Contains(cell, this.input.activePointer.x, this.input.activePointer.y)) {
                this.graphics.fillStyle(16777215); //white

            }
            else{
                this.graphics.fillStyle(cell_color)
            }
            this.graphics.fillRectShape(cell);

        }
    }
}
