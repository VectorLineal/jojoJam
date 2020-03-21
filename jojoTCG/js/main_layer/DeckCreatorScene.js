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
        //heroes
        this.load.image('Dio Brando', 'assets/Dio Brando.jpg');
        this.load.image('Jonathan Joestar', 'assets/Jonathan Joestar.jpg');
        this.load.image('Jack the Ripper', 'assets/Jack the Ripper.jpg');
        this.load.image('Tarkus', 'assets/Tarkus.jpg');
        this.load.image('Bruford', 'assets/Bruford.jpg');
        this.load.image('William A. Zeppeli', 'assets/William A. Zeppeli.jpg');

        //minions
        this.load.image('Dire', 'assets/Dire.jpg');
        this.load.image('Robert E.O Speedwagon', 'assets/Robert E.O Speedwagon.jpg');
        this.load.image('Straits', 'assets/Straits.jpg');
        this.load.image('Strait\'s Disciple', 'assets/Strait\'s Disciple.jpg');
        this.load.image('Adams', 'assets/Adams.jpg');
        this.load.image('Chimera Zombie', 'assets/Chimera Zombie.jpg');
        this.load.image('Doobie', 'assets/Doobie.jpg');
        this.load.image('Executed Zombie', 'assets/Executed Zombie.jpg');
        this.load.image('Wang Chan', 'assets/Wang Chan.jpg');
        this.load.image('Zombie', 'assets/Zombie.jpg');
        this.load.image('Zombie Knight', 'Zombie Knight.jpg');
        this.load.image('Aztec Chieftain', 'assets/Aztec Chieftain.jpg');
        this.load.image('Dario Brando', 'assets/Dario Brando.jpg');
        this.load.image('Erina Pendleton', 'assets/Erina Pendleton.jpg');
        this.load.image('George Joestar', 'assets/George Joestar.jpg');
        this.load.image('Tonpetty', 'assets/Tonpetty.jpg');

        //items
        this.load.image('Luck & Pluck', 'assets/Luck & Pluck.jpg');
        this.load.image('Wine', 'assets/Wine.jpg');
        this.load.image('Montrous Knife', 'assets/Montrous Knife.jpg');
        this.load.image('Stone Mask', 'assets/Stone Mask.jpg');
        this.load.image('Tarkus\' Chains', 'assets/Tarkus\' Chains.jpg');

        //spells
        this.load.image('Deep Pass Overdrive', 'assets/Deep Pass Overdrive.jpg');
        this.load.image('Hamon Cutter', 'assets/Hamon Cutter.jpg');
        this.load.image('life magnetism overdrive', 'assets/life magnetism overdrive.jpg');
        this.load.image('Overdrive Barrage', 'assets/Overdrive Barrage.jpg');
        this.load.image('Scarlet Overdrive', 'assets/Scarlet Overdrive.jpg');
        this.load.image('Sendo Wave Kick', 'assets/Sendo Wave Kick.jpg');
        this.load.image('Sunlight Overdrive', 'assets/Sunlight Overdrive.jpg');
        this.load.image('Tuquoise Blue Overdrive', 'assets/Tuquoise Blue Overdrive.jpg');
        this.load.image('Zoom Punch', 'assets/Zoom Punch.jpg');
        this.load.image('Hypnosis', 'assets/Hypnosis.jpg');
        this.load.image('Fusion', 'assets/Fusion.jpg');
        this.load.image('Regeneration', 'assets/Regeneration.jpg');
        this.load.image('Space Ripper Stingy Eye', 'assets/Space Ripper Stingy Eye.jpg');
        this.load.image('Freeze', 'assets/Freeze.jpg');
    }
    
    create() {
        let cardsPerScreen = 6;
        let { width, height } = this.sys.game.canvas;
        let game = this.scene.get('GameScene');
        let scene = this;
        let scale = this.scaleRatio;
        var color = '';
        
        //elementos que se renderizan
        this.add.rectangle(width / 2, 2 * height / 3, width, height / 50, 0x0909a9);
        var shownHeroes = this.add.group();
        var shownCards = this.add.group();
        var displayHero;
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
                    if(this.texture.key == 'Jonathan Joestar' || this.texture.key == 'William A. Zeppeli'){
                        color = 'y';
                    }else{
                        color = 'r';
                    }
                    console.log(color);
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
        
            child.on('pointerup', function (pointer) {
                this.clearTint();
                displayDeck.children.iterate((chld) => {
                    chld.setInteractive();
                    chld.setScale(scale);
                    chld.on('pointerdown', function (pointer) {

                    });
                });
                shownHeroes.setVisible(false);
            });
        });

        if(color == 'y'){

        }else{

        }

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