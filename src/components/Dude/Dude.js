import Phaser from 'phaser';
import { useState, useEffect } from 'react';
import Preload from './Preload';
import Escena from './Escena';
import Nav from '../Nav';

function Juego() {

    //Uso de state de nombre "listo" para que los lienzos no se acumulen
    const [listo, setListo] = useState(false);
    //Uso del hook para que renredice acciones que react no hace
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                }
            },
            parent:'game',

            scene: [Preload, Escena]

        };

        //inicia el juego
        const game = new Phaser.Game(config);

        // Trigger para cuando el juego esta completamente listo
        game.events.on("LISTO", setListo);

        // para evitar que el lienzo o juego se multiplique
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
export default Juego;