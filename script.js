const canvas = document.querySelector("canvas");
const options = {
    blockColor: "orange",
    blockSize: 50,
};

const ctx = canvas.getContext("2d");

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Block {
    static width = options.blockSize;
    static height = options.blockSize;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    draw() {
        ctx.fillStyle = options.blockColor;
        ctx.fillRect(this.x, this.y, Block.width, Block.height);
    };
};

for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
        if(map[i][j] === 1) {
            (new Block(i * options.blockSize, j * options.blockSize)).draw();
        } else continue;
    };
};