var map = {
    cols: 8,
    rows: 8,
    tsize: 64,
    layers: [[
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 2, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1
    ], [
        5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5,
        5, 0, 0, 0, 0, 0, 0, 5,
        5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5,
        5, 5, 5, 5, 5, 5, 5, 5
    ]],
    getTile: function (layer, col, row) {
        return this.layers[layer][row * map.cols + col];
    },
    isSolidTileAtXY: function (x, y) {
        var col = Math.floor(x / this.tsize);
        var row = Math.floor(y / this.tsize);

        // tiles 3 and 5 are solid -- the rest are walkable
        // loop through all layers and return TRUE if any tile is solid
        return this.layers.reduce(function (res, layer, index) {
            var tile = this.getTile(index, col, row);
            var isSolid = tile === 3 || tile === 5;
            return res || isSolid;
        }.bind(this), false);
    },
    getCol: function (x) {
        return Math.floor(x / this.tsize);
    },
    getRow: function (y) {
        return Math.floor(y / this.tsize);
    },
    getX: function (col) {
        return col * this.tsize;
    },
    getY: function (row) {
        return row * this.tsize;
    }
};

var spawn = {
    startX: 96,
    startY: 160,
    endX: 416,
    endY: 160
};

var level = 1;
var moveFlag = 0;
var directionFlag = 2;
var reachedFlag = 0;

const FACING_RIGHT = 0;
const FACING_LEFT = 75;
const FACING_UP = 170;
const FACING_DOWN = 350;

let currentDirection = FACING_RIGHT;

function Camera(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.maxX = map.cols * map.tsize - width;
    this.maxY = map.rows * map.tsize - height;
}

Camera.prototype.follow = function (sprite) {
    this.following = sprite;
    sprite.screenX = 0;
    sprite.screenY = 0;
};

Camera.prototype.update = function () {
    // assume followed sprite should be placed at the center of the screen
    // whenever possible
    this.following.screenX = this.width / 2;
    this.following.screenY = this.height / 2;

    // clamp values
    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    // in map corners, the sprite cannot be placed in the center of the screen
    // and we have to change its screen coordinates

    // left and right sides
    if (this.following.x < this.width / 2 ||
        this.following.x > this.maxX + this.width / 2) {
        this.following.screenX = this.following.x - this.x;
    }
    // top and bottom sides
    if (this.following.y < this.height / 2 ||
        this.following.y > this.maxY + this.height / 2) {
        this.following.screenY = this.following.y - this.y;
    }
};

function Hero(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = map.tsize;
    this.height = map.tsize;
    this.image = Loader.getImage('hero');
}

Hero.prototype.move = function (dirx, diry) {
    // move hero
    this.x += dirx;
    this.y += diry;

    // check if we walked into a non-walkable tile
    this._collide(dirx, diry);

    // clamp values
    var maxX = this.map.cols * this.map.tsize;
    var maxY = this.map.rows * this.map.tsize;
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
};

Hero.prototype._collide = function (dirx, diry) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    var left = this.x - this.width / 2;
    var right = this.x + this.width / 2 - 1;
    var top = this.y - this.height / 2;
    var bottom = this.y + this.height / 2 - 1;

    // check for collisions on sprite sides
    var collision =
        this.map.isSolidTileAtXY(left, top) ||
        this.map.isSolidTileAtXY(right, top) ||
        this.map.isSolidTileAtXY(right, bottom) ||
        this.map.isSolidTileAtXY(left, bottom);
    if (!collision) { return; }

    if (diry > 0) {
        row = this.map.getRow(bottom);
        this.y = -this.height / 2 + this.map.getY(row);

    }
    else if (diry < 0) {
        row = this.map.getRow(top);
        this.y = this.height / 2 + this.map.getY(row + 1);
    }
    else if (dirx > 0) {
        col = this.map.getCol(right);
        this.x = -this.width / 2 + this.map.getX(col);
    }
    else if (dirx < 0) {
        col = this.map.getCol(left);
        this.x = this.width / 2 + this.map.getX(col + 1);
    }

    document.getElementById("collisionModal").style.display = "block";
    resetButton();
};

Game.isFlag = function () {
    if(this.hero.x == spawn.endX && this.hero.y == spawn.endY && reachedFlag == 1){
        document.getElementById("completedModal").style.display = "block";
    
        resetButton();
    } 
    if(this.hero.x == spawn.endX && this.hero.y == spawn.endY && reachedFlag == 0){
        reachedFlag = 1;
    } 
}

Game.load = function () {
    return [
        Loader.loadImage('tiles', '../assets/images/tiles.png'),
        Loader.loadImage('hero', '../assets/images/car.png')
    ];
};

Game.init = function () {
    this.tileAtlas = Loader.getImage('tiles');

    this.hero = new Hero(map, spawn.startX, spawn.startY);
    this.camera = new Camera(map, 512, 512);
    this.camera.follow(this.hero);
};

