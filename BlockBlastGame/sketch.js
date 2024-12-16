let grid = 5;  
let size = 80;  
let blocks = [];  
let points = 0;  
let dingSound;  // Declare a variable to hold the sound

function setup() {
    createCanvas(400, 400);
    
    // Load the ding sound
    dingSound = new Audio('sounds/ding-101492.mp3'); // Adjust path if needed

    // Initialize grid with blocks
    for (let r = 0; r < grid; r++) {
        let rowBlocks = [];
        for (let c = 0; c < grid; c++) {
            rowBlocks.push({ active: true, color: color(random(255), random(255), random(255)) });
        }
        blocks.push(rowBlocks);
    }
}

function draw() {
    background(255);
    renderGrid();  
    checkVictory();  
}

function renderGrid() {
    for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
            let block = blocks[r][c];
            if (block.active) {
                fill(block.color);
                rect(c * size, r * size, size, size);
            }
        }
    }
}

function mousePressed() {
    let col = Math.floor(mouseX / size);
    let row = Math.floor(mouseY / size);

    if (col >= 0 && col < grid && row >= 0 && row < grid) {
        let block = blocks[row][col];
        if (block.active) {
            block.active = false;
            points += 10;
            document.getElementById('score').innerHTML = "Score: " + points;
        }
    }
}

function checkVictory() {
    let allCleared = true;

    for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
            if (blocks[r][c].active) {
                allCleared = false;
            }
        }
    }

    if (allCleared) {
        setTimeout(() => {
            alert("You Won! Final Score: " + points);
            dingSound.play();  // Play the ding sound on win
            resetGame();
        }, 500);
    }
}

function resetGame() {
    points = 0;
    document.getElementById('score').innerHTML = "Score: " + points;
    blocks = [];

    // Reinitialize the grid with blocks
    for (let r = 0; r < grid; r++) {
        let rowBlocks = [];
        for (let c = 0; c < grid; c++) {
            rowBlocks.push({ active: true, color: color(random(255), random(255), random(255)) });
        }
        blocks.push(rowBlocks);
    }
}


