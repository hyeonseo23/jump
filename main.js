var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var background_sound = new Audio('background.mp3');
var jumping_sound = new Audio('jump.mp3');
var end_sound = new Audio('end.mp3');

var img_backgrounds = [];
var currentBackgroundIndex = 0; // 현재 배경 인덱스를 저장하는 변수

var img_background = new Image();
img_background.src = 'background.jpg';




var img_background1 = new Image();
img_background1.src = '짱구-컴퓨터-배경화면4.png';


img_backgrounds.push(new Image());
img_backgrounds[0].src = 'background.jpg'; // 기존 배경
img_backgrounds.push(new Image());
img_backgrounds[1].src = '짱구-컴퓨터-배경화면4.png'; // 새로운 배경


var backgroundChangeInterval = 1800; // 5초마다 변경 (60프레임*5초)

var back = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    draw: function() {
        if (img_backgrounds.length > 0) {
            ctx.drawImage(img_backgrounds[currentBackgroundIndex], this.x, this.y, this.width, this.height);
        }
    }
};


back.draw();

var img_user=[]
var img_user5= new Image();
img_user5.src= '유리.png';
var img_user6= new Image();
img_user6.src= '2.png';
var img_user7= new Image();
img_user7.src= '맹구.png';
var img_user8= new Image();
img_user8.src= 'c.png';
/*var img_user1 = new Image();
img_user1.src = 'pika1.png';
var img_user2 = new Image();
img_user2.src = 'pika2.png';
var img_user3 = new Image();
img_user3.src = 'pika3.png';
var img_user4 = new Image();
img_user4.src = 'pika4.png';*/
//img_user1,img_user2,img_user3,img_user4
img_user=[img_user5,img_user6,img_user7,img_user8];

var user = {
    x:10,
    y:250,
    width:100,
    height:100,
    img_index:0,

    draw(a){
        //ctx.fillStyle = 'green';
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        if(a%40==0){//5프레임마다(0,1,2,3,4 이후 1씩 img_index 증가)
            this.img_index = (this.img_index+1)%4

        }
        if(user.y<250 && timer>1800){
            ctx.drawImage(img_user[2],this.x,this.y,this.width,this.height);
        }
        else if(user.y<250){//y의 값이 설정한 y값보다 작아지면 점프모양으로 고정
            ctx.drawImage(img_user[1],this.x,this.y,this.width,this.height);
        }
        
        else{
            ctx.drawImage(img_user[this.img_index],this.x,this.y,this.width,this.height);
        }
    }
}
user.draw(0);

var img_bomb0=[];

var img_bomb = new Image();
img_bomb.src = '피망.png';
var img_bomb1 = new Image();
img_bomb1.src = '아빠의발냄새.png';

img_bomb0=[img_bomb,img_bomb1];

class Bomb{//장애물
    constructor(){
        this.x = 500;
        this.y = 250;
        this.width = 50;
        this.height = 50;
        this.img_index1 = 0;
    }
    draw(a){
       // ctx.fillStyle = 'red';
       // ctx.fillRect(this.x,this.y,this.width,this.height);
       if(a%500 ==0){//5프레임마다(0,1,2,3,4 이후 1씩 img_index 증가)
                this.img_index1 = (this.img_index1+1)%2;
       }
       
        ctx.drawImage(img_bomb0[this.img_index1],this.x,this.y,this.width,this.height);
        //ctx.drawImage(img_bomb,this.x,this.y,this.width,this.height);
    }
}


class RandomBomb {
    constructor(){
        this.x = 500;
        this.y = Math.random() * 250; // 생성 위치를 랜덤으로 설정
        this.width = 50;
        this.height = 50;
        this.speed = 2 + Math.random() * 3; // 속도를 랜덤으로 설정 (2 ~ 5)
        this.img_index1 = 0;
    }
    draw(a){
        if(a%500 == 0){
            this.img_index1 = (this.img_index1 + 1) % 2;
        }
        ctx.drawImage(img_bomb0[this.img_index1], this.x, this.y, this.width, this.height);
    }
}

