import React, { useState } from 'react'
import Nav from './Nav'
import "../styles/Juego.css"

export default function Juego() {
    const [countJugador1, setCountJugador1] = useState(0);
    const [countJugador2, setCountJugador2] = useState(0);
    const [eleccionJugador1, setEleccionJugador1] = useState(0);
    const [eleccionJugador2, setEleccionJugador2] = useState(0);
    const [resultado, setResultado] = useState("_");
    let ganador = "";

    //Funcion del boton Jugar
    function jugar() {
        setEleccionJugador2(Math.floor(Math.random() * 3))//Eleccion al azar del jugador2 o "maquina"
        ganador = (verificarGanador(eleccionJugador1, eleccionJugador2))
        setResultado(ganador)
        contadorJugadores()
        cambiarjugador2(eleccionJugador2)
    };
    //Funcion para ir aumentando el puntaje de los jugadores
    function contadorJugadores() {
        if (ganador == "Jugador1") {
            setCountJugador1(countJugador1 + 1)
        }
        else if (ganador == "Jugador2") {
            setCountJugador2(countJugador2 + 1)
        }
    }
    //Control del ganador
    function verificarGanador(jugador1, jugador2) {
        // 0 = Piedra, 1 = Tijeras, 2 = Papel
        if (jugador1 == 0 && jugador2 == 1) {
            return ("Jugador1")
        }
        else if (jugador1 == 1 && jugador2 == 2) {
            return ("Jugador1")
        }
        else if (jugador1 == 2 && jugador2 == 0) {
            return ("Jugador1")
        }
        else if (jugador1 == jugador2) {
            return ("Empate")
        }
        else {
            return ("Jugador2")
        }
    }
    //Funcion para cambiar la imagen segun sobre la que se clickeo y pasarle valores para la eleccion del jugador 1
    function cambiarJugador1(eleccion, key, alt) {
        document.getElementById("jugador1").src = eleccion;
        document.getElementById("jugador1").key = key;
        document.getElementById("jugador1").alt = alt;
        setEleccionJugador1(document.getElementById("jugador1").key)
    }

    /*Cambio de las imagenes y la eleccion del jugador 2 o "maquina"
    document.getElementByID() busca el elemento con la id que se le pase*/

    function cambiarjugador2(eleccionJugador2) {
        if (eleccionJugador2 == 0) {
            document.getElementById("jugador2").src = "../images/piedraPapelTijeras/piedra.png";
            document.getElementById("jugador2").alt = "piedra";
        }
        else if (eleccionJugador2 == 1) {
            document.getElementById("jugador2").src = "../images/piedraPapelTijeras/tijera.png";
            document.getElementById("jugador2").alt = "tijeras";
        }
        else {
            document.getElementById("jugador2").src = "../images/piedraPapelTijeras/papel.png";
            document.getElementById("jugador2").alt = "papel";
        }
    }

    return (

        <div className="bg-dark" style={{ height: "800px" }}>
            {Nav()}
            <div className="color_3 rounded w-25 mx-auto my-3" >
                <h3 className='text text-center text-info'>El ganador es:
                    <div className='text-center'>{resultado}</div>
                </h3>
            </div>
            <div className='d-flex wrap'>
                <div className="color_1 col rounded">
                    <h3 className='text-center text-success'>Puntaje: {countJugador1}</h3>
                    <h1 className='text-center text-success'>Jugador 1</h1>
                    <div>
                        <img src="../images/piedra.png" id="jugador1" alt="" key="0" className='d-block mx-auto' />
                    </div>
                    <h3 className='text-center text-success'>
                        Cambiar jugador 1
                    </h3>
                    <div className='text-center'>
                        {/* Aqui es posible cambiar la eleccion del jugador1 haciendo click en la imagen, 
                    se llama a la funcion cambiarJugador1 para pasar el src de la imagen asi como key que sirve
                    para pasar la eleccion para la logica del juego*/}
                        <img src="../images/piedraPapelTijeras/piedra.png" id="eleccion" alt='piedra' key="0" onClick={() => cambiarJugador1("../images/piedraPapelTijeras/piedra.png", 0, "piedra")} />
                        <img src="../images/piedraPapelTijeras/tijera.png" id="eleccion" alt='tijeras' key="1" onClick={() => cambiarJugador1("../images/piedraPapelTijeras/tijera.png", 1, "tijera")} />
                        <img src="../images/piedraPapelTijeras/papel.png" id="eleccion" alt='papel' key="2" onClick={() => cambiarJugador1("../images/piedraPapelTijeras/papel.png", 2, "papel")} />
                    </div>
                </div>
                <div className="col-4 color_3 ">
                    <h1 className='text-center text-info text-wrap rounded bg-dark' style={{marginLeft:"20%",marginRight:"20%"}}> Click para jugar</h1>
                    <div className='text-center'>
                        <button className='btn btn-primary btn-lg mx-auto' onClick={() => jugar()}>
                            <h3 className='text-dark'>JUGAR</h3>
                        </button>
                    </div>
                </div>
                <div className="color_2 col ">
                    <h3 className='text-center text-warning'>Puntaje: {countJugador2}</h3>
                    <h1 className='text-center text-warning'>Jugador 2</h1>
                    <div className='d-flex justify-content-center'>
                        <img src="../images/piedraPapelTijeras/piedra.png" id="jugador2" alt="jugador2" />
                    </div>
                </div>
            </div>
            <div className='color_4'> </div>
        </div>
    )
}