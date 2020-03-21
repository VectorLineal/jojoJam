import "./phaser.js";

export default class DeckCreatorScene extends Phaser.Scene {
  constructor() {
    super({ key: "HUDScene", active: true });
    //muy importante para hacer escalado de forma correcta
    this.scaleRatio = window.devicePixelRatio / 1.5;

    //datos para pasar a gameScene
    this.deck;
  }

  preload() {
      //buttons
      this.load.image("button l", "assets/left_button.png");
      this.load.image("button r", "assets/rigth_button.png");
    //heroes
    this.load.image("Dio Brando", "assets/Dio Brando.jpg");
    this.load.image("Jonathan Joestar", "assets/Jonathan Joestar.jpg");
    this.load.image("Jack the Ripper", "assets/Jack the Ripper.jpg");
    this.load.image("Tarkus", "assets/Tarkus.jpg");
    this.load.image("Bruford", "assets/Bruford.jpg");
    this.load.image("William A. Zeppeli", "assets/William A. Zeppeli.jpg");

    //minions
    this.load.image("Dire", "assets/Dire.jpg");
    this.load.image(
      "Robert E.O. Speedwagon",
      "assets/Robert E.O. Speedwagon.jpg"
    );
    this.load.image("Straits", "assets/Straits.jpg");
    this.load.image("Strait's Disciple", "assets/Strait's Disciple.jpg");
    this.load.image("Adams", "assets/Adams.jpg");
    this.load.image("Chimera Zombie", "assets/Chimera Zombie.jpg");
    this.load.image("Doobie", "assets/Doobie.jpg");
    this.load.image("Executed Zombie", "assets/Executed Zombie.jpg");
    this.load.image("Wang Chan", "assets/Wang Chan.jpg");
    this.load.image("Zombie", "assets/Zombie.jpg");
    this.load.image("Zombie Knight", "assets/Zombie Knight.jpg");
    this.load.image("Aztec Chieftain", "assets/Aztec Chieftain.jpg");
    this.load.image("Dario Brando", "assets/Dario Brando.jpg");
    this.load.image("Erina Pendleton", "assets/Erina Pendleton.jpg");
    this.load.image("George Joestar", "assets/George Joestar.jpg");
    this.load.image("Tonpetty", "assets/Tonpetty.jpg");

    //items
    this.load.image("Luck & Pluck", "assets/Luck & Pluck.jpg");
    this.load.image("Wine", "assets/Wine.jpg");
    this.load.image("Montrous Knife", "assets/Montrous Knife.jpg");
    this.load.image("Stone Mask", "assets/Stone Mask.jpg");
    this.load.image("Tarkus' Chains", "assets/Tarkus' Chains.jpg");

    //spells
    this.load.image("Deep Pass Overdrive", "assets/Deep Pass Overdrive.jpg");
    this.load.image("Hamon Cutter", "assets/Hamon Cutter.jpg");
    this.load.image(
      "life magnetism overdrive",
      "assets/life magnetism overdrive.jpg"
    );
    this.load.image("Overdrive Barrage", "assets/Overdrive Barrage.jpg");
    this.load.image("Scarlet Overdrive", "assets/Scarlet Overdrive.jpg");
    this.load.image("Sendo Wave Kick", "assets/Sendo Wave Kick.jpg");
    this.load.image("sunlight yellow overdrive", "assets/sunlight yellow overdrive.jpg");
    this.load.image(
      "Tuquoise Blue Overdrive",
      "assets/Tuquoise Blue Overdrive.jpg"
    );
    this.load.image("Zoom Punch", "assets/Zoom Punch.jpg");
    this.load.image("Hypnosis", "assets/Hypnosis.jpg");
    this.load.image("Fusion", "assets/Fusion.jpg");
    this.load.image("Regeneration", "assets/Regeneration.jpg");
    this.load.image(
      "Space Ripper Stingy Eye",
      "assets/Space Ripper Stingy Eye.jpg"
    );
    this.load.image("Freeze", "assets/Freeze.jpg");
  }

