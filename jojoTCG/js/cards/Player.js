import Deck from "./Deck.js";

export default class Player{
    constructor(name, hero, cards, mana){
        this.name = name;
        this.hero = hero;
        this.deck = new Deck(cards);
        this.deck.suffle();
        this.hand = [];
        for(var i = 0; i < 3 + mana; i++){
            this.hand.push(this.deck.draw());
        }
        this.graveyard = [];
        this.field = [];
        this.mana = mana;
        this.oldMana = this.mana;
    }

    draw() {
        this.hand.push(this.deck.pop());
    }
    summon() {
        //***********implemet/
        this.field.push(this.hand.pop());
    }
    summon(name) {
        //this.field.push(toCard(name));
    }

    onTurnBegin(){
        if(!this.deck.isEmpty()){
            this.hand.push(this.deck.draw());
        }else{
            this.hero.alterHealth(-5);
        }
        
        if(this.oldMana < 12){
            this.oldMana++;
        }
        this.mana = this.oldMana;
        this.hero.refresh();
    }

    onTurnEnd(){
        for(var i = 0; i < this.field.length; i++){
            this.field.onEndTurn();
        }
    }
}