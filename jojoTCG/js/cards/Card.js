import "../main_layer/phaser.js";

export default class Card{
    constructor(name, color, mana){
        this.name = name;
        this.color = color;
        this.mana = mana;
        this.sprite;
    }

    preloadSprite(scene){
        scene.load.image(this.name, "assets/" + this.name + ".jpg");
    }

    setSprite(scene, scale, positionX, positionY){
        this.sprite = scene.add.image(positionX, positionY);
        this.sprite.setScale(scale);
        this.sprite.setinteractive();
    }

    relocate(positionX, positionY){
        this.sprite.setPosition(positionX, positionY);
    }
}