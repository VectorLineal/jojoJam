import "./phaser.js";

export default class DeckCreatorScene extends Phaser.Scene {

    constructor () {
        super({key: 'HUDScene', active: true});
        //muy importante para hacer escalado de forma correcta
        this.scaleRatio = window.devicePixelRatio / 1.5;
        this.displayCards;

        //datos para pasar a gameScene
        this.deck;
    }

    preload() {
        this.load.image('Dio Brando', 'assets/Dio Brando.jpg');
        this.load.image('Jonathan Joestar', 'assets/Jonathan Joestar.jpg');
        this.load.image('Jack the Ripper', 'assets/Jack the Ripper.jpg');
        this.load.image('Tarkus', 'assets/Tarkus.jpg');
        this.load.image('Bruford', 'assets/Bruford.jpg');
        this.load.image('William A. Zeppeli', 'assets/William A. Zeppeli.jpg');
    }
    
    create() {
        let cardsPerScreen = 6;
        let { width, height } = this.sys.game.canvas;
        let game = this.scene.get('GameScene');
        let scene = this;
        let scale = this.scaleRatio;
        
        //elementos estáticos
        this.add.rectangle(width / 2, 2 * height / 3, width, height / 50, 0x0909a9);
        var shownHeroes = this.add.group();
        var shownCards = this.add.group();
        var displayDeck = this.add.group();
        var displayAmounts = this.add.group();
        var deckKeys = [];

        shownHeroes.create((shownHeroes.children.size + 1) * width / (cardsPerScreen+1), height / 6, 'Jonathan Joestar');
        shownHeroes.create((shownHeroes.children.size + 1) * width / (cardsPerScreen+1), height / 6, 'William A. Zeppeli');
        shownHeroes.create((shownHeroes.children.size + 1) * width / (cardsPerScreen+1), height / 6, 'Dio Brando');
        shownHeroes.create((shownHeroes.children.size + 1) * width / (cardsPerScreen+1), height / 6, 'Jack the Ripper');
        shownHeroes.create((shownHeroes.children.size + 1) * width / (cardsPerScreen+1), height / 6, 'Tarkus');
        shownHeroes.create((shownHeroes.children.size + 1) * width / (cardsPerScreen+1), height / 6, 'Bruford');

        shownHeroes.children.iterate((child) => {
            
            child.setInteractive();
            child.setScale(this.scaleRatio);
            child.on('pointerdown', function (pointer) {
                var amount = 0;
                var index = 0;
                for (index; index < deckKeys.length; index++) {
                    if(deckKeys[index] == this.texture.key){
                        amount++;
                    }
                }
                this.setTint(0xa0a0c0);
                //console.log(amount, this.texture.key);
                if(amount<3){
                    deckKeys.push(this.texture.key);
                    if(amount > 0){
                        displayAmounts.children.iterate((chld) => {
                            if(chld.name == child.texture.key){
                                chld.setText('x' + (amount+1));
                            }
                        });
                    }else{
                        displayDeck.create((displayDeck.children.size  + 1) * width / (cardsPerScreen+1), height - (height / 6), child.texture.key);
                        let textDisplay = scene.add.text((width / 32) + ((displayAmounts.children.size + 1) * width / ( (cardsPerScreen+1))), height - (height / 15), 'x1', { font: '48px Arial', fill: '#0606b6'});
                        textDisplay.name = this.texture.key;
                        displayAmounts.add(textDisplay);
                    }
                }
            });
        
            child.on('pointerout', function (pointer) {
                this.clearTint();
                displayDeck.children.iterate((chld) => {
                    chld.setInteractive();
                    chld.setScale(scale);
                  });
            });
        
            child.on('pointerup', function (pointer) {
                this.clearTint();
                displayDeck.children.iterate((chld) => {
                    chld.setInteractive();
                    chld.setScale(scale);
                  });
            });
          });

        //elementos dinámicos
        var readCard = this.add.image(width/2, height/3, 'Dio'); //sirve para hacer zoom y leer cartas
        readCard.setVisible(false);
        readCard.setScale(this.scaleRatio * 1.5);

        //input output

        this.input.on('gameobjectover', function (pointer, gameObject) {

            gameObject.setTint(0xa0b0a0);
            readCard.setTexture(gameObject.texture.key);
            readCard.setVisible(true);
    
        });
    
        this.input.on('gameobjectout', function (pointer, gameObject) {
    
            gameObject.clearTint();
            readCard.setVisible(false);
    
        });
    }
    
    update() {
        
    }

    fitNumber(num, decimals){
        let scalefactor = Math.pow(10, decimals);
        return (Math.round(num * scalefactor) / scalefactor).toFixed(decimals);
    }
}