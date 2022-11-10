import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import "../styles/Juego.css"
import letras from '../json/letras.json'
import palabras from '../json/palabras.json'


export default function Juego() {

    const [palabraOriginal, setPalabraOriginal] = useState([])
    const [palabraEscondida, setPalabraEscondida] = useState([])
    const [palabraDescripcion, setPalabraDescripcion] = useState([])
    const [intentos, setIntentos] = useState(1)
    //El auxiliar se usa para tener un mejor control de los cambios del ahorcadito por los intentos y sus comprobaciones
    let auxiliarIntentos = 0 

    useEffect(() => {
        generarPalabra();
    }, []);

    function generarPalabra() {
        //Se elige una palabra al azar del json palabras y la asigna a palabraOriginal
        let numberRandom = [Math.floor(Math.random() * palabras.length)]
        let palabraRandom = Array.from(palabras[numberRandom].palabra)
        let descripcionRandom = Array.from(palabras[numberRandom].descripcion)
        setPalabraOriginal([...palabraRandom])
        setPalabraDescripcion([...descripcionRandom])
        //Manda la misma palabra elegida al azar
        esconderPalabra(palabraRandom)
        restablecerJuego()
    }

    function esconderPalabra(palabra) {
        //Convierte la palabra en un array lleno de "_"
        setPalabraEscondida(new Array(palabra.length).fill("_"))
    }

    function compararLetra(letra) {
        /*Compara si la palabraOriginal tiene la letra(enviada al apretar el boton con letra) 
        y va cambiando ambas palabras, asignando la letra a palabra escondida y elminandola de palabra original*/
        while (palabraOriginal.includes(letra)) {
            palabraEscondida[palabraOriginal.indexOf(letra)] = letra
            palabraOriginal[palabraOriginal.indexOf(letra)] = "_"
        }
        //Asigna a palabra escondida una copia de la palabra escondida modificada
        setPalabraEscondida([...palabraEscondida])
        cambiarBoton(letra)
        mostrarAhorcadito()
    }

    function comprobarResultado(auxiliarIntentos) {
        //Si la palabra escondida tiene puras letras, en ese caso se gana
        if (!palabraEscondida.includes("_") && palabraEscondida.length == palabraOriginal.length) {
            document.getElementById("resultado").className = "alert alert-success"
            document.getElementById("resultadoTexto").innerHTML = "GANASTE"
            desactivarBotones()
        }
        //En el caso de fallar 6 veces se pierde, los fallos los determina el boton en cambiarBoton()
        if (intentos == 6 && auxiliarIntentos == 6) {
            document.getElementById("resultado").className = "alert alert-danger"
            document.getElementById("resultadoTexto").innerHTML = "PERDISTE"
            desactivarBotones()
        }
    }

    function cambiarBoton(letra) {
        //Busca el boton por su id igual a la misma letra y lo deshabilita
        let boton = document.getElementById(letra)
        boton.disabled = true
        //Si la letra del boton es parte de la palabra escondida que se modifico en comprobarResultado() el boton cambia a verde
        if (palabraEscondida.includes(letra)) {
            boton.className = 'btn btn-success mx-1'
            //El auxiliar se resta en 1 para que la imagen no se cambie debido a una actualizacion de intentos
            auxiliarIntentos = intentos - 1 
        }
        //En caso contrario se cambia a rojo y se suma un intento
        else {
            boton.className = 'btn btn-danger mx-1'
            setIntentos(intentos + 1)
            //Se iguala para llevar un control de intentos
            auxiliarIntentos = intentos
        }
        //Se manda el auxiliar sobre el que se comprueba que esten en el mismo valor para determinar un resultado
        comprobarResultado(auxiliarIntentos)
    }

    function restablecerJuego() {
        //Devuelve todos los campos modificados a sus valores iniciales
        setIntentos(1)
        document.getElementById("ahorcadito").src = '../images/ahorcadito/0.png'
        document.getElementById("resultado").className = "alert alert-secondary"
        document.getElementById("resultadoTexto").innerHTML = "Resultado"
        //Se recorren los botones buscandolos por su id y se los devuelve a su valor inicial
        {
            letras.map((boton) => {
                document.getElementById(boton.letra).disabled = false
                document.getElementById(boton.letra).className = 'btn btn-info mx-1'
            }
            )
        }
    }

    function desactivarBotones(){
        //Se recorren los botones y se los desactiva
        {
            letras.map((boton) => {
                document.getElementById(boton.letra).disabled = true
            }
            )
        }
    }

    function mostrarAhorcadito() {
        //Cambia la imagen segun los intentos
        if (intentos <= 6) {
            let imagen = document.getElementById("ahorcadito")
            imagen.src = '../images/ahorcadito/' + auxiliarIntentos + '.png'
        }
    }

    return (
        <div className="bg-dark" style={{ height: "800px" }}>
            {Nav()}
            <div>
                <div className='alert alert-secondary' id='resultado'>
                    <h1 className='text-center' id='resultadoTexto'>Resultado</h1>
                </div>
                <div className='text-center'>
                    <img src='../images/ahorcadito/0.png' id='ahorcadito' alt='Ahorcadito' />
                </div>
                <h1 className='bg-dark text-center text-info'>
                    {palabraEscondida.join(" ")}
                </h1>
                <div>
                <h3 className='bg-dark text-center text-info'>
                    {palabraDescripcion}
                </h3>
                </div>
                <div className='text-center'>
                    <button type='button' className='btn btn-info ' onClick={() => generarPalabra()}>
                        Generar Palabra
                    </button>
                </div>
            </div>
            <div className='d-flex flex-wrap justify-content-center w-50 mx-auto my-3'>
                {letras.map((boton, i) =>
                    <button key={i} type="button" className="btn btn-info mx-1 " id={boton.letra} disabled={false} onClick={() => { compararLetra(boton.letra) }}>
                        {boton.letra}
                    </button>
                )}
            </div>
        </div>
    )
}