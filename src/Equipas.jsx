import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Equipas() {
    const [listaEquipas, setListaEquipas] = useState([]);

    useEffect(() => {
        fetch("/api/equipas")
            .then((response) => response.json())
            .then((data) => {
                setListaEquipas(data);
            });
    }, []);
    console.log(listaEquipas);

    return (
        <div>
            <h1>Equipas</h1>
            <p>as equipas</p>

            <ul>
                {listaEquipas.map((equipa) => (
                    <li
                        key={equipa.id}>
                        <Link
                            to={`/equipas/${equipa.id}`}>
                            {equipa.equipa}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Equipas;