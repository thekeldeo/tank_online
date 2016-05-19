/**
 * Created by keldeo on 19/05/2016.
 */
class Star{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.sprite = new Image();
        this.sprite.src = 'images/powerup_star.png';
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
}