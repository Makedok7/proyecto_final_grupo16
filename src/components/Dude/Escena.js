import Phaser from "phaser";

class Escena extends Phaser.Scene {
    constructor(config) {
        super('Escena')
        this.config = config
    }
    platforms = null;
    player = null;
    cursor = null;
    stars = null;
    score = 0;
    scoreText = null;
    //bombs=null;
    //gameOver=false;  
    create() {
        //crear fondo
        this.add.image(400, 300, 'sky');
        //crear plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground')
        this.platforms.create(50, 250, 'ground')
        this.platforms.create(750, 220, 'ground')
        //se crea el texto del puntaje
        this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontSize: '50px', fontStyle: 'italic', fill: 'black' });
        //se agrega al player
        this.player = this.physics.add.sprite(100, 250, 'dude');
        //se agrega rebote y colision
        //this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        //se crea movimiento a usar en el uptade
        this.anims.create({ //izquierda
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({ //iddle, standby o modo espera
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        })
        this.anims.create({ //derecha
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })

        //se crea cursor para q responda los eventos del teclado
        this.cursor = this.input.keyboard.createCursorKeys();
        //se agregan las estrellas
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 9,
            setXY: { x: 12, y: 0, stepX: 85 }
        })
        //se crea un rebote distinto para cada estrella
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        //colision player contra la plataforma
        this.physics.add.collider(this.player, this.platforms);
        //colision estrella con jugador
        this.physics.add.collider(this.stars, this.platforms);
        //desaparecen las estrellas al colisionar con el jugador
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        //se agregan las bombas
        this.bombs = this.physics.add.group({
            key: 'bomb',
            repeat: 3,
            setXY: { x: 50, y: 0, stepX: 210, stepY: 150 }
        });
        //colision bombas con plataforma
        this.physics.add.collider(this.bombs, this.platforms);
        //colision jugador con bombas
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.bombs.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(1, 1, 5));
        });
        //se le agrega musica
        this.sonido = this.sound.add('musica');
        const soundConfig = {
            volume: 1,
            loop: true
        }
        //inicia la musica
        this.sonido.play(soundConfig)
    }
    update() {
        //movimiento con el teclado
        if (this.cursor.left.isDown) {
            this.player.setVelocityX(-150);
            this.player.anims.play('left', true);
        } else
            if (this.cursor.right.isDown) {
                this.player.setVelocityX(150);
                this.player.anims.play('right', true);
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play('turn')
            }
        //si esta en el suelo y toca tecla para arriba
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-350);
        }
    }
    //funcion de colision entre jugador y star , si ocurre la colision se suma 10 al puntaje del jugador
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('SCORE: ' + this.score);
        //funcion para que al atrapar todas las estrellas , vuelvan a caer nuevamente
        if (this.stars.countActive(true) === 0) { //verifica si las estrellas son igual a 0 (osea no hay ninguna)
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

        }
    }
    //funcion para que el juego termine cuando el jugador colisiona con una bomba
    hitBomb(player, bomb, soundConfig) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;

        this.sonido.stop(soundConfig);
    }


}
export default Escena;