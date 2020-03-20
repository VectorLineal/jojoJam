import Card from "./Card.js";
//import "../main_layer/phaser.js";
class Character extends Card{
    constructor(name, color, cost, maxHealth, effect){
        super(name, color, cost);
        this.maxHealth = maxHealth;
        this.curHealh = this.maxHealth;
        this.attack = 0;
        this.shield = 0;
    }

    onActivate(){

    }
}

export default Character;