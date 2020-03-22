import "./phaser.js";
import createCardArray from "../effectReader/EffectReader.js";
//import Character from "../character/Character.js";

export default class SceneGame extends Phaser.Scene {

    constructor () {
        super({key: 'GameScene'});
        
    }

    preload() {
        //this.load.spritesheet('minotaur_warrior', 'assets/warrior_minotaur_test.png', {frameWidth: 60, frameHeight: 76});
        //this.load.image('tiles', 'assets/maptiles.png');
        var cardsCode = this.load.json('cardsjson', "assets/cards.json");
        //var cards = createCardArray(cardsCode);
    }
    
    create() {
        //referencia a la escena de creador de deck
        let deckManager = this.scene.get("DeckScene");
        let { width, height } = this.sys.game.canvas;
        let scale = height / (3.3 * 440);

        var cards = createCardArray(this.cache.json.get('cardsjson').cards);
        console.log(cards);

        cards[0].onSummon();
        //console.log(cards[0].onSummon);
        // cards.forEach(element => {
        //     element.onSummon();
        // });

        // console.log(cards);

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