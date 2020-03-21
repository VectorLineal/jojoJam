import Card from "./Card.js";
//import "../main_layer/phaser.js";
export default class Character extends Card{
    constructor(name, color, mana, maxHealth, attack){
        super(name, color, mana);
        this.maxHealth = maxHealth;
        this.curHealth = this.maxHealth;
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