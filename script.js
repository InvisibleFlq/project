//Define vars
const canvas = document.querySelector("canvas");
const options = {
    blockColor: "orange",
    blockSize: 40,
    pacmanSpeed: 4,
    pacmanRadius: 16,
    checkRadius: 96,
    pacmanColor: "yellow",
};

const ctx = canvas.getContext("2d");

//Save last keypress
let command = {
    primary: "",
    secondary: ""
};

//Map layout
let map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
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

//Fill map arr with block bojs
for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
        if(map[i][j] === 1) {
            blocks.push(new Block(j * options.blockSize, i * options.blockSize));
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

    rollback() {
        this.x -= this.vx;
        this.y -= this.vy;
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
    command.secondary = event.key;
    if(command.primary == "") command.primary = command.secondary;
});

//Define gameLoop()
function gameLoop() {

    //clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    //draw the map
    blocks.forEach(block => block.draw());
    
    //update pacman position
    pacman.update();

    //check collision
    let area = getNearest();
    if(area.some(block => collisionDetection(block, pacman))) pacman.rollback();

    //possible moves check
    let possible = possibleMoves(pacman);

    if(possible.some(el => el == command.secondary)) command.primary = command.secondary;

    if(command.primary == "w") {
        pacman.vy = -options.pacmanSpeed;
        pacman.vx = 0;
    };

    if(command.primary == "a") {
        pacman.vx = -options.pacmanSpeed;
        pacman.vy = 0;
    };

    if(command.primary == "s") {
        pacman.vy = options.pacmanSpeed;
        pacman.vx = 0;
    };

    if(command.primary == "d") {
        pacman.vx = options.pacmanSpeed;
        pacman.vy = 0;
    };

    requestAnimationFrame(gameLoop);
};

//Collision detection
function collisionDetection(block, pacman) {
    return block.x + options.blockSize >= pacman.x - pacman.r &&
        block.y + options.blockSize >= pacman.y - pacman.r &&
        block.x <= pacman.x + pacman.r && 
        block.y <= pacman.y + pacman.r
};

function collisionRadiusCircle(block) {
    return block.x + options.blockSize >= pacman.x - options.checkRadius &&
        block.y + options.blockSize >= pacman.y - options.checkRadius &&
        block.x <= pacman.x + options.checkRadius && 
        block.y <= pacman.y + options.checkRadius
};

//get possible moves for pacman
function possibleMoves(pacman) {
    let possible = [];

    let area = getNearest();

    pacman.x += options.pacmanSpeed;
    if(!area.some(block => collisionDetection(block, pacman))) {
        possible.push("d");
    };
    pacman.x -= options.pacmanSpeed;
    
    pacman.x -= options.pacmanSpeed;
    if(!area.some(block => collisionDetection(block, pacman))) {
        possible.push("a");
    };
    pacman.x += options.pacmanSpeed;

    pacman.y += options.pacmanSpeed;
    if(!area.some(block => collisionDetection(block, pacman))) {
        possible.push("s");
    };
    pacman.y -= options.pacmanSpeed;

    pacman.y -= options.pacmanSpeed;
    if(!area.some(block => collisionDetection(block, pacman))) {
        possible.push("w");
    };
    pacman.y += options.pacmanSpeed;

    console.log(possible);

    return possible;
};

function getNearest() {
    let near = [];
    for(let block of blocks) {
        if(collisionRadiusCircle(block)) near.push(block);
        else continue;
    };
    return near;
};
