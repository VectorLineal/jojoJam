import Minion from "./Minion.js";
//import "../main_layer/phaser.js";
class Character extends Minion{
    constructor(name, color, cost, maxHealth, effect){
        super(name, color, cost, maxHealth, 0, '');
        this.shield = 0;
    }

    onActivate(){

    }
}

export default Character;