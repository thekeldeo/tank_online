
class Tank{
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
        this.spriteUp.src = "images/tank_player1_up_c0_t1_s1.png";
        this.spriteDown.src = "images/tank_player1_down_c0_t1_s1.png";
        this.spriteLeft.src = "images/tank_player1_left_c0_t1_s1.png";
        this.spriteRight.src = "images/tank_player1_right_c0_t1_s1.png";
        this.sprite = this.spriteUp;
        this.direction = 1;//bien luu huong di chuyen hien tai cua tank
        this.bullets = new Array() ;
        this.level = 1;
    }
    update(){
        this.tankDrinkStar();
        this.lvlUp();
        if(this.tankKissBrick()==false){
            this.x += this.speedX;
            this.y += this.speedY;
        }
        
        for(var i=0; i< this.bullets.length; i++){
            this.bullets[i].update();
        }
    }

    lvlUp(){
        if (this.level === 2){
            this.spriteUp.src = 'images/tank_player1_up_c0_t1_s1.png';
            this.spriteDown.src = 'images/tank_player1_down_c0_t1_s2.png';
            this.spriteLeft.src = 'images/tank_player1_left_c0_t1_s2.png';
            this.spriteRight.src = 'images/tank_player1_right_c0_t1_s2.png';
        }
        if (this.level === 3){
            this.spriteUp.src = 'images/tank_player1_up_c0_t1_s3.png';
            this.spriteDown.src = 'images/tank_player1_down_c0_t1_s3.png';
            this.spriteLeft.src = 'images/tank_player1_left_c0_t1_s3.png';
            this.spriteRight.src = 'images/tank_player1_right_c0_t1_s3.png';
        }
    }

    compare(s1,s2){
        if (s1.x < s2.x + s2.width &&
            s1.x + s1.width > s2.x &&
            s1.y < s2.y + s2.height &&
            s1.height + s1.y > s2.y) return true;
        return false;
    }

    tankKissBrick(){
        var s1 = {x: this.x+ this.speedX, y: this.y +this.speedY, width : 32, height: 32}; //tank
        for(var i = 0; i< wallBricks.length; i++){  // tank khong the thong ass brick
            var s2 = {x: wallBricks[i].x, y: wallBricks[i].y, width : 16, height: 16}
            if (this.compare(s1,s2)) return true;
        }
        for(var i = 0; i< wallSteels.length; i++){ //tank ko the thong ass steel
            var s2 = {x: wallSteels[i].x, y: wallSteels[i].y, width : 16, height: 16}
            if (this.compare(s1,s2)) return true;
        }
        for(var i = 0; i< river.length; i++){ //  tank cant swim :(
            var s2 = {x: river[i].x, y: river[i].y, width : 32, height: 32}
            if (this.compare(s1,s2)) return true;
        }
        return false;
    }

    bulletKissBrick(){
        for(var i = 0; i< this.bullets.length; i++){
            var s1 = {x: this.bullets[i].x, y: this.bullets[i].y, width : 5, height: 5} //s1: bullet
            for(var j = 0; j< wallBricks.length; j++){
                var s2 = {x: wallBricks[j].x, y: wallBricks[j].y, width : 16, height: 16} //s2 :brick
                if (this.compare(s1,s2)) {
                    soundEfx.src = 'sound/bullet_shot.ogg';
                    soundEfx.play();
                    this.bullets.pop();
                    wallBricks.splice(j,1);
                    break;
                }
            }
        }
        for(var i = 0; i< this.bullets.length; i++){
            var s1 = {x: this.bullets[i].x, y: this.bullets[i].y, width : 2, height: 2} //s1: bullet
            for(var j = 0; j< wallSteels.length; j++){
                var s2 = {x: wallSteels[j].x, y: wallSteels[j].y, width : 16, height: 16} //s2 :brick
                if (this.compare(s1,s2)) {
                    soundEfx.src = 'sound/bullet_hit_1.ogg';
                    soundEfx.play();
                    this.bullets.splice(i,1);
                    break;
                }
            }
        }
    }


    tankDrinkStar(){
        var s1 = {x: this.x+ this.speedX, y: this.y +this.speedY, width : 32, height: 32}; //tank
        for (var i=0; i<stars.length; i++){
            var s2 = {x: stars[i].x, y: stars[i].y, width: 32, height: 32};
            if (s1.x < s2.x + s2.width &&
                s1.x + s1.width > s2.x &&
                s1.y < s2.y + s2.height &&
                s1.height + s1.y > s2.y)  {
                if(this.level<=2) {
                    soundEfx.src = 'sound/powerup_pick.ogg';
                    soundEfx.play();
                    player.level++;
                    stars.splice(i,1);
                }
            }
        }

    }
    draw(context){
        context.drawImage(this.sprite, this.x, this.y);
        for(var i=0; i< this.bullets.length; i++){
            this.bullets[i].draw(context);
        }

    }


    move(direction){
        switch (direction){
            case 1://up
                if(this.y >=10){
                    this.speedY = -3;
                    this.speedX = 0;
                }
                this.sprite = this.spriteUp;
                this.direction = 1;
                break;
            case 2://down
                if(this.y <= window.innerHeight - 10){
                    this.speedY = 3;
                    this.speedX = 0;
                }
                this.sprite = this.spriteDown;
                this.direction = 2;
                break;
            case 3://left
                if(this.x >= 10){
                    this.speedX = -3;
                    this.speedY = 0;
                }
                this.sprite = this.spriteLeft;
                this.direction = 3;
                break;
            case 4://right
                if (this.x <= window.innerWidth -10){
                    this.speedX = 3;
                    this.speedY = 0;
                }
                this.sprite = this.spriteRight;
                this.direction = 4;
                break;
        }
    }


    shot (){
        var bullet = new Bullet(this.x+12, this.y+12, this.direction, this.level);
            if (this.bullets.length < this.level){
                soundEfx.src = 'sound/bullet_hit_2.ogg';
                soundEfx.play();
                this.bullets.push(bullet);
            }
    }


}
