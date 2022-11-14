import './ScoreBoard.css'

const ScoreBoard = ({ scoreX, scoreO }) => ( //funcion para devolver un componente de tipo score para X y O, por eso se usan parentesis
    <div className="score-boardTER">
        <div>{scoreX}</div>
        <div>{scoreO}</div>
    </div>
)

export default ScoreBoard;