var randomBombs = []; // 랜덤 장애물을 저장할 배열

var timer = 0 //프레임 측정
var bombs = []//장애물 리스트
var jumpingTimer = 0; //60프레임 세주는 변수
var animation;

function frameScond(){
    //1초마다 60번 코드 실행
    animation = requestAnimationFrame(frameScond);
    timer++;

    if (timer % backgroundChangeInterval === 0) {
        // 다음 배경으로 변경
        currentBackgroundIndex = (currentBackgroundIndex + 1) % img_backgrounds.length;
    }

    // 프레임마다 요소들을 clear하고 새 배경을 그림
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    back.draw(); // 변경된 currentBackgroundIndex로 배경을 그림
    // ... 나머지 게임 로직

    gameScore();
    gamename();
    stage();
    background_sound.play();
    
    /*if(timer>1800 && timer % 150  == 0){
        var bomb = new Bomb();
        bombs.push(bomb);
    }*/   

    if(timer > 1800) {
        if(timer % 150  == 0){
            var bomb = new Bomb();
            bombs.push(bomb);
        }
        if(timer % 250 == 0){ // 30초마다
            var randomBomb = new RandomBomb();
            randomBombs.push(randomBomb);
        }
    }


    else if(timer % 250  == 0){//1초마다
        var bomb = new Bomb();
        bombs.push(bomb);
    }


    bombs.forEach((b,i,o)=>{
        if(b.x<0){
            //i가 가리키는 값에서부터 1개 삭제
            o.splice(i,1);
        }
        b.x=b.x-2;
        

        bomb_gameScore(b.x);

        collision(user,b);
        b.draw(timer);
    })

    randomBombs.forEach((b, i, o) => {
        if(b.x < 0){
            o.splice(i, 1);
        }
        b.x -= b.speed; // 속도에 따라 x 위치 변경
        collision(user, b);
        b.draw(timer);
    })
    

    //user.x++;
    if (jumping==true){
        user.y=user.y-3;
        jumpingTimer++;
        jumping_sound.play();
    }
    //점프1초후
    if (jumpingTimer>30){
        jumping = false;
        jumpingTimer=0;
    }
    //jumping이 false이고 user.y가 250미만이면 하강
    if(jumping==false&&user.y<250){
        user.y=user.y+3;
    }

    user.draw(timer);
}

frameScond();


//충돌 확인 코드
function collision(user,bomb){
    var x_diff = bomb.x - (user.x+user.width);
    var y_diff = bomb.y - (user.y+user.height);
    if(x_diff<0 && y_diff<0){
        //프레임 돌때마다 프레임에 있는 요소들 clear해주는 함수
        //ctx.clearRect(0,0,canvas.width,canvas.height);
        cancelAnimationFrame(animation);
        
        ctx.fillStyle = 'red';
        ctx.font = '60px 맑은 고딕';

        ctx.fillText('GAME OVER',canvas.width/5, canvas.height/5);
        end_sound.play();
        background_sound.pause();
    }
}

var jumping = false;
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumping = true;
    }
})
function gamename(){
    ctx.font = '50px 맑은 고딕';
    ctx.fillStyle = 'black';
    ctx.fillText('jumpingGame',500,100);
}
function stage(){
    ctx.font = '50px 맑은 고딕';
    ctx.fillStyle = 'black';
    ctx.fillText('stage1',500,550);
    if(timer>1800){
        ctx.fillText('stage2',500,550);
    }
}
function gameScore(){
    ctx.font = '20px 맑은 고딕';
    ctx.fillStyle = 'black';
    ctx.fillText('SCORE : '+Math.round(timer/50),10,30);
}

var score =0;
function bomb_gameScore(x){
    ctx.font = '20px 맑은 고딕';
    ctx.fillStyle = 'black';
    
    if(x==0){
        score ++;
    }
    ctx.fillText('SCORE : '+ score, 10,60);
}