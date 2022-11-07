import Nav from './Nav'
import "../styles/inicio-style.css"
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='bg-dark' style={{ height: "1000px" }}>
            {Nav()}
            <div id="div1" className="container">
                <div className="Titulo" id="titulo">
                    <header>
                        <h1>Grupo 16</h1>
                    </header>
                </div>
                <dl id="nav">
                    <dt className="nav-item">Ábalos Alan Nicolás</dt>
                    <dt className="nav-item">Cabrera Fabricio Gastón</dt>
                    <dt className="nav-item">Córdoba Juan Brian Joel</dt>
                    <dt className="nav-item">Lozano Rodrigo Emanuel</dt>
                    <dt className="nav-item">Mecedo Facundo</dt>
                    <dt className="nav-item">Palacios Carlos Javier</dt>
                </dl>
                <div id="juego" >
                    <h1>Proyecto Final</h1>
                    <Link to='/juego' className='text-decoration-none'>
                        <button className="boton">Iniciar Juego</button>
                    </Link>
                </div>
                <div className="row ">
                    <section id="img1" className='col'>
                        <img src="../images/LogoJuego.jpg" width="350" height="350" alt="LogoJuego" className='img-fluid rounded' />
                    </section>
                    <aside id="reglas" className='col '>
                        <h2>Reglas</h2>
                        <ul className='list-inline'>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    )
}