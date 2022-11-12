import Phaser from "phaser";

class Preload extends Phaser.Scene{

    constructor(){
        super('Preload')
    }

    preload() {
        //Ruta de las imagenes
        this.load.setPath('../images/phaser');

        //Carga de las imagenes
        this.load.image('background', 'background.png');
        this.load.image('menu', 'menu.jpg');
        this.load.image('gameOver', 'gameOver.jpg');
        this.load.image('win', 'win.jpg');
        this.load.image('level1', 'level1.png');
        this.load.image('level2', 'level2.png');

        //Carga de atlas de imagenes
        this.load.atlas('assets','assets.png','assets.json')
        this.load.atlas('buttons','buttons.png','buttons.json')

        //Ruta de los sonidos 
        this.load.setPath('../audio/phaser')

        //Carga de los sonidos
        this.load.audio('shoot','shoot.wav')
        this.load.audio('gameOver','gameOver.wav')
        this.load.audio('stun','stun.wav')
        this.load.audio('hitEnemy','hitEnemy.wav')
        this.load.audio('hole','hole.wav')
        this.load.audio('win','win.wav')
        this.load.audio('menuMusic','menuMusic.mp3')
        this.load.audio('playMusic','playMusic.mp3')

    }

    create(){
        this.scene.start('Menu')
    }
    
}

export default Preload