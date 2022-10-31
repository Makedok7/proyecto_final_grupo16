import { Route } from "react-router-dom" 
import Nav from './Nav';
import "../styles/DesarrolladoresStyle.css";
import desarrolladores from '../json/desarrolladores.json'

export default function Desarrolladores() {
    return (
        <>
            {Nav()}
            <h1 className="title my-auto">Desarrolladores</h1>
            <div className="contenedor bg-dark">
                {desarrolladores.map((developer,i) => {
                    return (<div key={i}>
                        <section className="list">
                            <ul>
                                
                                <h5 className="name text-uppercase fst-italic text-center ">{developer.name}</h5>
                                <h5 className="name text-uppercase fst-italic text-center ">{developer.years}</h5>
                                <img className="imag border border-secondary border-opacity-50"  src={developer.photo} />
                                <p className="description text-center text-capitalize font-monospace">{developer.interests}</p>
                                <a  href={developer.linktoGit} target="_blank" className='text-decoration-none'>
                                    <button className="btn btn-danger d-grid gap-2 col-6 mx-auto">Github Link</button>
                                </a>
                            </ul>
                        </section>
                    </div>
                    );
                })}
            </div>
        </>
    )

}
