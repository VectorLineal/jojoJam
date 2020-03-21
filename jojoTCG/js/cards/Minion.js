import Character from "./Character.js";

export default class Minion extends Character{
    constructor(name, color, mana, maxHealth, attack, race){
        super(name, color, mana, maxHealth, attack);
        this.race = race;
    }

    onSummon(){

    }
}