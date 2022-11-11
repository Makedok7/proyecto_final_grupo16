import Nav from './Nav'
import "../styles/Juego.css"
import { Link } from 'react-router-dom';

export default function Juego() {

    return (
        <div className="bg-dark" style={{ height: "800px" }}>
            {Nav()}
            <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/piedraPapelTijeras' className='btn-principal wrap'>
                        PiedraPapelTijeras
                    </Link>
            </li>
            <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/ahorcadito' className='btn-principal wrap'>
                        Ahorcadito
                    </Link>
            </li>
            <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/arkanoid' className='btn-principal wrap'>
                        Arkanoid
                    </Link>
            </li>
            <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/phaserGame' className='btn-principal wrap'>
                        Phaser
                    </Link>
            </li>
            <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/tateti' className='btn-principal wrap'>
                        TaTeTi
                    </Link>
            </li>

            <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/tresenraya' className='btn-principal wrap'>
                        TresEnRaya
                    </Link>
            </li>
        </div>
    )
}