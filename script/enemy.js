/**
 * Created by keldeo on 20/05/2016.
 */
class basic_tank{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.sprite = new Image();
        this.spriteUp = new Image();
        this.spriteDown = new Image();
        this.spriteLeft = new Image();
        this.spriteRight = new Image();
        this.spriteUp.src = "images/tank_basic_up_c0_t1.png";
        this.spriteDown.src = "images/tank_basic_down_c0_t1.png";
        this.spriteLeft.src = "images/tank_basic_left_c0_t1.png";
        this.spriteRight.src = "images/tank_basic_right_c0_t1.png";
        this.sprite = this.spriteUp;
        this.direction = 2;//bien luu huong di chuyen hien tai cua tank
        this.bullets = new Array() ;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        for(var i=0; i< this.bullets.length; i++){
            this.bullets[i].update();
        }
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
        for(var i=0; i< this.bullets.length; i++){
            this.bullets[i].draw(context);
        }
    }
    autoshot(){
        var bullet = new Bullet(this.x+12, this.y+12, this.direction, this.level);
        if (this.bullets.length < this.level){
            if(soundEfx.paused){
                soundEfx.src = 'sound/bullet_hit_2.ogg';
                soundEfx.play();
            }
            this.bullets.push(bullet);
        }
    }
}