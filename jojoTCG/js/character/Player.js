class Player{
    constructor(name, hero, deck, mana){
        this.name = name;
        this.hero = hero;
        this.deck = deck;
        this.hand = [];
        this.graveyard = [];
        this.mana = mana;
    }
}