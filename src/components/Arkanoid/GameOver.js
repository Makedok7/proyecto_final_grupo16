import Phaser from "phaser";

class GameOver extends Phaser.Scene{

    constructor(config){
        super('GameOver')
        this.config = config
        this.text = null
    }
    create(){
        //Fondo
        this.add.image(400,300,'gameOver')
        //Botones
        this.buttonReset = this.add.sprite(400,500,'buttons','reset').setInteractive()
        this.buttonMenu = this.add.sprite(400,550,'buttons','menu').setInteractive()
        this.buttonReset.setScale(1.5)
        this.buttonMenu.setScale(1.5)
        //Animaciones Simples
        this.buttonReset.on('pointerover',function(){
            this.setTint(0x094293)
        })

        this.buttonReset.on('pointerout', function () {
            this.clearTint();
        })

        this.buttonReset.on('pointerdown', function (){
            this.scene.start(this.config.playerLvl)
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
        //Reinicio de los valores a su estado inicial
        this.config.playerLife = 3
        this.config.playerScore = this.config.scoreTotal
    }
}

export default GameOver