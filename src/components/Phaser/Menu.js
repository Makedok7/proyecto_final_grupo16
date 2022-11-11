import Phaser from "phaser";

class Menu extends Phaser.Scene{

    constructor(config){
        super('Menu')
        this.config = config
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

        this.add.text(75, 10, "Evita la zona alrededor del agujero\nnegro y a los enemigos que aparecen,\n aguanta hasta el tiempo indicado.\n Presion A,D para rotar la nave y \n  W para avanzar hacia adelante, \n       SPACE para disparar.\nCada vez que el enemigo te golpee\nte ira acercando con mas fuerza\n     hacia el agujero negro.", { fontSize: '32px', fill: '#f9bb1d' });

        this.config.scoreTotal = 0;
        this.config.playerScore = 0;
    }
    
}

export default Menu