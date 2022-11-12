import Phaser from "phaser";

class Nivel1 extends Phaser.Scene {

    constructor(config) {
        super('Nivel1')
        this.config = config
    }

    create() {
        //Creacion del jugador
        this.player = this.physics.add.sprite(400,500,'assets','player')
        this.player.setSize(16,16)
        this.player.setScale(1.5)
        this.player.setCollideWorldBounds(true);
        //Creacion del agujero
        this.hole = this.physics.add.sprite(400,300,'assets','hole')
        this.hole.setImmovable()
        this.hole.setData("force",1000)
        this.hole.setBlendMode('ERASE')
        //Creacion de la zona alrededor del agujero
        this.holeZone = this.physics.add.sprite(this.hole.x,this.hole.y)
        this.holeZone.setScale(6)
        this.holeZone.setImmovable()
        this.holeZoneParticle = this.add.particles('assets','player')
        this.circleZoneParticle = new Phaser.Geom.Circle(this.hole.x, this.hole.y, 120);
        this.emitterHoleZone = this.holeZoneParticle.createEmitter({
            frame: { frames: [ 'meteorite1', 'meteorite2', 'meteorite3' ], cycle: true,quantity:2},
            moveToX:this.hole.x,
            moveToY:this.hole.y,
            lifespan:1000,
            frequency:100,
            alpha:0.4,
            tint: [ 0x3c1a04, 0x8b5406, 0x785c14 ],
            quantity:4,
            blendMode:'',
            scale: { start: 0.5, end: 0.1 },
            emitZone: { source: this.circleZoneParticle, type: 'edge', quantity: 16 }
        })
        //Creacion del grupo de enemigos
        this.enemies = this.physics.add.group();
        this.config.enemySpeed = 150;
        this.config.enemyTimer = 600 
        this.config.enemyDelay = 3000 //ms
        //Creacion del grupo de balas
        this.bullets = this.physics.add.group()
        //Configuracion del nivel
        this.config.playerLvl = 'Nivel1'
        this.config.nextLvl = 'Nivel2'
        this.config.winTime = 3000 //60 = 1seg
        
        this.scene.launch('Play',{player:this.player,hole:this.hole,holeZone:this.holeZone,enemies:this.enemies,bullets:this.bullets,physics:this.physics})
    }

}

export default Nivel1