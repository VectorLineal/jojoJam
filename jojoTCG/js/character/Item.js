import Card from "./Card.js";

export default class Item extends Card{
    constructor(name, color, cost, shield, attack, effect){
        super(name, color, cost);
        this.attack = attack;
        this.shield = shield;
    }

    onSummon(){
        
    }
}