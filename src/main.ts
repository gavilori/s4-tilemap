import "./style.css";


//setting up the multiple canvases
const gridCanvas = document.getElementById("gridCanvas") as HTMLCanvasElement;
const gridCtx = gridCanvas.getContext("2d") as CanvasRenderingContext2D;

const selectCanvas = document.getElementById("selectCanvas") as HTMLCanvasElement;
const selectCtx = selectCanvas.getContext("2d") as CanvasRenderingContext2D;


//defining the textures to use
const imageUrls = [
    "/tile1.png",
    "/tile2.png",
    "/tile3.png",
    "/tile4.png",
    "/tile5.png",
    "/tile6.png",
    "/tile7.png",
    "/tile8.png"
];


//defining the size of the main grid
const numTiles = 32;
const tileSize = gridCanvas.width / numTiles;


//defining the size of the select grid
const numSelectables = imageUrls.length;
const selectHeight = selectCanvas.height / numSelectables;



//creating the tilemap nested array
let tilemap: number[][] = new Array(numTiles);

for(let i = 0; i < numTiles; i++) {
    let row = new Array(numTiles);
    for (let j = 0; j < numTiles; j++) {
        row[j] = 0;
        // row[j] = new Image();
        // row[j].src = "/tile1.png";
    }
    tilemap[i] = row;
}

//track the selected tile
// let currentTile = "/tile1.png";
let currentTile = 0;

//draw the initial canvases
redrawTilemap();
drawSelectCanvas();


//Function that draws a texture to a specific canvas ctx
function drawTexture(row: number, col: number, ctx: CanvasRenderingContext2D, image: number, width: number, height: number, cellSize: number) {
    const newImage = new Image();
    newImage.src = imageUrls[image];
    newImage.onload = () => {
        ctx.drawImage(newImage, row * cellSize, col * cellSize, width, height)
    };
    ctx.drawImage(newImage, row * cellSize, col * cellSize, width, height)
}


// ----- Interacting with the main tilemap -----

function redrawTilemap()
{
  gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    for (let i = 0; i < numTiles; i++) {
        for (let j = 0; j < numTiles; j++) {
            drawTexture(i, j, gridCtx, tilemap[i][j], gridCanvas.width / numTiles, gridCanvas.height / numTiles, tileSize);
        }
    }
}

let cursorActive = false;

gridCanvas.addEventListener("mousedown", () => {
    cursorActive = true;
})

gridCanvas.addEventListener("mouseup", () => {
    cursorActive = false;
})

gridCanvas.addEventListener("mousemove", (e) => {
    if (cursorActive) {
    const coordX = Math.trunc(e.offsetX / tileSize);
    const coordY = Math.trunc(e.offsetY / tileSize);

    tilemap[coordX][coordY] = currentTile;
    drawTexture(coordX, coordY, gridCtx, currentTile, gridCanvas.width / numTiles, gridCanvas.height / numTiles, tileSize)
    // redrawTilemap();
    }
})


// ----- Interacting with the selectable tilemap -----

// Loop through the selectable tiles and draw textures in each cell
function drawSelectCanvas()
{
    for (let i = 0; i < numSelectables; i++) {
        // const selectableImage = new Image();
        // selectableImage.src = imageUrls[i];
        drawTexture(0, i, selectCtx, i, selectCanvas.width, selectHeight, 64);
    }
}

selectCanvas.addEventListener("click", (e) => {
    const coordY = Math.trunc(e.offsetY / selectHeight);
    currentTile = coordY;
})