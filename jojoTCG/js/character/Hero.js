import Character from "./Character.js";
//import "../main_layer/phaser.js";
export default class Hero extends Character{
    constructor(name, color, cost, maxHealth, effect){
        super(name, color, cost, maxHealth, 0, '');
        this.shield = 0;
    }

    onActivate(){

    }
}