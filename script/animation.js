/**
 * Created by keldeo on 21/05/2016.
 */
class Animation{
    constructor(sprites, x, y, speed){
        this.sprites = sprites;
        this.x = x;
        this.y = y;
        this.count = 0;
        this.speed = speed;
        this.index = 0;
    }
    update(){
        if(this.count < this.speed){
            this.count ++;
        } else{
            this.count=0;
            if(this.index == this.sprites.length - 1){
                this.index = 0;
            } else  {
                this.index ++;
            }
        }
    }
    draw(context){
        context.drawImage(this.sprites[this.index], this.x, this.y);
    }
}