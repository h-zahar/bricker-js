import { isCollision } from "./collision.js";

export default class Brick {
    constructor(frame) {
        // this.paddle = frame.paddle;
        this.brick = document.getElementById("brick");
        this.gameWidth = frame.game.width;
        this.gameHeight = frame.game.height;
        this.ball = frame.ball;
        this.levels = frame.levels;
        this.level = frame.levels.level1;

        this.offset = 10;

        this.speed = {
            x: 40,
            y: 40
        }

        this.width = (this.gameWidth - (this.offset * (frame.levels.level1[0].length + 1))) / (frame.levels.level1[0].length);

        this.height = 20;

        this.position = {
            x: this.offset,
            y: this.offset
        };
    }

    draw(/** @type {CanvasRenderingContext2D} */ ctx) {
        for ( let i = 0; i < this.level.length; i++) {
            for (let j = 0; j < this.level[i].length; j++) {
                this.level[i][j] ? ctx.drawImage(
                    this.brick, 
                    this.position.x + (j * (this.width + this.offset)), 
                    this.position.y + (i * (this.height + this.offset)), 
                    this.width, 
                    this.height
                ) : null;
            }
        }
    }

    update(deltaTime) {

        for ( let i = 0; i < this.level.length; i++) {
            for (let j = 0; j < this.level[i].length; j++) {
                this.level[i][j] ? ((isCollision(
                    this.ball,
                    {
                        position: {
                            x: this.position.x + (j * (this.width + this.offset)), 
                            y: this.position.y + (i * (this.height + this.offset)), 
                        },
                        width: this.width, 
                        height: this.height
                    }
                )) ? (() => { 
                    this.ball.speed.y = -this.ball.speed.y;
                    this.level[i][j] = null;
                    const detect = this.level.filter(l => l.filter(l1 => l1 === 1).length != 0);
                        if (detect.length === 0) {
                           window.alert("You won!");
                           location.reload();
                        }
                    }

                    )() : null
                )
                : null;
            }
        }
    }
};