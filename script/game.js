/**
 * Created by hungtran on 5/16/16.
 */
var context;
var soundEfx; // Sound Efx
var bots;
var socket;
var enemyTanks = new Array();
window.onload = function () {
    soundEfx = document.getElementById("soundEfx");
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameStart();
    initSocketClient();
    setInterval(gameLoop, 17);
};

function initSocketClient() {
    socket = io.connect();
    player = new Tank(120, 400,0);
    socket.emit('player_created',{x: player.x, y:player.y});
    socket.on('info_other_players',function (data) {
        player.id = data.id;
        console.log(player.id);
        for (var i = 0; i < data.tanks.length; i++){
            var newTank = new Tank(data.tanks[i].x,data.tanks[i].y, data.tanks[i].id);
            enemyTanks.push(newTank);
        }
    });
    socket.on('new_player_connected', function (data) {
        var newTank = new Tank(data.x,data.y, data.id);
        enemyTanks.push(newTank);
    });

    socket.on('enemy_update',function (data) {
        for(var i = 0; i< enemyTanks.length; i++ ){
            if(enemyTanks[i].id == data.id){
                enemyTanks[i].direction = data.direction;
                console.log(data.direction);
                enemyTanks[i].x = data.x;
                enemyTanks[i].y = data.y;
                break;
            }
        }
    });
}

var player;
var gameLoop = function () {
    gameUpdate();
    gameDrawer(context);
};
function gameStart() {
    soundEfx.play();
}

function gameUpdate() {
    player.update();
    socket.emit('player_update',{x: player.x, y: player.y, id: player.id, direction: player.direction});
    for(var i=0; i< enemyTanks.length; i++){
        enemyTanks[i].update();
    }
    for(var i =0; i< river.length; i++){
        river[i].ani.update();
    }
    player.bulletKissBrick();
}


window.onkeydown = function (e) {
    switch (e.keyCode){
        case 65://a
            player.move(3);
            break;
        case 68://d
            player.move(4);
            break;
        case 83://s
            player.move(2);
            break;
        case 87://w
            player.move(1);
            break;
        case 32: // dau cach
            player.shot();
            break;
    }
};
window.onkeyup = function (e) {
    switch (e.keyCode){
        case 65://a
            if(player.speedX < 0){
                player.speedX = 0;
            }
            break;
        case 68://d
            if(player.speedX > 0){
                player.speedX = 0;
            }
            break;
        case 83://s
            if(player.speedY > 0){
                player.speedY = 0;
            }
            break;
        case 87://w
            if(player.speedY < 0){
                player.speedY = 0;
            }
            break;
    }
};

var wallBricks = new Array();
var wallSteels = new Array();
var river = new Array();
var stars = new Array();


var mapWidth = 28;
var mapHeight = 28;

for(var i =0; i<mapHeight; i++){
    for(var j=0; j<mapHeight; j++){
        if (map[i * mapWidth + j] === 2){
            var wall= new WallBrick(j,i);
            wallBricks.push(wall);
        }
        if (map[i * mapWidth + j] === 1){
            var wall = new WallSteel(j,i);
            wallSteels.push(wall);
        }
        if (map[i * mapWidth + j] === 3){
            var water = new Water(j,i);
            river.push(water);
        }
    }
}

var star1 = new Star(40,50);
stars.push(star1);
var star2 = new Star(40,250);
stars.push(star2);

function gameDrawer(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    for(var i =0; i< river.length; i++){
        river[i].ani.draw(context);
    }
    for(var i=0; i< enemyTanks  .length; i++){
        enemyTanks[i].draw(context);
    }
    player.draw(context);
    for(var i =0; i< wallBricks.length; i++){
        wallBricks[i].draw(context);
    }
    for(var i =0; i< wallSteels.length; i++){
        wallSteels[i].draw(context);
    }
    for(var i=0; i<stars.length; i++){
        stars[i].draw(context);
    }
}
