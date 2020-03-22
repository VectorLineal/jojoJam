import "./phaser.js";
import createCardArray from "../effectReader/EffectReader.js";
import Player from "../cards/Player.js";
import Hero from "../cards/Hero.js";
//import Character from "../character/Character.js";

export default class SceneGame extends Phaser.Scene {

    constructor () {
        super({key: 'GameScene'});
        this.player1;
        
    }

    preloadSprite(scene, name){
        scene.load.image(name, "assets/" + name + ".jpg");
    }

    preload() {
        let deckManager = this.scene.get("DeckScene");
        //this.load.spritesheet('minotaur_warrior', 'assets/warrior_minotaur_test.png', {frameWidth: 60, frameHeight: 76});
        //this.load.image('tiles', 'assets/maptiles.png');
        var cardsCode = this.load.json('cardsjson', "assets/cards.json");
        for (let i = 0; i < deckManager.deck.length; i++) {
            this.preloadSprite(this, deckManager.deck[i]);
        }
        this.preloadSprite(this, deckManager.hero);
        //var cards = createCardArray(cardsCode);
    }
    
    create() {
        //referencia a la escena de creador de deck
        let deckManager = this.scene.get("DeckScene");
        let { width, height } = this.sys.game.canvas;
        let scale = widht / (8.25 * 311);

        var cards = createCardArray(this.cache.json.get('cardsjson').cards);
        console.log(cards);

        var deck = [];

        for (let i = 0; i < deckManager.deck.length; i++) {
            for (let j = 0; j < cards.length; j++) {
                if (deckManager.deck[i] == cards[j].name) {
                    deck.push(cards[j]);
                    break;
                }                
            }
        }
        console.log(deck);
        
        cards[0].onSummon();
        //console.log(cards[0].onSummon);
        // cards.forEach(element => {
        //     element.onSummon();
        // });

        // console.log(cards);

        //this.add.rectangle( width / 2, (2 * height) / 3, width, height / 50, 0x0909a9 );

        this.player1 = new Player("fornica", new Hero(deckManager.hero, 'b', 30), deck, 1);

        var readCard = this.add.image(width / 2, height / 3, "Dio"); //sirve para hacer zoom y leer cartas
        readCard.setVisible(false);
        readCard.setScale(scale * 1.8);

        //input output
        this.input.on("gameobjectover", function(pointer, gameObject) {
            gameObject.setTint(0xa0b0a0);
            readCard.setTexture(gameObject.texture.key);
            readCard.setVisible(true);
            
          });
      
          this.input.on("gameobjectout", function(pointer, gameObject) {
            gameObject.clearTint();
            readCard.setVisible(false);
          });
    }
    
    update() {
        
    }
}