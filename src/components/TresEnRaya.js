import { useState } from "react";
import "../components/TresEnRaya/TresEnRaya.css"
import Board from "./TresEnRaya/Board/Board.js";

const Juego = () => {
    const [turn,setTurn] = useState('X');   //se crea la funcion turno y se inicializa con "X"
    const [squares, setSquares] = useState(Array(9).fill(null));    //se crean los cuadrados y un array que se llena de nulos
    const [score,setScore]=useState({  //se crea la funcion score
        X: 0,
        Y: 0,
    });
    
    const handleClick = square =>{  //funcion click que recibe valores de los cuadrados que va a modificar 
        let newSquares = [...squares]; //variable que hace una copia de los cuadrados para modificarla
        newSquares.splice(square,1,turn); //se modifica la variable donde recibe el valor entre 1 a 8 (dependiendo donde el usuario clickea), y modifica el elemento en dicha posicion y le da el valor de turn (turno, ya sea X o O dependiendo quien esta jugando)
        setSquares(newSquares); // setea los nuevos cuadrados ya modificados dependiendo el avanze del juego
        checkForWinner(newSquares); //se llama a la funcion para verificar un ganador
    }

    const checkForWinner = squares =>{ 
        setTurn(turn==='X'? 'O':'X'); //se asigna a la funcion con un ternario donde "turn" si es igual a X, se cambia a "turn" por O, caso contrario se le asigna X (por que el contrario seria jugando actualmente O se le asigna X a "turn" que seria el siguiente jugador)
    }
    
    return(  //se llama a Board y las funciones turn, squares y handleClick
        <div className="containerTER">
            <Board turn={turn}squares={squares} onClick={handleClick}/> 
        </div>
    );
}

export default Juego