import Phaser from "phaser";

class Menu extends Phaser.Scene{

    constructor(config){
        super('Menu')
        this.config = config
        this.button = null
        this.text = null
    }

    create(){
        //Fondo
        this.add.image(400,300,'menu')
        //Botones
        this.buttonStart = this.add.sprite(400,400,'buttons','start').setInteractive()
        this.buttonLevel1 = this.add.sprite(300,500,'level1').setInteractive()
        this.buttonLevel2 = this.add.sprite(500,500,'level2').setInteractive()
        this.buttonStart.setScale(1.5)
        this.buttonLevel1.setScale(0.5)
        this.buttonLevel2.setScale(0.5)
        //Animaciones Simples
        this.buttonStart.on('pointerover',function(){
            this.setTint(0x094293)
        })

        this.buttonStart.on('pointerout', function () {
            this.clearTint();
        })

        this.buttonStart.on('pointerdown', function (){
            this.scene.start('Nivel1')
        },this)

        this.buttonLevel1.on('pointerover',function(){
            this.setTint(0x094293)
        })

        this.buttonLevel1.on('pointerout', function () {
            this.clearTint();
        })

        this.buttonLevel1.on('pointerdown', function (){
            this.scene.start('Nivel1')
        },this)

        this.buttonLevel2.on('pointerover',function(){
            this.setTint(0x094293)
        })

        this.buttonLevel2.on('pointerout', function () {
            this.clearTint();
        })

        this.buttonLevel2.on('pointerdown', function (){
            this.scene.start('Nivel2')
        },this)
        //Reinicio de los valores a su estado inicial
        this.config.scoreTotal = 0;
        this.config.playerScore = 0;
        this.config.playerLife = 3;
    }
    
}

export default Menu