import Nav from './Nav'
import "../styles/inicio-style.css"
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className='bg-dark' style={{ height: "auto" }}>
            {Nav()}
            <div id="div1" className="container">
                <div className="Titulo" id="titulo">
                    <header>
                        <h1>Grupo 16</h1>
                    </header>
                </div>
                <div id="nav" className='navbar navbar-brand '>
                    <dt className="nav-item">Ábalos Alan Nicolas</dt>
                    <dt className="nav-item">Cabrera Fabricio Gastón</dt>
                    <dt className="nav-item">Córdoba Juan Brian Joel</dt>
                    <dt className="nav-item">Lozano Rodrigo Emanuel</dt>
                    <dt className="nav-item">Mecedo Facundo</dt>
                    <dt className="nav-item">Palacios Carlos Javier</dt>
                </div>
                <div id="juego" >
                    <h1>Proyecto Final</h1>
                    <Link to='/juego' className='text-decoration-none'>
                        <button className="boton">VER JUEGOS</button>
                    </Link>
                </div>
                <div className="row ">
                    <section id="img1" className='col'>
                        <img src="../images/home.jpg" width="350" height="350" alt="LogoHome" className='img-fluid rounded' />
                    </section>
                </div>
            </div>
        </div>
    )
}