Game.update = function (delta) {
    var dirx = 0;
    var diry = 0;
    
    if (moveFlag == 1) {
        if (directionFlag == 1) {
            diry = 64;
            currentDirection = FACING_DOWN;
        }else if (directionFlag == 2) {
            dirx = 64; 
            currentDirection = FACING_RIGHT;
        }else if (directionFlag == 3) {
            diry = -64; 
            currentDirection = FACING_UP;
        }else if (directionFlag == 4) {
            dirx = -64; 
            currentDirection = FACING_LEFT;
        }
    }

    moveFlag = 0;

    this.hero.move(dirx, diry);
    this.camera.update();
    this.isFlag();
};

Game._drawLayer = function (layer) {
    var startCol = Math.floor(this.camera.x / map.tsize);
    var endCol = startCol + (this.camera.width / map.tsize);
    var startRow = Math.floor(this.camera.y / map.tsize);
    var endRow = startRow + (this.camera.height / map.tsize);
    var offsetX = -this.camera.x + startCol * map.tsize;
    var offsetY = -this.camera.y + startRow * map.tsize;

    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(layer, c, r);
            var x = (c - startCol) * map.tsize + offsetX;
            var y = (r - startRow) * map.tsize + offsetY;
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile - 1) * map.tsize, // source x
                    0, // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    Math.round(x),  // target x
                    Math.round(y), // target y
                    map.tsize, // target width
                    map.tsize // target height
                );
            }
        }
    }
};

Game._drawGrid = function () {
        var width = map.cols * map.tsize;
    var height = map.rows * map.tsize;
    var x, y;
    for (var r = 0; r < map.rows; r++) {
        x = - this.camera.x;
        y = r * map.tsize - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
    }
    for (var c = 0; c < map.cols; c++) {
        x = c * map.tsize - this.camera.x;
        y = - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
    }
};

Game.render = function () {
    // draw map background layer
    this._drawLayer(0);

    // draw main character
    this.ctx.drawImage(
        this.hero.image, 0, currentDirection, 96, 80,
        this.hero.screenX - this.hero.width / 2,
        this.hero.screenY - this.hero.height / 2, 64, 64);

    // draw map top layer
    this._drawLayer(1);

    this._drawGrid();
};

function level1(){
    level = 1;
    loadLevel();
}

function level2(){
    level = 2;
    loadLevel();
}

function level3(){
    level = 3;
    loadLevel();
}

function level4(){
    level = 4;
    loadLevel();
}

function loadLevel() {
    if(level == 1){
        map.layers = 
        [[
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ], [
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 0, 0, 0, 0, 0, 0, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5
        ]];
        resetFlags();
        
        spawn.startX = 96;
        spawn.startY = 160;
        spawn.endX = 416;
        spawn.endY = 160;
        
        Game.init();
    }

    if(level == 2){
        map.layers = 
        [[
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 2, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ], [
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 0, 0, 0, 0, 0, 5, 5,
            5, 5, 5, 5, 5, 0, 5, 5,
            5, 5, 5, 5, 5, 0, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5
        ]];
        resetFlags();
        
        spawn.startX = 96;
        spawn.startY = 160;
        spawn.endX = 352;
        spawn.endY = 288;
        
        Game.init();
    }

    if(level == 3){
        map.layers = 
        [[
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 2, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ], [
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 0, 5,
            5, 5, 5, 5, 5, 0, 0, 5,
            5, 5, 5, 5, 0, 0, 5, 5,
            5, 5, 5, 0, 0, 5, 5, 5,
            5, 5, 0, 0, 5, 5, 5, 5,
            5, 0, 0, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5
        ]];
        resetFlags();
        
        spawn.startX = 96;
        spawn.startY = 416;
        spawn.endX = 416;
        spawn.endY = 96;
        
        Game.init();
    }

    if(level == 4){
        map.layers = 
        [[
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 2, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1
        ], [
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5,
            5, 0, 0, 0, 0, 0, 5, 5,
            5, 0, 5, 5, 5, 5, 5, 5,
            5, 0, 5, 0, 0, 0, 5, 5,
            5, 0, 5, 5, 5, 0, 5, 5,
            5, 0, 0, 0, 0, 0, 5, 5,
            5, 5, 5, 5, 5, 5, 5, 5
        ]];
        resetFlags();
        
        spawn.startX = 224;
        spawn.startY = 288;
        spawn.endX = 352;
        spawn.endY = 160;
        
        Game.init();
    }
}

function moveForwardButton() {
    moveFlag = 1;
}

function turnLeftButton() {
    directionFlag += 1;

    if(directionFlag > 4){
        directionFlag = 1;
    }
} 

function turnRightButton() {
    directionFlag -= 1;

    if(directionFlag < 1){
        directionFlag = 4;
    }
}

function resetButton() {
    resetFlags();
    Game.init();
}

function resetFlags(){
    moveFlag = 0;
    directionFlag = 2;
    currentDirection = FACING_RIGHT;
    reachedFlag = 0;
}