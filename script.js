//Define vars
const canvas = document.querySelector("canvas");
const score = document.querySelector("p");
const options = {
    blockColor: "darkblue",
    blockSize: 36,
    pacmanSpeed: 3.2,
    pacmanRadius: 16.4,
    checkRadius: 96,
    pacmanColor: "yellow",
    edibleColor: "white",
    edibleRadius: 6,
    foodEatenPoints: 100,
};

const ctx = canvas.getContext("2d");

//Save last keypress
let command = {
    primary: "",
    secondary: ""
};

//Map layouts
let currentMap = 35436554;
let map1 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 2],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 2],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 2, 2, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 2, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1, 1, 0, 0],
    [1, 0, 1, 2, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 2, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let map3 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 2],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 2],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let maps = [map1, map, map3];

//Array of block objs && food objs
let blocks = [];
let edibles = [];
let edibleCount = 0;

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

//Food
class Edible {
    exists = true;

    constructor({x, y}) {
        this.x = x;
        this.y = y;
    };

    draw() {
        if(this.exists) {
            ctx.fillStyle = options.edibleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, options.edibleRadius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        };
    }
};

//Fill map arr with block objs && drugs
for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
        if(map[i][j] === 1) {
            blocks.push(new Block(j * options.blockSize, i * options.blockSize));
        } else if(map[i][j] === 0) {
            edibles.push(new Edible({x: j * options.blockSize + options.blockSize / 2, y: i * options.blockSize + options.blockSize / 2}));
            edibleCount++;
        };
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

        if(command.primary == "a") {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 1.25 * Math.PI, 0.25 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 1.75 * Math.PI, 0.75 * Math.PI, false);
            ctx.fill();
        } else if(command.primary == "s") {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0.75 * Math.PI, 1.75 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 1.25 * Math.PI, 0.25 * Math.PI, false);
            ctx.fill();
        } else if(command.primary == "w") {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 1.75 * Math.PI, 0.75 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0.25 * Math.PI, 1.25 * Math.PI, false);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0.25 * Math.PI, 1.25 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0.75 * Math.PI, 1.75 * Math.PI, false);
            ctx.fill();
        };
        
        ctx.stroke();
        ctx.closePath();
    };

};

//Draw pacman
let pacman = new Pacman(1.5 * options.blockSize, 1.5 * options.blockSize);

//Points
let points = -100;

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
    let area = getNearestBlock();
    if(area.some(block => blockCollisionDetection(block, pacman))) pacman.rollback();
    
    //drug test
    for(let i = 0; i < edibles.length; i++) {
        if(circleCollisionDetection(edibles[i], pacman) < options.edibleRadius + options.pacmanRadius) {
            if(edibles[i].exists) {
                points += options.foodEatenPoints;
                edibles[i].exists = false;
                edibleCount--;
            };
        };

        if(edibleCount == 0) points = "END";
    };

    //update score
    score.textContent = points;
    
    //draw me a sandwich
    edibles.forEach(edible => edible.draw());
    
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
function blockCollisionDetection(block, pacman) {
    return block.x + options.blockSize >= pacman.x - pacman.r &&
        block.y + options.blockSize >= pacman.y - pacman.r &&
        block.x <= pacman.x + pacman.r && 
        block.y <= pacman.y + pacman.r
};

function circleCollisionDetection(edible, pacman) {
    return Math.sqrt((edible.x - pacman.x) ** 2 + (edible.y - pacman.y) ** 2);
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

    let area = getNearestBlock();

    pacman.x += options.pacmanSpeed;
    if(!area.some(block => blockCollisionDetection(block, pacman))) {
        possible.push("d");
    };
    pacman.x -= options.pacmanSpeed;
    
    pacman.x -= options.pacmanSpeed;
    if(!area.some(block => blockCollisionDetection(block, pacman))) {
        possible.push("a");
    };
    pacman.x += options.pacmanSpeed;

    pacman.y += options.pacmanSpeed;
    if(!area.some(block => blockCollisionDetection(block, pacman))) {
        possible.push("s");
    };
    pacman.y -= options.pacmanSpeed;

    pacman.y -= options.pacmanSpeed;
    if(!area.some(block => blockCollisionDetection(block, pacman))) {
        possible.push("w");
    };
    pacman.y += options.pacmanSpeed;

    console.log(possible);

    return possible;
};

function getNearestBlock() {
    let near = [];
    for(let block of blocks) {
        if(collisionRadiusCircle(block)) near.push(block);
        else continue;
    };
    return near;
};
