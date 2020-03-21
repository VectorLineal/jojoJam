import Card from "./Card.js";
//import "../main_layer/phaser.js";
export default class Character extends Card{
    constructor(name, color, cost, maxHealth, attack, effect){
        super(name, color, cost);
        this.maxHealth = maxHealth;
        this.curHealh = this.maxHealth;
        this.attack = attack;
        this.effects = [];
    }
    onAttack(){

    }
    onDeath(){

    }
    onEndTurn(){
        
    }
    onKill(){
        
    }
}