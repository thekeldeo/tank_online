/**
 * Created by keldeo on 18/05/2016.
 * */
class WallBrick{
    constructor(x,y){
        this.x = x * 16;
        this.y = y * 16;
        this.sprite = new Image();
        this.sprite.src = 'images/wall_brick.png';
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}
class WallSteel{
    constructor(x,y){
        this.x = x * 16;
        this.y = y * 16;
        this.sprite = new Image();
        this.sprite.src = 'images/wall_steel.png';
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}
class Water{
    constructor(x,y){
        this.x = x * 16;
        this.y = y * 16;
        var spr1 = new Image();
        var spr2 = new Image();
        spr1.src = 'images/water_1.png';
        spr2.src = 'images/water_2.png';
        this.sprites = new Array();
        this.sprites.push(spr1);
        this.sprites.push(spr2);
        this.ani = new Animation(this.sprites, this.x, this.y, 6);
    }
}