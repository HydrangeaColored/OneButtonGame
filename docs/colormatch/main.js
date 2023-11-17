// The title of the game to be displayed on the title screen
title = "COLORS";

// The description, which is also displayed on the title screen
description = `
Match.
`;

// The array of custom sprites
// yellow, blue, green, cyan
characters = [
`
 y  y
 y  y
yryyry
yyyyyy
ylyyly
yyllyy
`,`
 b  b
 b  b
brbbrb
bbbbbb
blbblb
bbllbb
`,`
 g  g
 g  g
grggrg
gggggg
glgglg
ggllgg
`,`
 c  c
 c  c
crccrc
cccccc
clcclc
ccllcc
`
];



// Game design variable container
const G = {
	WIDTH: 100,
	HEIGHT: 150,
};

const playerPos = {
	WIDTH: G.WIDTH * 0.5,
	HEIGHT: G.HEIGHT * 0.5,
};

options  = {
    viewSize: { x: G.WIDTH, y: G.HEIGHT }
};

/**
 * @typedef {{
* pos: Vector,
* }} Player
*/

/**
* @type { Player }
*/
let player;

/**
 * @typedef {{
* pos: Vector
* active: boolean
* color: number
* }} Enemy
*/

/**
* @type { Enemy [] }
*/
let enemies;

enemies = [];
let currentEnemySpeed = 1;
let delay = 25;
let currSide = 0;
let speedIncrease = 0;
let currPlayerType = 0;

player = {
    pos: vec(playerPos.WIDTH, playerPos.HEIGHT)
};


initializeEnemies();


function  update() {
    switch(currPlayerType){
        case 0:
            char("a", player.pos);
            break;
        case 1:
            char("b", player.pos);
            break;
        case 2:
            char("c", player.pos);
            break;
        case 3:
            char("d", player.pos);
            break;
    }

    if (input.isJustPressed) {
        currPlayerType++;
        if(currPlayerType > 3){
            currPlayerType = 0;
        }
      }
    if(delay > 0){
        delay--;
    }else{
        makeEnemy();
        delay = 25 - speedIncrease;
    }
    updateEnemies();
	// The init function
	if (!ticks) {

	}
}

function initializeEnemies(){
    currSide = 0;
    enemies[0] = ({ pos: vec(G.WIDTH * 0.5, 0), active: false, color: 4});
    enemies[1] = ({ pos: vec(G.WIDTH, G.HEIGHT * 0.5), active: false, color: 4});
    enemies[2] = ({ pos: vec(G.WIDTH * 0.5, G.HEIGHT), active: false,  color: 4});
    enemies[3] = ({ pos: vec(0, G.HEIGHT * 0.5), active: false, color: 4});
}

function makeEnemy(){
    if(currSide == 0){
        if(enemies[0].pos.y >= playerPos.HEIGHT){
            enemies[0].pos.y = 0;
            enemies[0].color = 4;
            enemies[0].active = false;
        }else{
            enemies[0].active = true;
        }
        currSide++;
    }else if(currSide == 1){
        if(enemies[1].pos.x <= playerPos.WIDTH){
            enemies[1].pos.x = G.WIDTH;
            enemies[1].color = 4;
            enemies[1].active = false;
        }else{
            enemies[1].active = true;
        }
        currSide++;
    }else if(currSide == 2){
        if(enemies[2].pos.y <= playerPos.HEIGHT){
            enemies[2].pos.y = G.HEIGHT;
            enemies[2].color = 4;
            enemies[2].active = false;
        }else{
            enemies[2].active = true;
        }
        currSide++;
    }else if(currSide == 3){
        if(enemies[3].pos.x >= playerPos.WIDTH){
            enemies[3].pos.x = 0;
            enemies[3].color = 4;
            enemies[3].active = false;
        }else{
            enemies[3].active = true;
        }
        currSide = 0;
    }
}

