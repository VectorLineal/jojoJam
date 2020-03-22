import Card from "./Card.js";

export default class Spell extends Card{
    constructor(name, color, mana){
        super(name, color, mana);
    }

    onActivate(){
        
    }
}