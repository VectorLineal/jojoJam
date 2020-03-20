import "./phaser.js";

export default class DeckCreatorScene extends Phaser.Scene {

    constructor () {
        super({key: 'HUDScene', active: true});
        //muy importante para hacer escalado de forma correcta
        this.scaleRatio = window.devicePixelRatio;
        this.displayCards;

        //datos para pasar a gameScene
        this.heroe;
        this.deck;
    }

    preload() {
        this.load.image('Dio', 'assets/Dio Brando.jpg');
        this.load.image('Jonathan', 'assets/Jhonathan Joestar.jpg');
        this.load.image('Jack', 'assets/Jack the Ripper.jpg');
        this.load.image('Tarkus', 'assets/Tarkus.jpg');
        this.load.image('Brufford', 'assets/Brufford.jpg');
        this.load.image('Will Zeppeli', 'assets/William A. Zeppeli.jpg');
    }
    
    create() {
        let { width, height } = this.sys.game.canvas;
        let game = this.scene.get('GameScene');
        
        //elementos dinámincos
        var dio = this.add.image(300, 450, 'Dio');
    }

    fitNumber(num, decimals){
        let scalefactor = Math.pow(10, decimals);
        return (Math.round(num * scalefactor) / scalefactor).toFixed(decimals);
    }
    
    update() {
    }
}