import "../main_layer/phaser.js";

export default class Card{
    constructor(name, color, mana){
        this.name = name;
        this.color = color;
        this.mana = mana;
        this.sprite;
    }
    setSprite(scene, scale, positionX, positionY){
        this.sprite = scene.add.image(positionX, positionY, this.name);
        this.sprite.setScale(scale);
        this.sprite.setInteractive();
    }

    relocate(positionX, positionY){
        this.sprite.setPosition(positionX, positionY);
    }
}