class Grid extends Phaser.Scene {
    constructor() {
        super({key:"Grid"});
        this.c = 10;
        this.cells = [];
    }

    preload() {
    }

    create() {
        this.cameras.main.setBackgroundColor('#ffffff');

        this.graphics = this.add.graphics();

        for (var i = 0; i < 100; i ++ ) {
            this.cells.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                v: 1,
                a: Math.random() * 2 * Math.PI,
            });
        }
    }

    update() {

        this.graphics.clear();
        this.graphics.fillStyle(0x9966ff, 1);

        for (var c in this.cells) {
            this.graphics.fillRect(c.x, c.y, this.c)
        }


    }

}