  create() {
    this.input.topOnly = true;
    let cardsPerScreen = 6;
    let { width, height } = this.sys.game.canvas;
    let game = this.scene.get("GameScene");
    let scene = this;
    let scale = height / (3.3 * 440);
    var color = "";
    var cardType = 0;
    var cardStage = 0;
    var deckStage = 0;

    //elementos que se renderizan
    this.add.rectangle(
      width / 2,
      (2 * height) / 3,
      width,
      height / 50,
      0x0909a9
    );
    var cardsCounter = this.add.text(width / 40, (2 * height) / 3, "0 / 30", { font: "48px Arial", fill: "#060606" });
    var shownHeroes = this.add.group();
    var shownCards = this.add.group();
    var displayHero;
    var displayDeck = this.add.group();
    var displayAmounts = this.add.group();
    var deckKeys = [];
    cardsCounter.setScale(scale);
    console.log("scale:", scale);

    //yellow
    shownCards.create(
      ((shownCards.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Dire"
    );
    shownCards.create(
      ((shownCards.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Robert E.O. Speedwagon"
    );
    shownCards.create(
      ((shownCards.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Straits"
    );
    shownCards.create(
      ((shownCards.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Strait's Disciple"
    );
    shownCards.create(
      ((shownCards.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Luck & Pluck"
    );
    shownCards.create(
      ((shownCards.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Wine"
    );
    shownCards.create(
      (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 2,
      "Deep Pass Overdrive"
    );
    shownCards.create(
      (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 2,
      "Hamon Cutter"
    );
    shownCards.create(
      (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 2,
      "life magnetism overdrive"
    );
    shownCards.create(
      (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 2,
      "Overdrive Barrage"
    );
    shownCards.create(
      (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 2,
      "Scarlet Overdrive"
    );
    shownCards.create(
      (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 2,
      "Sendo Wave Kick"
    );
    shownCards.create(
      width +
        (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "sunlight yellow overdrive"
    );
    shownCards.create(
      width +
        (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Tuquoise Blue Overdrive"
    );
    shownCards.create(
      width +
        (((shownCards.children.size % 6) + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Zoom Punch"
    );
    //red
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 6,
      "Adams"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 6,
      "Chimera Zombie"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 6,
      "Doobie"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 6,
      "Executed Zombie"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 6,
      "Wang Chan"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 6,
      "Zombie"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 2,
      "Zombie Knight"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 2,
      "Montrous Knife"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 2,
      "Stone Mask"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 2,
      "Tarkus' Chains"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 2,
      "Hypnosis"
    );
    shownCards.create(
      ((((shownCards.children.size - 15) % 6) + 1) * width) /
        (cardsPerScreen + 1),
      height / 2,
      "Fusion"
    );
    shownCards.create(
      width +
        ((((shownCards.children.size - 15) % 6) + 1) * width) /
          (cardsPerScreen + 1),
      height / 6,
      "Regeneration"
    );
    shownCards.create(
      width +
        ((((shownCards.children.size - 15) % 6) + 1) * width) /
          (cardsPerScreen + 1),
      height / 6,
      "Space Ripper Stingy Eye"
    );
    shownCards.create(
      width +
        ((((shownCards.children.size - 15) % 6) + 1) * width) /
          (cardsPerScreen + 1),
      height / 6,
      "Freeze"
    );
    //black
    shownCards.create(
      width +
        ((((shownCards.children.size - 15) % 6) + 1) * width) /
          (cardsPerScreen + 1),
      height / 6,
      "Aztec Chieftain"
    );
    shownCards.create(
      width +
        ((((shownCards.children.size - 15) % 6) + 1) * width) /
          (cardsPerScreen + 1),
      height / 6,
      "Dario Brando"
    );
    shownCards.create(
      width +
        ((((shownCards.children.size - 15) % 6) + 1) * width) /
          (cardsPerScreen + 1),
      height / 6,
      "Erina Pendleton"
    );
    shownCards.create(
      width +
        ((((shownCards.children.size - 15) % 6) + 1) * width) /
          (cardsPerScreen + 1),
      height / 2,
      "George Joestar"
    );
    shownCards.create(
      width +
        ((((shownCards.children.size - 15) % 6) + 1) * width) /
          (cardsPerScreen + 1),
      height / 2,
      "Tonpetty"
    );

    shownCards.setVisible(false);

    shownHeroes.create(
      ((shownHeroes.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Jonathan Joestar"
    );
    shownHeroes.create(
      ((shownHeroes.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "William A. Zeppeli"
    );
    shownHeroes.create(
      ((shownHeroes.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Dio Brando"
    );
    shownHeroes.create(
      ((shownHeroes.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Jack the Ripper"
    );
    shownHeroes.create(
      ((shownHeroes.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Tarkus"
    );
    shownHeroes.create(
      ((shownHeroes.children.size + 1) * width) / (cardsPerScreen + 1),
      height / 6,
      "Bruford"
    );

    shownHeroes.children.iterate(child => {
      child.setInteractive();
      child.setScale(scale);
      child.on("pointerdown", function(pointer) {
        this.setTint(0xa0a0c0);
        if (
          this.texture.key == "Jonathan Joestar" ||
          this.texture.key == "William A. Zeppeli"
        ) {
          color = "y";
        } else {
          color = "r";
        }
        console.log(color);
        displayHero = scene.add.image(
          width / (cardsPerScreen + 1),
          height - height / 6,
          child.texture.key
        );
      });

      child.on("pointerup", function(pointer) {
        this.clearTint();
        displayHero.setInteractive();
        displayHero.setScale(scale);
        displayHero.on("pointerdown", function(pointer) {
          if (shownCards.children.size == 0) {
            color = "";
          } else {
            if (
              deckKeys.includes("Dire") ||
              deckKeys.includes("Robert E.O. Speedwagon") ||
              deckKeys.includes("Straits") ||
              deckKeys.includes("Strait's Disciple") ||
              deckKeys.includes("Luck & Pluck") ||
              deckKeys.includes("Wine") ||
              deckKeys.includes("Deep Pass Overdrive") ||
              deckKeys.includes("Hamon Cutter") ||
              deckKeys.includes("life magnetism overdrive") ||
              deckKeys.includes("Overdrive Barrage") ||
              deckKeys.includes("Scarlet Overdrive") ||
              deckKeys.includes("Sendo Wave Kick") ||
              deckKeys.includes("sunlight yellow overdrive") ||
              deckKeys.includes("Tuquoise Blue Overdrive") ||
              deckKeys.includes("Zoom Punch")
            ) {
              color = "y";
            } else if (
              deckKeys.includes("Adams") ||
              deckKeys.includes("Chimera Zombie") ||
              deckKeys.includes("Doobie") ||
              deckKeys.includes("Executed Zombie") ||
              deckKeys.includes("Wang Chan") ||
              deckKeys.includes("Zombie") ||
              deckKeys.includes("Zombie Knight") ||
              deckKeys.includes("Montrous Knife") ||
              deckKeys.includes("Stone Mask") ||
              deckKeys.includes("Tarkus' Chains") ||
              deckKeys.includes("Hypnosis") ||
              deckKeys.includes("Fusion") ||
              deckKeys.includes("Regeneration") ||
              deckKeys.includes("Space Ripper Stingy Eye") ||
              deckKeys.includes("Freeze")
            ) {
            } else {
              color = "";
            }
          }
        });

        displayHero.on("pointerup", function(pointer) {
          displayHero.setVisible(false);
          if (color == "") {
            shownHeroes.setVisible(true);
          } else {
            shownHeroes.children.iterate(child => {
              if (color == "r") {
                if (
                  child.texture.key == "Dio Brando" ||
                  child.texture.key == "Jack the Ripper" ||
                  child.texture.key == "Tarkus" ||
                  child.texture.key == "Bruford"
                ) {
                  child.setVisible(true);
                }
              } else if (color == "y") {
                if (
                  child.texture.key == "Jonathan Joestar" ||
                  child.texture.key == "William A. Zeppeli"
                ) {
                  child.setVisible(true);
                }
              }
            });
          }
          shownCards.setVisible(false);
          cardType = 0;
        });
        shownHeroes.setVisible(false);
        shownCards.setVisible(true);
        shownCards.children.iterate(child => {
          if (color == "r") {
            if (
                child.texture.key == "Dire" ||
                child.texture.key == "Robert E.O. Speedwagon" ||
                child.texture.key == "Straits" ||
                child.texture.key == "Strait's Disciple" ||
                child.texture.key == "Luck & Pluck" ||
                child.texture.key == "Wine" ||
                child.texture.key == "Deep Pass Overdrive" ||
                child.texture.key == "Hamon Cutter" ||
                child.texture.key == "life magnetism overdrive" ||
                child.texture.key == "Overdrive Barrage" ||
                child.texture.key == "Scarlet Overdrive" ||
                child.texture.key == "Sendo Wave Kick" ||
                child.texture.key == "sunlight yellow overdrive" ||
                child.texture.key == "Tuquoise Blue Overdrive" ||
                child.texture.key == "Zoom Punch"
            ) {
                child.setVisible(false);
            }
          } else if (color == "y") {
            if (
                child.texture.key == "Adams" ||
                child.texture.key == "Chimera Zombie" ||
                child.texture.key == "Doobie" ||
                child.texture.key == "Executed Zombie" ||
                child.texture.key == "Wang Chan" ||
                child.texture.key == "Zombie" ||
                child.texture.key == "Zombie Knight" ||
                child.texture.key == "Montrous Knife" ||
                child.texture.key == "Stone Mask" ||
                child.texture.key == "Tarkus' Chains" ||
                child.texture.key == "Hypnosis" ||
                child.texture.key == "Fusion" ||
                child.texture.key == "Regeneration" ||
                child.texture.key == "Space Ripper Stingy Eye" ||
                child.texture.key == "Freeze"
            ) {
                child.setVisible(false);
            }
          }
        });
        cardType = 1;
      });
    });

    shownCards.children.iterate(child => {
      child.setScale(scale);
      child.setInteractive();
      child.on("pointerdown", function(pointer) {
        var amount = 0;
        var index = 0;
        for (index; index < deckKeys.length; index++) {
          if (deckKeys[index] == this.texture.key) {
            amount++;
          }
        }
        this.setTint(0xa0a0c0);
        console.log("canidad objeto: ", amount, " nombre ", this.texture.key);
        if (amount < 3 && deckKeys.length < 30) {
          deckKeys.push(this.texture.key);
          cardsCounter.text = deckKeys.length + " / 30";

          if (amount > 0) {
            displayAmounts.children.iterate(chld => {
              if (chld.name == child.texture.key) {
                chld.setText("x" + (amount + 1));
              }
            });
          } else {
              let displayCard = scene.add.image((Math.floor(displayDeck.children.size / 5) * width) - (width * deckStage) + ((((displayDeck.children.size % 5) + 2) *     width) / (cardsPerScreen + 1)),
              height - height / 6,
              child.texture.key
              );
              displayCard.setInteractive();
              displayCard.setScale(scale);
              displayCard.on("pointerup", function(pointer) {
                    var amount = 0;
                  displayAmounts.children.each(chld => {
                      if (chld.name == this.texture.key ) {
                          amount = Number(chld.text.substring(chld.text.length - 1));
                          console.log("amount", amount);
                          if(chld.text == "x1"){
                              displayAmounts.remove(chld, true, true);
                              displayDeck.remove(this, true, true);
                              var index = 0;
                              displayDeck.children.iterate(child => {
                                  child.setX((Math.floor(index / 5) * width) - (width * deckStage) + ((((index % 5) + 2) * width) / (cardsPerScreen + 1)));
                                  index++;
                              });
        
                              index = 0;
                              displayAmounts.children.iterate(child => {
                                  child.setX((width / 32) + (Math.floor(index / 5) * width) - (width * deckStage) + ((((index % 5) + 2) * width) / (cardsPerScreen + 1)));
                                  index++;
                              });
                              for( var i = 0; i < deckKeys.length; i++){ 
                                  if ( deckKeys[i] === this.texture.key) { 
                                    deckKeys.splice(i, 1);
                                    break;
                                }
                            } 
                          }else{
                              chld.setText("x" + (amount - 1));
                              for( var i = 0; i < deckKeys.length; i++){ 
                                if ( deckKeys[i] === this.texture.key) { 
                                  deckKeys.splice(i, 1);
                                  break;
                              }
                          } 
                          }
                        
                      }
                    });
                });
            displayDeck.add(displayCard);
            let textDisplay = scene.add.text(
              width / 32 + (Math.floor(displayAmounts.children.size / 5) * width) - (width * deckStage) +
                (((displayAmounts.children.size % 5) + 2) * width) / (cardsPerScreen + 1),
              height - height / 15,
              "x1",
              { font: "48px Arial", fill: "#0606b6" }
            );
            textDisplay.name = this.texture.key;
            displayAmounts.add(textDisplay);
            console.log("size: ", displayDeck.children.size);
          }
        }
      });

      child.on("pointerup", function(pointer) {
        this.clearTint();
        shownHeroes.setVisible(false);
      });
    });

    //elementos dinámicos
    var readCard = this.add.image(width / 2, height / 3, "Dio"); //sirve para hacer zoom y leer cartas
    readCard.setVisible(false);
    readCard.setScale(scale* 1.5);

    var buttonCardsL = this.add.image(width / 20, height / 3, "button l");
    var buttonCardsR = this.add.image(19 * width / 20, height / 3, "button r");
    var buttonDeckL = this.add.image(width / 20, 11 * height / 12, "button l");
    var buttonDeckR = this.add.image(19 *width / 20, 11 * height / 12, "button r");

    buttonCardsL.setInteractive();
    buttonCardsR.setInteractive();
    buttonDeckL.setInteractive();
    buttonDeckR.setInteractive();

    buttonCardsL.setScale(scale * 1.5);
    buttonCardsR.setScale(scale * 1.5);
    buttonDeckL.setScale(scale * 1.5);
    buttonDeckR.setScale(scale * 1.5);

    buttonCardsL.on("pointerup", function(pointer) {
        if(cardType > 0 && cardStage >0){
            shownCards.children.iterate(child =>{
                child.setX(child.x + width);
            });
            cardStage --;
        }
    });

    buttonCardsR.on("pointerup", function(pointer) {
        if(cardType > 0 && cardStage < 1){
            shownCards.children.iterate(child =>{
                child.setX(child.x - width);
            });
            cardStage ++;
        }
    });

    buttonDeckL.on("pointerup", function(pointer) {
        if(deckStage > 0){
            displayDeck.children.iterate(child =>{
                child.setX(child.x + width);
            });
            displayAmounts.children.iterate(child =>{
                child.setX(child.x + width);
            });
            deckStage --;
        }
    });

    buttonDeckR.on("pointerup", function(pointer) {
        if(deckStage < Math.ceil(displayDeck.children.size / 6)){
            displayDeck.children.iterate(child =>{
                child.setX(child.x - width);
            });
            displayAmounts.children.iterate(child =>{
                child.setX(child.x - width);
            });
            deckStage++;
        }
    });

    //input output

    this.input.on("gameobjectover", function(pointer, gameObject) {
      gameObject.setTint(0xa0b0a0);
      if(gameObject.texture.key != "button l" && gameObject.texture.key != "button r"){
        readCard.setTexture(gameObject.texture.key);
        readCard.setVisible(true);
      }
      
    });

    this.input.on("gameobjectout", function(pointer, gameObject) {
      gameObject.clearTint();
      readCard.setVisible(false);
    });
  }

  update() {
  }

  fitNumber(num, decimals) {
    let scalefactor = Math.pow(10, decimals);
    return (Math.round(num * scalefactor) / scalefactor).toFixed(decimals);
  }
}
