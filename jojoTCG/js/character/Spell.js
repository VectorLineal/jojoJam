import Card from "./Card.js";
export default class Spell extends Card{
    constructor(name, color, cost, effect){
        super(name, color, cost);
    }
    onSummon(){

    }
}