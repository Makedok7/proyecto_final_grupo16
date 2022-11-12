class Play extends Phaser.Scene {

    constructor(config) {
        super('Play')
        this.config = config;
    }

    create(data) {
        //Asignacion de los datos del nivel 
        this.player = data.player
        this.hole = data.hole
        this.holeZone = data.holeZone
        this.enemies = data.enemies
        this.bullets = data.bullets
        this.physics = data.physics

        //Fondo
        this.add.image(400, 300, 'background')
        
        //Asignacion de teclas 
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D', fire: 'SPACE' });

        //Evento creacion de enemigos
        this.enemiesEvent = this.time.addEvent({ delay: this.config.enemyDelay, loop: true, callback: this.createEnemies, callbackScope: this })

        //UI Timer
        this.timerText = this.add.text(550, 16, 'Tiempo: ', { fontSize: '32px', fill: '#1df9c3' })
        this.timer = null;

        //UI Texto
        this.scoreText = this.add.text(16, 16, 'Puntuacion: ' + this.config.playerScore, { fontSize: '32px', fill: '#1df9c3' });
        this.winText = this.add.text(550, 46, 'Win: ' + this.formatTime(this.config.winTime), { fontSize: '32px', fill: '#1df9c3' })

        //Configuracion Player
        this.physics.add.collider(this.player, this.hole, this.hitPlayerHole, null, this)
        this.physics.add.overlap(this.player, this.holeZone, this.hitPlayerHoleZone, null, this)
        this.player.setData("isStunned", false)
        this.player.setData("isShooting", false)
        this.player.setData("isInHoleZone", false)
        this.player.setData("speed", 150)
        this.player.setData("originalSpeed", this.player.getData("speed"))
        this.player.setData("speedRotation", 200)
        this.player.setData("force", 0)
        this.player.setData("bulletSpeed", 300)
        this.player.setData("shootCooldown", 300)
        this.config.playerScore = this.config.scoreTotal

        //Agregacion de sonidos
        this.sound.setVolume(0.1)
        this.shootSound = this.sound.add('shoot')
        this.stunSound = this.sound.add('stun')
        this.holeSound = this.sound.add('hole')
        this.hitEnemySound = this.sound.add('hitEnemy')
        this.playMusic = this.sound.add('playMusic').play()

        //Creacion de un enemigo inicial
        this.createEnemies()
    }

    update() {

        //JUGADOR

        //Movimiento del jugador
        this.playerMove()

        //Comprobacion del stun del jugador, si esta stuneado se acercara hacia el agujero
        if (this.player.getData("isStunned")) {
            this.moveTo(this.player, this.hole, this.player.getData("force"))
            this.player.setTint(0xff1900)
        }
        else {
            this.player.setAcceleration(0)
            this.player.clearTint();
        }

        //Comprobacion del disparo del jugador
        if (this.keys.fire.isDown && !this.player.getData("isShooting") && !this.player.getData("isStunned")) {
            this.shoot()
            this.player.setData("isShooting", true)
            //Creacion de un evento para que no se dispare repetidamente
            this.time.addEvent({ delay: this.player.getData("shootCooldown"), callback: this.recoveryShoot, callbackScope: this })
        }

        //UI

        //Actualizacion del timer y el texto del score
        this.timer += 1; //60 = 1 seg
        this.timerText.setText('Tiempo: ' + this.formatTime(this.timer))
        this.scoreText.setText('Puntuacion: ' + this.config.playerScore)

        //ENEMIGOS

        //Recorrido de enemies para el movimiento de los enemigos 
        if (this.enemies != null) {
            this.enemies.children.each(function (enemy) {
                if (enemy.getData("isChasingPlayer")) {
                    this.moveTo(enemy, this.player, this.config.enemySpeed)//Moviendose hacia el jugador
                }
                else {
                    this.moveTo(enemy, this.hole, this.config.enemySpeed * 0.7)//Moviendose hacial el agujero, queda atrapado en su zona
                }
            }, this)
        }

        //Funcion para crear enemigos cada cierto tiempo
        this.enemiesSpawnTime()

        //BALAS

        //Recorrido de las bullets 
        if (this.bullets != null) {
            this.bullets.children.each(function (bullet) {
                if (bullet.body.checkWorldBounds()) {//Choque contra los bordes de la pantalla
                    bullet.destroy()
                }
            }, this)
        }

        //OTROS

        //Comprobacion Victoria
        if (this.timer > this.config.winTime) {
            this.sound.stopAll();
            this.scene.stop(this.config.playerLvl)
            this.scene.stop()
            this.scene.start('Win')
        }
    }

    //----------------------FUNCIONES GENERALES----------------------

    //Funcion para mover un objeto hacia otro, aplicando aceleracion, 
    moveTo(obj1, obj2, speed) {
        if (obj1 != null) {
            var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x)//El angulo con respecto al eje positivo X y un punto
            obj1.rotation = angle
            obj1.setAccelerationX(Math.cos(angle) * speed)
            obj1.setAccelerationY(Math.sin(angle) * speed)
        }
    }

    //Funcion para mostrar un formato en minutos y segundos
    formatTime(seconds) {//Necesita recibir frames, 60 frames = 1 seg
        var minutes = Math.floor(seconds / 60);
        var partInSeconds = seconds % 60;
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        return `${minutes}:${partInSeconds}`;
    }

    //----------------------PLAYER----------------------

    //Movimiento del jugador
    playerMove() {
        this.player.setVelocity(0)
        this.player.setAngularVelocity(0)
        //Se va rotando el jugador segun la tecla que se presione
        if (this.keys.left.isDown && !this.player.getData("isStunned")) {
            this.player.setAngularVelocity(-this.player.getData("speedRotation"))
        }
        else if (this.keys.right.isDown && !this.player.getData("isStunned")) {
            this.player.setAngularVelocity(this.player.getData("speedRotation"))
        }
        //Se aplica la velocidad teniendo en cuenta el angulo y direccion del jugador, devuelve un vector
        if (this.keys.up.isDown && !this.player.getData("isStunned")) {
            this.physics.velocityFromAngle(this.player.angle, this.player.getData("speed"), this.player.body.velocity)
        }
    }

    //Funcion para retornar el estado del jugador cuando dispara, para volver a poder disparar
    recoveryShoot() {
        this.player.setData("isShooting", false)
    }

    //Funcion para recuperar la velocidad original del jugador
    playerRecoverySpeed() {
        this.player.setData("speed", this.player.getData("originalSpeed"))
        this.player.setData("isInHoleZone", false)
    }

    //Funcion para recuperar el estado original del jugador, y poder volver a moverse y disparar
    playerRecovery() {
        this.player.setData("isStunned", false)
    }

    //COLISIONES JUGADOR

    //Colision entre el jugador y el agujero, derrota del jugador
    hitPlayerHole() {
        this.sound.stopAll();
        this.config.loseTime = this.formatTime(this.timer)
        this.scene.stop(this.config.playerLvl)
        this.scene.stop()
        this.scene.start('GameOver')
    }

    //Colision entre el jugador y la zona del agujero, limita la velocidad del jugador
    hitPlayerHoleZone() {
        if (!this.player.getData("isInHoleZone")) {
            this.player.setData("isInHoleZone", true)
            this.time.addEvent({ delay: 300, callback: this.playerRecoverySpeed, callbackScope: this })//Evento para recuperar la vecocidad orignal de jugador
            this.player.setData("speed", this.player.getData("originalSpeed") * 0.7)
        }
    }

    //Colision entre el jugador y el enemigo, stuneo del jugador
    hitEnemyPlayer(enemy, player) {
        if (!this.player.getData("isStunned")) {//El estado de stun evita el movimiento y la posibildad de disparar
            this.player.setData("isStunned", true)
            this.time.addEvent({ delay: 1000, callback: this.playerRecovery, callbackScope: this })//Evento para recuperar el estado original
            this.player.setData("force", this.player.getData("force") + this.hole.getData("force"))//Cada vez sea stuneado aumenta la fuerza con la que se acerca hacia el agujero
            this.stunSound.play()
        }
        enemy.destroy()
    }

    //----------------------BALAS----------------------

    //Disparo del jugador y creacion de la bala
    shoot() {
        const bullet = this.bullets.create(this.player.x, this.player.y, 'assets', 'bullet')//Se agrega una bala al grupo bullets
        //Configuracion de la bala
        bullet.setScale(1.5)
        bullet.setSize(7, 7)
        bullet.angle = this.player.angle
        //Se crean los Colliders para sus respectivas colisiones
        this.physics.add.collider(bullet, this.hole, this.hitBulletHole, null, this)
        this.physics.add.collider(bullet, this.enemies, this.hitBulletEnemy, null, this)
        //Se aplica la velocidad teniendo en cuenta el angulo y una direccion, devuelve un vector
        this.physics.velocityFromAngle(this.player.angle, this.player.getData("bulletSpeed"), bullet.body.velocity)
        this.shootSound.play()
    }

    //COLISIONES BALAS

    //Colision entre la bala y el agujero, destruccion de la bala 
    hitBulletHole(bullet, holeZone) {
        bullet.destroy()
    }

    //Colision entre la bala y el enemigo, destruccion de la bala y el enemigo 
    hitBulletEnemy(bullet, enemies) {
        bullet.destroy()
        enemies.destroy()
        this.config.playerScore += 10;//Aumento del score
        this.hitEnemySound.play()
    }

    //----------------------ENEMIGOS----------------------

    //Funcion para crear la creacion de enemigos
    createEnemies() {
        const enemy = this.enemies.create(Phaser.Math.RND.between(0, 800), Phaser.Math.RND.between(0, 600), 'assets', 'enemy')//Agrega un enemigo al grupo enemies
        //Configuracion del enemigo
        enemy.body.setImmovable()
        enemy.setCollideWorldBounds(true);
        enemy.setMaxVelocity(this.config.enemySpeed, this.config.enemySpeed)
        enemy.setData("isChasingPlayer", true)
        enemy.setSize(16, 16)
        enemy.setScale(1.5)
        enemy.setFlipX(true)
        //Se crean los Colliders para sus respectivas colisiones
        this.physics.add.collider(enemy, this.player, this.hitEnemyPlayer, null, this)
        this.physics.add.collider(enemy, this.hole, this.hitEnemyHole, null, this)
        this.physics.add.collider(enemy, this.holeZone, this.hitEnemyHoleZone, null, this)
    }

    //Funcion para ir creando enemigos cada cierto tiempo, timer:60 = 1 seg
    enemiesSpawnTime() {
        if (Number.isInteger(this.timer / this.config.enemyTimer)) {//Comprueba si el timer divido el enemyTimer es un numero entero 
            let delay = this.config.enemyDelay * 0.6//El delay de los enemigos se va reduciendo, delay:ms
            this.config.enemyDelay = delay
            this.enemiesEvent.reset({ delay: delay, loop: true, callback: this.createEnemies, callbackScope: this })//Actualizacion del evento que crea enemigos
        }
    }

    //COLISIONES ENEMIGOS

    //Colision enemigos y el agujero, destruccion del enemigo
    hitEnemyHole(enemy, hole) {
        enemy.destroy()
        this.holeSound.play()
    }

    //Colision entre la zona y el agujero, cambia el color y el estado del enemigo, queda atrapado en la zona
    hitEnemyHoleZone(enemy, holeZone) {
        enemy.setTint(0xf9d21d)
        enemy.setData("isChasingPlayer", false)
    }
}

export default Play