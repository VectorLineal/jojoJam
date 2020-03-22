import "./phaser.js";
import SceneGame from "./SceneGame.js";
import DeckCreatorScene from "./DeckCreatorScene.js";

var config = {
    type: Phaser.AUTO,
    parent: '',
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    backgroundColor: '#fbf0e4',
    scene: [DeckCreatorScene, SceneGame],
    title: 'jojo TCG'
};

let game = new Phaser.Game(config);

var allCards;