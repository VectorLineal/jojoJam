import "./phaser.js";
import createCardArray from "../reader/EffectReader.js";
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
    
    toCard(name) {
        var cards = createCardArray(this.cache.json.get('cardsjson').cards);
        for (let i = 0; i < cards.length; i++) {
            if (name == cards[i].name) {
                return cards[i];
            }                
        }
    }
    create() {
        //referencia a la escena de creador de deck
        let deckManager = this.scene.get("DeckScene");
        let { width, height } = this.sys.game.canvas;
        let scale = height / (4.25 * 444);
        let scene = this;

        var deck = [];

        for (let i = 0; i < deckManager.deck.length; i++) {
            deck.push(this.toCard(deckManager.deck[i]));
        }
        console.log(deck);
        
        // cards[0].onSummon();

        this.add.rectangle( width / 2, height - (scale * 222), width, (scale * 1.4 * 444), 0x09a9a9 );
        this.add.rectangle( width / 2, scale * 222, width, (scale * 1.4 * 444), 0x09a9a9 );

        this.player1 = new Player("fornica", new Hero(deckManager.hero, 'b', 30), deck, 1);

        for(var i = 0; i< this.player1.hand.length; i++){
            this.player1.hand[i].setSprite(this, scale, ((i+2)*width) / 10, 5.3 * height / 6);
        }

        this.player1.hero.setSprite(this, scale * 1.2, (width) / 12, 5.15 * height / 6);

        for(var i = 0; i <this.player1.hand.length; i++){
            this.input.setDraggable(this.player1.hand[i].sprite);
        }

        var readCard = this.add.image(scale * 0.9 * 311, height / 2, "Dio"); //sirve para hacer zoom y leer cartas
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


          this.input.on('dragstart', function (pointer, gameObject) {

            gameObject.setTint(0xcc08aa);
    
        });
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.setTint(0xcc08aa);
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
        let targetPlayer = this.player1;
        this.input.on('dragend', function (pointer, gameObject) {
    
            gameObject.clearTint();
            if(gameObject.y > (scale * 0.7 * 444) + (scale * 222) && gameObject.y < height - (scale * 0.7 * 444) + (scale * 222)){
                targetPlayer.summon(scene, gameObject.texture.key, width, height, scale);
            }else{
                for(var i = 0; i < targetPlayer.hand.length; i++){
                    if(targetPlayer.hand[i].name == gameObject.texture.key){
                        gameObject.setPosition(((i+2)*width) / 10, 5.3 * height / 6);
                        break;
                    }
                }
            }
    
        });
    }
    
    update() {
        
    }
}