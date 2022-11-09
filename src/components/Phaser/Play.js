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
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

        //Evento creacion de enemigos
        this.enemysEvent = this.time.addEvent({delay:1000,loop:true,callback:this.createEnemies,callbackScope:this})

        //UI Timer
        this.timerText = this.add.text(16,16,'Tiempo: ',{ fontSize: '32px', fill: '#FFF' })
        this.timer = null;

        //Configuracion Player
        this.physics.add.collider(this.player,this.hole,this.hitHolePlayer,null,this)
        this.player.setData("isStunned",false)
        this.player.setData("speed",100)
        this.player.setData("force",0)
    }

    update() {
        //Movimiento player
        this.playerMove()
        //Player hit
        if(this.player.getData("isStunned")){
            this.moveTo(this.player,this.hole,this.player.getData("force"))
        }
        else{
            this.player.setAcceleration(0)
        }

        //Timer
        this.timer += 1;
        this.timerText.setText('Tiempo: '+this.formatTime(this.timer))

        //Ememigos movimento
        if(this.enemies != null){
            this.enemies.children.each(function(enemy){

                if(enemy.getData("isChasingPlayer")){
                    this.moveTo(enemy,this.hole,this.hole.getData("speed"))
                }
                else{
                    this.moveTo(enemy,this.player,this.hole.getData("speed"))
                }

            },this)
        }
    }

    moveTo(obj1,obj2,speed){
        if(obj1 !=null){
            var angle = Math.atan2(obj2.y-obj1.y,obj2.x-obj1.x)
            obj1.rotation = angle + Phaser.Math.DegToRad(90)
            obj1.setAccelerationX(Math.cos(angle)*speed)
            obj1.setAccelerationY(Math.sin(angle)*speed)
        }
    }

    /*incrementSpeed(){
        let speed = this.hole.getData("speed");
        speed += speed
        console.log(speed)
        this.hole.setData("speed",speed)
    }*/

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

        if(this.keys.left.isDown && !this.player.getData("isStunned")){
            this.player.setVelocityX(-this.player.getData("speed"))
        }
        if(this.keys.right.isDown && !this.player.getData("isStunned")){
            this.player.setVelocityX(this.player.getData("speed"))
        }
        if(this.keys.up.isDown && !this.player.getData("isStunned")){
            this.player.setVelocityY(-this.player.getData("speed"))
        }
        if(this.keys.down.isDown && !this.player.getData("isStunned")){
            this.player.setVelocityY(this.player.getData("speed"))
        }
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
        enemy.setMaxVelocity(100,100)
        enemy.setData("isChasingPlayer",false)
        //this.physics.accelerateToObject(ball,this.hole,this.hole.getData("speed"),100,100)
        this.physics.add.collider(enemy,this.player,this.hitEnemyPlayer,null,this)
        this.physics.add.collider(enemy,this.hole,this.hitEnemyHole,null,this)
        this.physics.add.collider(enemy,this.holeZone,this.hitEnemyHoleZone,null,this)
        //this.physics.accelerateToObject(enemy,this.player,this.hole.getData("speed"),100,100)
    }

    hitEnemyHole(enemy,hole){
        enemy.destroy()
    }

    hitEnemyHoleZone(enemy,holeZone){
        enemy.setData("isChasingPlayer",true)
    }

}

export default Play