import "./phaser.js";

export default class DeckCreatorScene extends Phaser.Scene {

    constructor () {
        super({key: 'HUDScene', active: true});
        //muy importante para hacer escalado de forma correcta
        this.scaleRatio = window.devicePixelRatio / 1.5;
        this.displayCards;
        this.cardsPerScreen = 6;

        //datos para pasar a gameScene
        this.heroe;
        this.deck;
    }

    preload() {
        this.load.image('Dio', 'assets/Dio Brando.jpg');
        this.load.image('Jonathan', 'assets/Jonathan Joestar.jpg');
        this.load.image('Jack', 'assets/Jack the Ripper.jpg');
        this.load.image('Tarkus', 'assets/Tarkus.jpg');
        this.load.image('Bruford', 'assets/Bruford.jpg');
        this.load.image('Will Zeppeli', 'assets/William A. Zeppeli.jpg');
    }
    
    create() {
        let { width, height } = this.sys.game.canvas;
        let game = this.scene.get('GameScene');
        
        //elementos estáticos
        var shownCards = this.add.group();

        shownCards.create(width / (this.cardsPerScreen+1), height / 6, 'Jonathan');
        shownCards.create(2*width / (this.cardsPerScreen+1), height / 6, 'Will Zeppeli');
        shownCards.create(3*width / (this.cardsPerScreen+1), height / 6, 'Dio');
        shownCards.create(4*width / (this.cardsPerScreen+1), height / 6, 'Jack');
        shownCards.create(5*width / (this.cardsPerScreen+1), height / 6, 'Tarkus');
        shownCards.create(6*width / (this.cardsPerScreen+1), height / 6, 'Bruford');
        shownCards.create(width / (this.cardsPerScreen+1), height / 2, 'Bruford');

        shownCards.children.iterate((child) => {
            child.setInteractive();
            child.setScale(this.scaleRatio);
          });

        this.add.rectangle(width / 2, 2 * height / 3, width, height / 50, 0x0909a9);

        //elementos dinámicos
        var displayDeck = this.add.group();
        var readCard = this.add.image(width/2, height/2, 'Dio'); //sirve para hacer zoom y leer cartas
        readCard.setVisible(false);
        readCard.setScale(this.scaleRatio*1.5);

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

    fitNumber(num, decimals){
        let scalefactor = Math.pow(10, decimals);
        return (Math.round(num * scalefactor) / scalefactor).toFixed(decimals);
    }
    
    update() {
    }
}