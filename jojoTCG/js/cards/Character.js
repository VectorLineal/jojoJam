import Card from "./Card.js";
//import "../main_layer/phaser.js";
export default class Character extends Card{
    constructor(name, color, mana, maxHealth, attack){
        super(name, color, mana);
        this.maxHealth = maxHealth;
        this.curHealth = this.maxHealth;
        this.attack = attack;
        this.effects = [];
        this.hasAttacked = 0;
        this.attacksPerTurn = 1;
    }

    refresh(){
        this.hasAttacked = 0;
    }

    die(){

    }

    alterHealth(ammount){
        //positivo para heal, negativo para damage

        this.curHealth += ammount;
        if(this.curHealth > this.maxHealth){
            this.curHealth = thi.maxHealth;
        }else if(this.curHealth <= 0){
            this.die();
        }
    }

    addEffect(name, duration, ammount) {
        this.effects.push({ [name]: [duration, ammount] });
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