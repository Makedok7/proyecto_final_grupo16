import Phaser from "phaser";

class Preload extends Phaser.Scene{

    constructor(){
        super('Preload')
    }

    preload() {
        //Ruta de las imagenes
        this.load.setPath('../images/arkanoid');
        //Carga de las imagenes
        this.load.image('background', 'background.png');
        this.load.image('menu', 'menu.png');
        this.load.image('gameOver', 'gameOver.jpg');
        this.load.image('win', 'win.jpg');
        this.load.image('level1', 'level1.png');
        this.load.image('level2', 'level2.png');
        //Carga de atlas de imagenes
        this.load.atlas('assets','assets.png','assets.json')
        this.load.atlas('buttons','buttons.png','buttons.json')
    }

    create(){
        this.scene.start('Menu')
    }
    
}

export default Preload