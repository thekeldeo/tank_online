/**
 * Created by hungtran on 5/16/16.
 */
var context;

window.onload = function () {
    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gameStart();
    setInterval(gameLoop, 17);
};
var player;
var gameLoop = function () {
    gameUpdate();
    gameDrawer(context);
};
function gameStart() {

    //phan biet player va Tank nhe
    //Tank la ban thiet ke
    //con player moi la xe tang that su
    player = new Tank(20, 20);
    star = new Star(40,50);
}

function gameUpdate() {
    player.update();
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

var mapWidth = 34;
var mapHeight = 34;

for(var i =0; i<mapHeight; i++){
    for(var j=0; j<mapHeight; j++){
        if (map[i * mapWidth + j] === 1){
            var wall= new WallBrick(j,i);
            wallBricks.push(wall);
        }
        if (map[i * mapWidth + j] === 2){
            var wall = new WallSteel(j,i);
            wallSteels.push(wall);
        }
        if (map[i * mapWidth + j] === 3){
            var water = new Water(j,i);
            river.push(water);
        }
    }
}
function gameDrawer(context) {
    context.fillStyle = "black";
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    player.draw(context);
    for(var i =0; i< wallBricks.length; i++){
        wallBricks[i].draw(context);
    }
    for(var i =0; i< wallSteels.length; i++){
        wallSteels[i].draw(context);
    }
    for(var i =0; i< river.length; i++){
        river[i].draw(context);
    }
    star.draw(context);
}