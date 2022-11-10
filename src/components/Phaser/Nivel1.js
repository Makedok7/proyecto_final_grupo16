import Phaser from "phaser";

class Nivel1 extends Phaser.Scene {

    constructor(config) {
        super('Nivel1')
        this.config = config
    }

    create() {
        //Creacion del jugador
        this.player = this.physics.add.sprite(500,500)
        this.player.setCollideWorldBounds(true);
        //Creacion del agujero
        this.hole = this.physics.add.sprite(400,300)
        this.hole.setImmovable()
        this.hole.setData("force",1000)
        //Creacion de la zona alrededor del agujero
        this.holeZone = this.physics.add.sprite(this.hole.x,this.hole.y)
        this.holeZone.setScale(5)
        this.holeZone.setImmovable()
        //Creacion del grupo de enemigos
        this.enemies = this.physics.add.group();
        this.config.enemySpeed = 150;
        this.config.enemyTimer = 600
        this.config.enemyDelay = 3000

        this.config.playerLvl = 'Nivel1'
        
        this.scene.launch('Play',{player:this.player,hole:this.hole,holeZone:this.holeZone,enemies:this.enemies,physics:this.physics})
    }

}

export default Nivel1