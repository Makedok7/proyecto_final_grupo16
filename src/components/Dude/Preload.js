import Phaser from "phaser";

class Preload extends Phaser.Scene {

    constructor() {
        super('Preload')
    }
    //carga de imagenes y musica
    preload() {
        //ruta de audio
        this.load.setPath('../audio/phaser')

        this.load.audio('musica', 'mainTheme.mp3');
        //ruta de imagenes
        this.load.setPath('../images/dude');

        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.image('bomb', 'bomb.png');
        this.load.spritesheet('dude', 'dude.png',
            { frameWidth: 32, frameHeight: 48 });
        //debugger;
    }

    create() {
        this.scene.start('Escena')
    }
}

export default Preload;