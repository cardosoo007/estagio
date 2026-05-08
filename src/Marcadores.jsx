import { useEffect, useState } from "react";

function Marcadores() {
    const [listaMarcadores, setListaMarcadores] = useState([])
    useEffect(() => {

        fetch("/api/marcadores")
            .then(response => response.json())
            .then(data => {
                setListaMarcadores(data)
            })

    }, []);
    console.log(listaMarcadores)
    return (
        <div>
            <h1>Marcadores</h1>
            <p>melhores marcadores</p>

            <ul>
                {listaMarcadores.map(marcador => (
                    <li key={marcador.jogador}>
                        {marcador.jogador} - {marcador.golos}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Marcadores;