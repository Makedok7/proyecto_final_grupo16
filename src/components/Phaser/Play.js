class Play extends Phaser.Scene{

    constructor(config){
        super('Play')
        this.config = config;
    }

    create(data){
        //Asignacion de los datos del nivel 
        this.player = data.player
        this.hole = data.hole
        this.holeZone = data.holeZone
        this.enemies = data.enemies
        this.physics = data.physics

        //Asignacion de teclas 
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' ,fire: 'SPACE'});

        //Evento creacion de enemigos
        this.enemiesEvent = this.time.addEvent({delay:this.config.enemyDelay,loop:true,callback:this.createEnemies,callbackScope:this})

        //UI Timer
        this.timerText = this.add.text(16,16,'Tiempo: ',{ fontSize: '32px', fill: '#FFF' })
        this.timer = null;

        //Configuracion Player
        this.physics.add.collider(this.player,this.hole,this.hitHolePlayer,null,this)
        this.player.setData("isStunned",false)
        this.player.setData("isShooting",false)
        this.player.setData("speed",150)
        this.player.setData("speedRotation",150)
        this.player.setData("force",0)
        this.player.setData("bulletSpeed",150)
        this.player.setData("shootCooldown",300)

        //this.playerPoint = this.add.circle(this.player.x,this.player.y,10, 0xffffff, 1).setScale(0.5)

        //this.createEnemies()
    }

    update() {
        //Movimiento player
        this.playerMove()
        //this.shootPoint()
        //Player hit
        if(this.player.getData("isStunned")){
            this.moveTo(this.player,this.hole,this.player.getData("force"))
        }
        else{
            this.player.setAcceleration(0)
        }

        //Player Shoot
        if(this.keys.fire.isDown && !this.player.getData("isShooting")){
            console.log(this.player.rotation)
            this.shoot()
            this.player.setData("isShooting",true)
            this.time.addEvent({delay:this.player.getData("shootCooldown"),callback:this.recoveryShoot,callbackScope:this})
        }

        //Timer
        this.timer += 1;
        this.timerText.setText('Tiempo: '+this.formatTime(this.timer))

        //Ememigos movimento
        if(this.enemies != null){
            this.enemies.children.each(function(enemy){

                if(enemy.getData("isChasingPlayer")){
                    this.moveTo(enemy,this.player,this.config.enemySpeed)
                }
                else{
                    this.moveTo(enemy,this.hole,this.config.enemySpeed)
                }

            },this)
        }
        //Enemigos timer spawn
        this.enemiesSpawnTime()
    }

    /*shootPoint(){
        var angle = Math.atan2(this.player.y,this.player.x)
        this.playerPoint.setPosition(this.player.x,this.player.y)
    }*/

    moveTo(obj1,obj2,speed){
        if(obj1 !=null){
            var angle = Math.atan2(obj2.y-obj1.y,obj2.x-obj1.x)
            obj1.rotation = angle + Phaser.Math.DegToRad(90)
            obj1.setAccelerationX(Math.cos(angle)*speed)
            obj1.setAccelerationY(Math.sin(angle)*speed)
        }
    }

    enemiesSpawnTime(){
        
        if(Number.isInteger(this.timer/this.config.enemyTimer)){
            let delay = this.config.enemyDelay*0.6
            this.config.enemyDelay = delay
            this.enemiesEvent.reset({delay:delay,loop:true,callback:this.createEnemies,callbackScope:this})
            console.log(this.timer)
            console.log(this.config.enemyDelay)
        }
    }

    formatTime(seconds){
        var minutes = Math.floor(seconds/60);
        var partInSeconds = seconds%60;
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        return `${minutes}:${partInSeconds}`;
    }

    //---------------PLAYER----------

    //Movimiento del jugador
    playerMove(){
        this.player.setVelocity(0)
        this.player.setAngularVelocity(0)

        if(this.keys.left.isDown && !this.player.getData("isStunned")){
            //this.player.setVelocityX(-this.player.getData("speed"))
            this.player.setAngularVelocity(-this.player.getData("speedRotation"))
        }
        else if(this.keys.right.isDown && !this.player.getData("isStunned")){
            //this.player.setVelocityX(this.player.getData("speed"))
            this.player.setAngularVelocity(this.player.getData("speedRotation"))
        }
        if(this.keys.up.isDown && !this.player.getData("isStunned")){
            //this.player.setVelocityY(-this.player.getData("speed"))
            this.physics.velocityFromAngle(this.player.angle,this.player.getData("speed"),this.player.body.velocity)
        }
        /*if(this.keys.down.isDown && !this.player.getData("isStunned")){
            //this.player.setVelocityY(this.player.getData("speed"))
            this.physics.velocityFromAngle(this.player.angle,-this.player.getData("speed"),this.player.body.velocity)
        }*/
    }

    shoot(){
        console.log("shoot")
        const bullet = this.physics.add.sprite(this.player.x,this.player.y,'').setScale(0.5)
        const bulletDirection = this.physics.velocityFromAngle(this.player.angle,this.player.getData("bulletSpeed"),bullet.body.velocity)
        this.moveTo(bullet,bulletDirection.x,bulletDirection.y)
        this.physics.add.collider(bullet,this.enemies,this.hitBulletEnemy,null,this)
    }
    recoveryShoot(){
        this.player.setData("isShooting",false)
    }

    hitBulletEnemy(bullet,enemies){
        bullet.destroy()
        enemies.destroy()
        console.log("hitBullet")
    }

    hitHolePlayer(){
        this.scene.stop(this.config.playerLvl)
        this.scene.stop()
        this.scene.start('GameOver')
        console.log("hitHole")
    }

    hitEnemyPlayer(enemy,player){
        console.log("hitPlayer")
        if(!this.player.getData("isStunned")){
            this.player.setData("isStunned",true)
            this.time.addEvent({delay:1000,callback:this.playerRecovery,callbackScope:this})
            this.player.setData("force",this.player.getData("force")+this.hole.getData("force"))
        }
        enemy.destroy()
    }
    
    playerRecovery(){
        this.player.setData("isStunned",false)
    }

    //-------ENEMIGOS--------------

    createEnemies(){
        const enemy = this.enemies.create(Phaser.Math.RND.between(0,800),Phaser.Math.RND.between(0,600),'')
        enemy.body.setImmovable()
        enemy.setCollideWorldBounds(true);
        enemy.setMaxVelocity(this.config.enemySpeed,this.config.enemySpeed)
        enemy.setData("isChasingPlayer",true)
        
        this.physics.add.collider(enemy,this.player,this.hitEnemyPlayer,null,this)
        this.physics.add.collider(enemy,this.hole,this.hitEnemyHole,null,this)
        this.physics.add.collider(enemy,this.holeZone,this.hitEnemyHoleZone,null,this)

    }

    hitEnemyHole(enemy,hole){
        enemy.destroy()
    }

    hitEnemyHoleZone(enemy,holeZone){
        enemy.setData("isChasingPlayer",false)
    }



}

export default Play