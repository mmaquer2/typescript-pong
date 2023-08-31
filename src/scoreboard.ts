import * as ex from 'excalibur';


export class Scoreboard extends ex.Actor {

    player_red_score = 0;
    player_blue_score = 0;
    
    constructor() {
        super({
            width: 800,
            height: 600,
            
        });

    }


    setScore(score: number, player: string) {

    

    }

    resetGame(){

    }


}