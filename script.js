//Define
const canvas = document.querySelector("canvas");
const options = {
    blockColor: "orange",
    blockSize: 50,
    pacmanSpeed: 5,
    pacmanRadius: 15,
    pacmanColor: "yellow",
};

const ctx = canvas.getContext("2d");

//Map layout
let map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

//Array of block objs
let blocks = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Block template
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

//Draw the map
for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
        if(map[j][i] === 1) {
            let current = new Block(i * options.blockSize, j * options.blockSize);
            blocks.push(current);
            current.draw();
        } else continue;
    };
};

//Pacman template
class Pacman {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.r = options.pacmanRadius;
        this.color = options.pacmanColor;
    };

    update() {
        this.draw();
        this.x += this.vx;
        this.y += this.vy;
    };

    draw() {
        ctx.fillStyle = options.pacmanColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    };
};

//Draw pacman
let pacman = new Pacman(1.5 * options.blockSize, 1.5 * options.blockSize);

//Start gameLoop()
gameLoop();

//Define controls
window.addEventListener('keydown', (event) => {
    if(event.key == "w") {
        pacman.vy = -options.pacmanSpeed;
        pacman.vx = 0;
    };

    if(event.key == "a") {
        pacman.vx = -options.pacmanSpeed;
        pacman.vy = 0;
    };

    if(event.key == "s") {
        pacman.vy = options.pacmanSpeed;
        pacman.vx = 0;
    };

    if(event.key == "d") {
        pacman.vx = options.pacmanSpeed;
        pacman.vy = 0;
    };

});

//Define gameLoop()
function gameLoop() {
    pacman.update();
    requestAnimationFrame(gameLoop);
};

//Collision detection
function collisionDetection(block, pacman) {
    
};
