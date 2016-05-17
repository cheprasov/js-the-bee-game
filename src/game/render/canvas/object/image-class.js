"use strict";

export default class ImageClass {

    constructor(options) {
        this.setImage(options.image);
        this.setSize(options.width, options.height);

        if ('sprites' in options) {
            this.setSprites(options.sprites);
        }

        this.scale = options.scale || 1;
        this.loop = options.loop || Infinity;
    }

    setSize(width, height) {
        this.width = width || 0;
        this.height = height || 0;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getScale() {
        return this.scale;
    }

    setSprites(sprites) {
        this.sprites = {
            loops: sprites.loops || 1,
            speed: sprites.speed || 1,
            count: sprites.count || 1,
            frames: sprites.frames || [],
            _time: 0
        };
        this.sprites.rate = this.sprites.speed / this.sprites.count;
        if (sprites && sprites.grid && sprites.grid.cols && sprites.grid.rows) {
            let count = 0;
            for (let rows = 0; rows < sprites.grid.rows; rows += 1) {
                for (let cols = 0; cols < sprites.grid.cols; cols += 1) {
                    if (count < this.sprites.count) {
                        this.sprites.frames.push({
                            x: cols * this.width + (sprites.grid.x || 0),
                            y: rows * this.height + (sprites.grid.y || 0)
                        });
                        count += 1;
                    }
                }
            }
        }
    }

    /**
     * @param {string} img
     */
    setImage(img) {
        this.image = null;
        let image = new Image();
        image.onload = () => {
            this.image = image;
        };
        image.src = img;
    }

    /**
     * @param {CanvasRenderingContext2D} context
     * @param {float} time
     */
    render(context, time) {
        if (!this.image) {
            return false;
        }
        if (this.loop <= 0) {
            return false;
        }
        if (this.scale && this.scale !== 1) {
            context.scale(this.scale, this.scale);
        }
        if (this.sprites) {
            if (!this.sprites._time) {
                this.lastIndex = -1;
                this.sprites._time = time;
            }
            let delta = time - this.sprites._time;
            let index = Math.floor((delta % this.sprites.speed) / this.sprites.rate);
            if (index < this.lastIndex) {
                if (--this.loop <= 0) {
                    return false;
                }
            }
            this.lastIndex = index;
            let frame = this.sprites.frames[index];
            context.drawImage(this.image, frame.x, frame.y, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            context.drawImage(this.image, 0, 0, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
        }
        return true;
    }

}
