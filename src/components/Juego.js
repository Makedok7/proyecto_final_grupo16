import Nav from './Nav'
import "../styles/Juego.css"
import { Link } from 'react-router-dom';

export default function Juego() {

    return (
        <div className="bg-dark" style={{ height: "auto" }}>
            {Nav()}
            <div className='card-group py-5 wrap col'>
                <div className='card bg-info mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/piedraPapelTijeras/logo.jpeg' alt="piedraPapelTijeras" className="w-50" />
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title">Piedra Papel o Tijeras</h5>
                        <p class="card-text text-center">
                            <li >Piedra gana a Tijeras</li>
                            <li>Tijeras gana a Papel</li>
                            <li>Papel gana a Piedra</li>
                        </p>
                        <Link to='/piedraPapelTijeras' className='btn-principal wrap'>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-info mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/ahorcadito/logo.png' alt="piedraPapelTijeras" className="w-50" />
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title">Ahorcadito</h5>
                        <p class="card-text text-center">
                            <li>Se mostrarán pistas de una palabra, y tienes que adivinar cuál es (LETRA por LETRA).</li>
                            <li>Debes indicar una letra a la vez.</li>
                            <li>Si elijes una letra que no existe en la palabra, entonces perderás una oportunidad.</li>
                            <li>Cada vez que falles al elegir una letra, se dibujará una parte de una figura.</li>
                            <li>Si fallas los suficiente, la figura se completará y PERDERÁS!</li>
                            <li>Si logras adivinar todas las letras de la palabra, entonces GANARÁS!</li>
                        </p>
                        <Link to='/ahorcadito' className='btn-principal wrap'>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-info mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/arkanoid/logo.png' alt="piedraPapelTijeras" className="w-50" />
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title">Arkanoid</h5>
                        <p class="card-text text-center">
                            <li>Con el ratón moverás la barra hacia los lados con el fin de recoger la pelota en su caída y hacerla subir de nuevo.</li>
                            <li>El objetivo de este juego es romper todos los ladrillos que se encuentran en la parte superior, cuando limpies la pantalla pasarás de nivel y así sucesivamente.</li>
                            <li>Cuentas con tres vidas, así que no te duermas en los laureles y muévete rápido para recogerla.</li>
                        </p>
                        <Link to='/arkanoid' className='btn-principal wrap'>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-info mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/phaser/menu.jpg' alt="piedraPapelTijeras" className="w-50" />
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title">Juego Phaser</h5>
                        <p class="card-text text-center">
                            <li>Evita la zona alrededor del agujero negro y a los enemigos que aparecen, aguanta hasta el tiempo indicado.</li>
                            <li>Presion A,D para rotar la nave y W para avanzar hacia adelante, SPACE para disparar.</li>
                            <li>Cada vez que el enemigo te golpee te ira acercando con mas fuerza hacia el agujero negro.</li>
                        </p>
                        <Link to='/phaserGame' className='btn-principal wrap'>
                            JUGAR
                        </Link>
                    </div>
                </div>
                <div className='card bg-info mx-3 rounded'>
                    <div className='text-center'>
                        <img src='./images/tresEnRaya/logo.jpg' alt="piedraPapelTijeras" className="w-50" />
                    </div>
                    <div class="card-body text-center">
                        <h5 class="card-title">Tres en Raya</h5>
                        <p class="card-text text-center">
                            <li>El primer jugador coloca la ficha en cualquiera de los casilleros del tablero.</li>
                            <li>El segundo hará lo mismo con su primera ficha.</li>
                            <li>Se continúa las otras jugadas respetando los turnos, si el jugador consigue alinear tres marcas del mismo tipo, ese jugador hace tres en raya.</li>
                        </p>
                        <Link to='/tresenraya' className='btn-principal wrap'>
                            JUGAR
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}