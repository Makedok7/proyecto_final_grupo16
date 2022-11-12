import { useState } from "react";
import "../components/TresEnRaya/TresEnRaya.css"
import Nav from "./Nav";
import Board from "./TresEnRaya/Board/Board.js";
import ScoreBoard from "./TresEnRaya/ScoreBoard/ScoreBoard";

const winningPositions = [  //posiciones ganadoras posibles a evaluar
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

const Juego = () => {
    const [turn,setTurn] = useState('X');   //se crea la funcion turno y se inicializa con "X"
    const [squares, setSquares] = useState(Array(9).fill(null));    //se crean el estado para los cuadrados y un array que se llena de nulos
    const [winningSquares, setWinningSquares] = useState([]);   //se crea el estado para el/los cuadrados ganadores
    const [score,setScore]=useState({  //se crea estado para el puntaje
        X: 0,  
        O: 0,
    });

    const handleClick = square =>{  //funcion click que recibe valores de los cuadrados que va a modificar 
        let newSquares = [...squares]; //variable que hace una copia de los cuadrados para modificarla
        newSquares.splice(square,1,turn); //se modifica la variable donde recibe el valor entre 1 a 8 (dependiendo donde el usuario clickea), y modifica el elemento en dicha posicion y le da el valor de turn (turno, ya sea X o O dependiendo quien esta jugando)
        setSquares(newSquares); // setea los nuevos cuadrados ya modificados dependiendo el avanze del juego
        checkForWinner(newSquares); //se llama a la funcion para verificar un ganador
    }
    
   

    const checkForWinner = newSquares =>{ 
        for (let i=0; i<winningPositions.length;i++){   //se crea un buqle "FOR" para checkear al ganador
            const [a,b,c] = winningPositions[i];  //desestructura cada posicion para guardar en variables distintas el valor ya sea X o O
        // se encuentra un ganador
            if(newSquares[a] && newSquares[a] === newSquares[b] && newSquares[a] === newSquares[c]){    //si el valor de A es distinto de nulo (nadie clickeo en el) y A es igual a B y A es igual a C , significa que hay un ganador
                endGame(newSquares[a], winningPositions[i]);    //se llama a la funcion endGame donde, se le pasa el ganador de los "newSquares" a "result" y a "winningposition" la linea/posicion ganadora
            return
            }
        }
        //se encuentra un empate
        if(!newSquares.includes(null)) { // funcion para verificar el empate, donde se checkea q ningun cuadrado sea nulo dentro de los nuevos cuadrados
            endGame(null, Array.from(Array(10).keys())); // se le pasa null a "result" y para "winningpositions" se crea un array de 10 elementos para animar los cuadrados del juego
            return
          }
          setTurn(turn === 'X' ? 'O' : 'X'); //se asigna a la funcion con un ternario donde "turn" si es igual a X, se cambia a "turn" por O, caso contrario se le asigna X (por que el contrario seria jugando actualmente O se le asigna X a "turn" que seria el siguiente jugador)
    }
    
  

    const endGame = (result, winningPositions) => { //funcion para finalizar el juego, donde recibe resultado y la posicion ganadora
        setTurn(null);  //se asigna al estado "turn" el valor nulo para q el usuario no pueda hacer click
        if(result !== null) { //si resultado es diferente de nulo (no hay empate)
          setScore({ 
            ...score,[result]: score[result] + 1, //se desestructura "score", se recibe el ganador de "result" y luego "score" recibe al ganador sumandole un punto a favor 
          })
        }
    setWinningSquares(winningPositions);    //se asigna a winningSquares la posicion ganadora
    setTimeout(reset,3000); //funcion para que luego de 3 segundos llame a la funcion "reset" 
    
}
    const reset = () => {   //funcion para resetear el juego
        setTurn('X');   //se le cambia a "turn" el valor null por X ,  
        setSquares(Array(9).fill(null)); //se asigna a los squares como al inicio, todos vacios inicialmente
        setWinningSquares([]); //se asigna un array vacio a winninSquares inicialmente
    }    

    return(  //se llama a Board y las funciones turn, squares y  handleClick. Tambien a scoreBoard 
        <div>
            {Nav()}
            <div className="containerTER">
                <ScoreBoard scoreO={score.O} scoreX={score.X} />
                <Board winningSquares={winningSquares} turn={turn} squares={squares} onClick={handleClick}/>
                
            </div>
        </div>

    );
}

export default Juego