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
        var cards = createCardArray(this.cache.json.get('cardsjson').cards);
        console.log(cards);

        // cards.forEach(element => {
        //     element.onSummon();
        // });

        // console.log(cards);
    }
    
    update() {
        
    }
}