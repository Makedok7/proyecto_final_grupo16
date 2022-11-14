import Square from "../Square/Square";
import './Board.css'
const Board = ({ squares, onClick, turn, winningSquares }) => { //se reciben las props

    const createSquares = values => (  //se crea la funcion con valores los cuales son mapeados a los elementos HTML
        values.map(value => (
            <Square
                winner={winningSquares.includes(value)} //se le asigna el valor de winningSquares a "winner"
                turn={turn} //se le pasa el turno actual
                onClick={() => onClick(value)}    //al hacer click en un cuadrado recibe el valor de este y se le asigna a X o O dependiendo quien juega
                value={squares[value]}     // se le pasa el valor del contenido del cuadrado al jugador actual
                key={`square_${value}`}  //interpolacion de value para que cada key sea unica para cada cuadrado
            />
        ))
    );

    return ( //se crea el tablero con valores
        <div className="boardTER">
            <div className="rowTER">
                {createSquares([0, 1, 2])}
            </div>
            <div className="rowTER">
                {createSquares([3, 4, 5])}
            </div>
            <div className="rowTER">
                {createSquares([6, 7, 8])}
            </div>

        </div>
    )

}

export default Board