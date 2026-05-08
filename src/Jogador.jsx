import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Jogador() {
    const { id } = useParams();
    const [jogador, setJogador] = useState({});
    useEffect(() => {

        fetch(`/api/jogadores/${id}`)
            .then(response => response.json())
            .then(data => {
                setJogador(data)
                console.log(data)
            })

    }, []);
    console.log(jogador)
    return (
        <div>
            <h1>Detalhes do Jogador</h1>
            <p>Nome: {jogador.nome}</p>
            <p>Idade: {jogador.idade}</p>
            <p>Posição: {jogador.posicao}</p>
            <p>Equipa: {jogador.equipa}</p>
            <p>Golos: {jogador.golos}</p>

        </div>
    );
}

export default Jogador;