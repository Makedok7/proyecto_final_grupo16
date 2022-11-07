import Phaser from "phaser";

class Play extends Phaser.Scene{

    constructor(config){
        super('Play')
        this.config = config;
    }

    create(data){
        //Fondo
        this.add.image(400,300,'background')
        //Se asignan los valores recibidos para usarlos en la escena
        this.player = data.player
        this.ball = data.ball
        this.bricks = data.bricks
        this.physics = data.physics
        //Colidders
        this.physics.add.collider(this.ball, this.player, this.hitPlayer, null, this);
        this.physics.add.collider(this.ball, this.bricks, this.hitBricks, null, this);
        //Score y vida del jugador
        this.scoreText = this.add.text(16, 16, 'Puntuacion: ' + this.config.playerScore, { fontSize: '32px', fill: '#FFF' });
        this.lifeText = this.add.text(650, 16, 'Vidas: ' + this.config.playerLife, { fontSize: '32px', fill: '#FFF' });
    }

    update() {

        this.scoreText.setText('Puntuacion:' + this.config.playerScore)
        this.lifeText.setText('Vidas:' + this.config.playerLife)

        if (this.player.getData('hasBall')) {
            this.ball.x = this.player.x
        }
        //Movimiento del jugador al donde se encuentra el mouse
        this.input.on('pointermove', function (pointer) {
            this.player.x = pointer.x;
        }, this);
        //Lanzamiento de la pelota cuando esta con el jugador
        this.input.on('pointerdown', function (pointer) {
            if (this.player.getData('hasBall')) {
                this.ball.setVelocity(Phaser.Math.RND.sign() * 75, -400)
                this.player.setData('hasBall', false)
            }
        }, this);
        //Perdidad de una vida si la pelota se pierde del limite inferior
        if (this.ball.y > 600) {
            this.resetBall();
            this.config.playerLife -= 1
        }
        //Derrota
        if(this.config.playerLife == 0){
            this.scene.stop(this.config.playerLvl)
            this.scene.stop()
            this.scene.start('GameOver')
        }
        //Victoria
        if (this.bricks.countActive() == 0) {
            this.scene.stop(this.config.playerLvl)
            this.scene.stop()
            this.scene.start('Win')
        }
    }
    //Funcion para la colision del jugador con la pelota
    hitPlayer() {
        var distance = 20
        if (this.ball.x < this.player.x) {
            distance = this.player.x - this.ball.x
            this.ball.setVelocityX(distance*-5)
        }
        else if (this.ball.x > this.player.x) {
            distance = this.ball.x - this.player.x 
            this.ball.setVelocityX(distance*5)
        }
    }
    //Funcion para la colision entre la pelota y los bloques
    hitBricks(ball, brick) {
        brick.disableBody(true, true)
        this.config.playerScore += 10
    }
    
    resetBall() {
        this.ball.setVelocity(0)
        this.ball.setPosition(this.player.x, this.player.y - 24)
        this.player.setData('hasBall', true)
    }
}

export default Play