function updateEnemies(){
    let random = Math.floor(rnd(0,4));
    if((enemies[0].pos.y < playerPos.HEIGHT) && (enemies[0].active)){
        enemies[0].pos.y += currentEnemySpeed;
        if(enemies[0].color == 4){
            switch(random){
                case 0:
                    char("a", enemies[0].pos);
                    enemies[0].color = 0;
                    break;
                case 1:
                    char("b", enemies[0].pos);
                    enemies[0].color = 1;
                    break;
                case 2:
                    char("c", enemies[0].pos);
                    enemies[0].color = 2;
                case 3:
                    char("d", enemies[0].pos);
                    enemies[0].color = 3;
            }
        }
        if(enemies[0].pos.y >= playerPos.HEIGHT){
            if(currPlayerType != enemies[0].color){
                initializeEnemies();
                end();
                return;
            }else{
                enemies[0].active=false;
                addScore(10);
            }
        }
        if(enemies[0].color == 0){
            char("a", enemies[0].pos);
        }else if(enemies[0].color == 1){
            char("b", enemies[0].pos);
        }else if(enemies[0].color == 2){
            char("c", enemies[0].pos);
        }else if(enemies[0].color == 3){
            char("d", enemies[0].pos);
        }
    }else if((enemies[1].pos.x > playerPos.WIDTH)&& (enemies[1].active)){
        enemies[1].pos.x -= currentEnemySpeed;
        if(enemies[1].color == 4){
            switch(random){
                case 0:
                    char("a", enemies[1].pos);
                    enemies[1].color = 0;
                    break;
                case 1:
                    char("b", enemies[1].pos);
                    enemies[1].color = 1;
                    break;
                case 2:
                    char("c", enemies[1].pos);
                    enemies[1].color = 2;
                    break;
                case 3:
                    char("d", enemies[1].pos);
                    enemies[1].color = 3;
                    break;
            }
        }
        if(enemies[1].pos.x <= playerPos.WIDTH){
            if(currPlayerType != enemies[1].color){
                initializeEnemies();
                end();
                return;
            }else{
                enemies[1].active=false;
                addScore(10);
            }
        }
        if(enemies[1].color == 0){
            char("a", enemies[1].pos);
        }else if(enemies[1].color == 1){
            char("b", enemies[1].pos);
        }else if(enemies[1].color == 2){
            char("c", enemies[1].pos);
        }else if(enemies[1].color == 3){
            char("d", enemies[1].pos);
        }
    }else if((enemies[2].pos.y > playerPos.HEIGHT)&& (enemies[2].active)){
        enemies[2].pos.y -= currentEnemySpeed;
        if(enemies[2].color == 4){
            switch(random){
                case 0:
                    char("a", enemies[2].pos);
                    enemies[2].color = 0;
                    break;
                case 1:
                    char("b", enemies[2].pos);
                    enemies[2].color = 1;
                    break;
                case 2:
                    char("c", enemies[2].pos);
                    enemies[2].color = 2;
                    break;
                case 3:
                    char("d", enemies[2].pos);
                    enemies[2].color = 3;
                    break;
            }
        }
        if(enemies[2].pos.y <= playerPos.HEIGHT){
            if(currPlayerType != enemies[2].color){
                initializeEnemies();
                end();
                return;
            }else{
                enemies[2].active=false;
                addScore(10);
            }
        }
        if(enemies[2].color == 0){
            char("a", enemies[2].pos);
        }else if(enemies[2].color == 1){
            char("b", enemies[2].pos);
        }else if(enemies[2].color == 2){
            char("c", enemies[2].pos);
        }else if(enemies[2].color == 3){
            char("d", enemies[2].pos);
        }
    }else if((enemies[3].pos.x < playerPos.WIDTH)&& (enemies[3].active)){
        enemies[3].pos.x += currentEnemySpeed;
        if(enemies[3].color == 4){
            switch(random){
                case 0:
                    char("a", enemies[3].pos);
                    enemies[3].color = 1;
                    break;
                case 1:
                    char("b", enemies[3].pos);
                    enemies[3].color = 1;
                    break;
                case 2:
                    char("c", enemies[3].pos);
                    enemies[3].color = 2;
                    break;
                case 3:
                    char("d", enemies[3].pos);
                    enemies[3].color = 3;
                    break;
            }
        }
        if(enemies[3].pos.x >= playerPos.WIDTH){
            if(currPlayerType != enemies[3].color){
                initializeEnemies();
                end();
                return;
            }else{
                enemies[3].active=false;
                addScore(10);
            }
        }
        if(enemies[3].color == 0){
            char("a", enemies[3].pos);
        }else if(enemies[3].color == 1){
            char("b", enemies[3].pos);
        }else if(enemies[3].color == 2){
            char("c", enemies[3].pos);
        }else if(enemies[3].color == 3){
            char("d", enemies[3].pos);
        }
    }
}
