/**
 * Created by keldeo on 18/05/2016.
 * */
class WallBrick{
    constructor(x,y){
        this.x = x * 15;
        this.y = y * 15;
        this.sprite = new Image();
        this.sprite.src = 'images/wall_brick.png';
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}
class WallSteel{
    constructor(x,y){
        this.x = x * 15;
        this.y = y * 15;
        this.sprite = new Image();
        this.sprite.src = 'images/wall_steel.png';
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}
class Water{
    constructor(x,y){
        this.x = x * 15;
        this.y = y * 15;
        this.sprite = new Image();
        this.sprite.src = 'images/water_2.png';
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}