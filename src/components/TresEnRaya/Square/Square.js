import './Square.css'
import classNames from 'classnames'; // se agrega una biblioteca llamada "classnames" para trabajar mejor con clases (se instala con el comando "npm i --save classnames")

const Square = ({ value, onClick, turn, winner }) => { //se reciben las props

    const handleClick = () => {
        (turn !== null && value === null) && onClick(); // si turno es distinto de nulo (osea alguien esta jugando) y valor es nulo (del cuadrado donde clikea el usuario), se llama a la funcion onClick para modificarlo 
    }

    let squareClass = classNames({ //funcion para animar a los cuadrados (squares) , gracias a la biblioteca "classnames"
        square: true,
        [`square--${value}`]: value !== null,
        winner: winner,
    });


    return (
        <div className={squareClass} onClick={() => handleClick()}>

        </div>
    )
}

export default Square;