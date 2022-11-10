import Phaser from "phaser";

class Win extends Phaser.Scene{

    constructor(config){
        super('Win')
        this.config = config
        this.button = null
        this.text = null
    }
    create(){
        //Fondo
        this.add.image(400,300,'win')
        //Botones
        this.buttonNext = this.add.sprite(400,500,'buttons','next').setInteractive()
        this.buttonMenu = this.add.sprite(400,550,'buttons','menu').setInteractive()
        this.buttonNext.setScale(1.5)
        this.buttonMenu.setScale(1.5)
        //Animaciones Simples
        this.buttonNext.on('pointerover',function(){
            this.setTint(0x094293)
        })

        this.buttonNext.on('pointerout', function () {
            this.clearTint();
        })

        this.buttonNext.on('pointerdown', function (){
            this.scene.start(this.config.nextLvl)
        },this)

        this.buttonMenu.on('pointerover',function(){
            this.setTint(0x094293)
        })

        this.buttonMenu.on('pointerout', function () {
            this.clearTint();
        })

        this.buttonMenu.on('pointerdown', function (){
            this.scene.start('Menu')
        },this)
        //Actualizacion del score para que se siga sumando a medida que se pasan niveles
        this.config.scoreTotal += this.config.playerScore
    }
}

export default Win