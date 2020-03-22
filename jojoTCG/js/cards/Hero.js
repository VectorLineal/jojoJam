import Character from "./Character.js";
//import "../main_layer/phaser.js";
export default class Hero extends Character{
    constructor(name, color, mana, maxHealth){
        super(name, color, mana, maxHealth, 0);
        this.shield = 0;
        this.powerUsed = false;
    }

    useSkill(){
        if(!this.powerUsed){
            this.onActivate();
        }
        this.powerUsed = true;
    }

    refresh(){
        this.powerUsed = false;
    }

    onActivate(){

    }
}