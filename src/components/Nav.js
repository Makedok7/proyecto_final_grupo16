import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className='col navbar justify-content-center bg-dark'>
            <ul className='d-flex list-inline my-auto py-2'>
                <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/' className='btn-principal wrap '>
                        <img src='./images/nav-Icons/home.png' alt="Home" className="navbar-brand mx-3" />
                    </Link>
                </li>
                <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/juego' className='btn-principal wrap'>
                        <img src='./images/nav-Icons/juego.png' alt="Juego" className="navbar-brand mx-3" />
                    </Link>
                </li>
                <li className='col bg-success rounded-pill mx-2'>
                    <Link to='/desarrolladores' className='btn-principal wrap'>
                        <img src='./images/nav-Icons/desarrolladores.png' alt="Desarrolladores" className="navbar-brand mx-3" />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
