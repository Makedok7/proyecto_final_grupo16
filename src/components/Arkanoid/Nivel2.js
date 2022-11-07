import Phaser from "phaser";

class Nivel2 extends Phaser.Scene{

    constructor(config){
        super('Nivel2')
        this.config = config
        this.player = null;
        this.ball = null;
        this.bricks = null;
        this.scoreText = null;
        this.lifeText = null;
    }

    create(){
        this.physics.world.setBoundsCollision(true, true, true, false);
        //Creacion del personaje
        this.player = this.physics.add.sprite(400, 550, 'assets','player');
        this.player.body.allowGravity = false;
        this.player.setImmovable();
        this.player.setCollideWorldBounds(true);
        this.player.setData('hasBall', true);
        this.player.setScale(1.5)
        //Creacion de la pelota
        this.ball = this.physics.add.sprite(this.player.x, this.player.y - 24, 'assets','ball')
        this.ball.body.allowGravity = false;
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setScale(2.5);
        //Creacion de los ladrillos
        this.bricks = this.physics.add.staticGroup({
            key: 'assets',
            frame: ['brickBlue', 'brickOrange', 'brickGreen', 'brickRed'],
            frameQuantity: 8,
            setScale:{x:2,y:2},
            gridAlign: { width: 8, height: 4, cellWidth: 64, cellHeight: 32, x: 192 , y: 100 }
        })
        this.bricks.children.iterateLocal('setSize',64,32)
        //Actualizar valores de variables globales para las otras escenas
        this.config.playerLvl='Nivel2'
        this.config.nextLvl='Menu'
        this.config.scorePlayer = this.config.scoreTotal
        //Se ejecuta a la vez la escena Play y se pasan los datos para la escena play
        this.scene.launch('Play',{player:this.player,ball:this.ball,bricks:this.bricks,physics:this.physics})
    }

}

export default Nivel2