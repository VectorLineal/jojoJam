import Card from "./Card.js";

export default class Item extends Card{
    constructor(name, color, cost, shield, attack){
        super(name, color, cost);
        this.shield = shield;
        this.attack = attack;
    }

    onSummon(){
        
    }
}