import { useEffect, useState } from "react";

function Jogador() {
    const [jogador, setJogador] = useState([])
    useEffect(() => {

        fetch("/api/marcadores/jogador")
            .then(response => response.json())
            .then(data => {
                setJogador(data)
            })

    }, []);
    console.log(jogador)
    return (
        <div>
            <h1>Detalhes do Jogador</h1>
            <p>Nome: {jogador.nome}</p>
            <p>Equipa: {jogador.equipas}</p>
            <p>Golos: {jogador.golos}</p>

        </div>
    );
}

export default Jogador;