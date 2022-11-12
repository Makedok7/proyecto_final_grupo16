import Phaser, { CANVAS } from 'phaser'
import React, { useEffect, useState } from 'react'
import Nav from '../Nav.js';
import Preload from './Preload.js';
import Play from './Play.js';
import Menu from './Menu.js';
import Nivel1 from './Nivel1.js';
import Nivel2 from './Nivel2.js';
import GameOver from './GameOver.js';
import Win from './Win.js';

export default function Juego() {
  const [listo, setListo] = useState(false)

  useEffect(() => {

    const CONFIGURACION = {
      type: Phaser.AUTO,
      scale: {
        width: 800,
        height: 600,
      },
      physics: {
        default: 'arcade',
        arcade: {
          //debug:true, //Muestra los colliders y los vectores 
          gravity: { y: 0 }
        }
      },
      parent: 'game',//Se designa como padre al componente con id:game, se usa para establecer el CANVAS del juego en un div
      //Variables Globales
      playerLvl: '',
      playerScore:0,
      scoreTotal:0,
      nextLvl: '',
      loseTime:'',
      winTime:0,
      enemySpeed: 0,
      enemyTimer:0,
      enemyDelay:0,
      
    }

    const Escenas = [Preload, Menu, Play, Nivel1, Nivel2, GameOver, Win]
    const crearEscena = Scene => new Scene(CONFIGURACION)
    const iniciarEscena = () => Escenas.map(crearEscena)

    var config = {
      ...CONFIGURACION,
      scene: iniciarEscena()
    };

    const game = new Phaser.Game(config);

    game.events.on("LISTO", setListo)

    return () => {
      setListo(false);
      game.destroy(true);
    }

  }, [listo]);

  return (
    <div className='bg-dark' style={{ height: "1000px" }}>
      {Nav()}
      <div id='game' className='text-center'></div>
      <div className='text-center'>
        <button type='button' className='btn btn-primary' onClick={() => setListo(true)}>Reset</button>
      </div>
    </div>)
}