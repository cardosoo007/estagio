import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Marcadores() {
    const [listaMarcadores, setListaMarcadores] = useState([]);

    useEffect(() => {
        fetch("/api/marcadores")
            .then((response) => response.json())
            .then((data) => {
                setListaMarcadores(data);
            });
    }, []);
    console.log(listaMarcadores);

    return (
        <div>
            <h1>Marcadores</h1>
            <p>melhores marcadores</p>

            <ul>
                {listaMarcadores.map((marcador) => (
                    <li
                        key={marcador.id}>
                        <Link
                            to={`/jogador/${marcador.id}`}>
                            {marcador.jogador} - {marcador.golos}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default Marcadores;