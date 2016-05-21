/**
 * Created by keldeo on 16/05/2016.
 */
class Bullet{
    constructor(x, y, direction, level){
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.spriteUp = new Image();
        this.spriteUp.src = "images/bullet_up.png";
        this.spriteDown = new Image();
        this.spriteDown.src = "images/bullet_down.png";
        this.spriteLeft = new Image();
        this.spriteLeft.src = "images/bullet_left.png";
        this.spriteRight = new Image();
        this.spriteRight.src = "images/bullet_right.png";
        this.sprite = this.spriteUp;
        switch (direction){
            case 3:
                this.sprite = this.spriteLeft;
                this.speedX = - 2 - 0.5*level;
                break;
            case 4:
                this.sprite = this.spriteRight;
                this.speedX = 2 + 0.5*level;
                break;
            case 1:
                this.sprite = this.spriteUp;
                this.speedY = -2 - 0.5*level;
                break;
            case 2:
                this.sprite = this.spriteDown;
                this.speedY = 2 + 0.5*level;
                break;
        }
    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
            
    }
}