import Deck from "./Deck.js";
import SceneGame from "../main_layer/SceneGame.js"

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
        this.hand.push(this.deck.draw());
    }
    // summon() {
    //     //***********implemet/
    //     // selection = selectCard();
    //     this.field.push(this.hand.pop());
    // }
    summon(scene, name, width, height, scale) {
        var card;
        for(var i = 0; i < this.hand.length; i++){
            if(this.hand[i].name == name){
                card = this.hand[i].sprite.setPosition(((this.field.length + 2) * width) / 10, (5.3 * height / 6) - (scale * 1.1 * 444));
                this.hand.splice(i, 1);
                break;
            }
        }

        this.field.push(card);

        for(var i = 0; i < this.hand.length; i++){
            this.hand[i].sprite.setX(((i+2)*width) / 10);
        }

    }

    fixPositions(){

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