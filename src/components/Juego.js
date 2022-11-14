import Nav from './Nav'
import "../styles/Juego.css"
import { Link } from 'react-router-dom';

export default function Juego() {

    return (
        <div className="bg-dark" style={{ height: "auto" }}>
            {Nav()}
            <div className='card-group py-5 wrap col rounded bg-primary bg-opacity-25'>
                <div className='card bg-dark mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/piedraPapelTijeras/logo.jpeg' alt="piedraPapelTijeras" className="w-50 my-3 rounded" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold text-info">PIEDRA PAPEL O TIJERAS</h5>
                        <p className="card-text text-center fst-italic fw-bold">
                            <li className='list-group-item list-group-item-success rounded my-2'>Piedra gana a Tijeras</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Tijeras gana a Papel</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Papel gana a Piedra</li>
                        </p>
                        <Link to='/piedraPapelTijeras' className='btn btn-info wrap fw-bold'>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-dark mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/ahorcadito/logo.png' alt="piedraPapelTijeras" className="w-50 my-3 rounded" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold text-info">AHORCADITO</h5>
                        <p className="card-text text-center fst-italic fw-bold">
                            <li className='list-group-item list-group-item-success rounded my-2'>Se mostrarán pistas de una palabra, y tienes que adivinar cuál es (LETRA por LETRA).</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Debes indicar una letra a la vez.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Si elijes una letra que no existe en la palabra, entonces perderás una oportunidad.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Cada vez que falles al elegir una letra, se dibujará una parte de una figura.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Si fallas los suficiente, la figura se completará y PERDERÁS!</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Si logras adivinar todas las letras de la palabra, entonces GANARÁS!</li>
                        </p>
                        <Link to='/ahorcadito' className='btn btn-info wrap fw-bold'>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-dark mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/arkanoid/logo.png' alt="piedraPapelTijeras" className="w-50 my-3 rounded" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold text-info">ARKANOID</h5>
                        <p className="card-text text-center fst-italic fw-bold">
                            <li className='list-group-item list-group-item-success rounded my-2'>Con el ratón moverás la barra hacia los lados con el fin de recoger la pelota en su caída y hacerla subir de nuevo.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>El objetivo de este juego es romper todos los ladrillos que se encuentran en la parte superior, cuando limpies la pantalla pasarás de nivel y así sucesivamente.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Cuentas con tres vidas, así que no te duermas en los laureles y muévete rápido para recogerla.</li>
                        </p>
                        <Link to='/arkanoid' className='btn btn-info wrap fw-bold'>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-dark mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/phaser/menu.jpg' alt="piedraPapelTijeras" className="w-50 my-3 rounded" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold text-info">JUEGO PHASER</h5>
                        <p className="card-text text-center fst-italic fw-bold">
                            <li className='list-group-item list-group-item-success rounded my-2'>Evita la zona alrededor del agujero negro y a los enemigos que aparecen, aguanta hasta el tiempo indicado.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Presion A,D para rotar la nave y W para avanzar hacia adelante, SPACE para disparar.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Cada vez que el enemigo te golpee te ira acercando con mas fuerza hacia el agujero negro.</li>
                        </p>
                        <Link to='/phaserGame' className='btn btn-info wrap fw-bold'>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-dark mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/tresEnRaya/logo.jpg' alt="piedraPapelTijeras" className="w-50 my-3 rounded" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold text-info">TRES EN RAYA</h5>
                        <p className="card-text text-center list-group fst-italic fw-bold">
                            <li className='list-group-item list-group-item-success rounded my-2'>El primer jugador coloca la ficha en cualquiera de los casilleros del tablero.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>El segundo hará lo mismo con su primera ficha.</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Se continúa las otras jugadas respetando los turnos, si el jugador consigue alinear tres marcas del mismo tipo, ese jugador hace tres en raya.</li>
                        </p>
                        <Link to='/tresenraya' className='btn btn-info wrap fw-bold '>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-dark mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/dude/dude.jpg' alt="piedraPapelTijeras" className="w-50 my-3 rounded" />
                    </div>
                    <div className="card-body text-center">
                        <h5 className="card-title fw-bold text-info">Dude Game</h5>
                        <p className="card-text text-center fst-italic fw-bold">
                            <li className='list-group-item list-group-item-success rounded my-2'>Atrapa las Estrellas</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Evita las bombas</li>
                            <li className='list-group-item list-group-item-success rounded my-2'>Disfruta la musica</li>
                        </p>
                        <Link to='/dude' className='btn btn-info wrap fw-bold'>
                            JUGAR
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}