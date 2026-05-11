import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Equipa() {
    const { id } = useParams();
    const [equipa, setEquipa] = useState({});

    useEffect(() => {
        fetch(`/api/equipas/${id}`)
            .then((response) => response.json())
            .then((data) =>
                setEquipa(data));
    }, []);

    console.log(equipa);
    return (
        <div>
            <h1>Detalhes da Equipa</h1>
            <p>Equipa: {equipa.equipa}</p>
            <p>Treinador: {equipa.treinador?.nome}</p>
            <p>Pontos: {equipa.pontos}</p>
        </div>
    );
}

export default Equipa;
