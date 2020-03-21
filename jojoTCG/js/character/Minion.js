import Character from "./Character.js";

export default class Minion extends Character{
    constructor(name, color, cost, maxHealth, attack, effect, race){
        super(name, color, cost, maxHealth, attack, effect);
        this.race = race;
    }

    onSummon(){

    }
}