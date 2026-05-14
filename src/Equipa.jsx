import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Equipa() {
  const { id } = useParams();
  const [equipa, setEquipa] = useState({});
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    fetch(`/api/equipas/${id}`)
      .then(response => response.json())
      .then(data => setEquipa(data));
  }, []);
  useEffect(() => {
    fetch(`/api/equipas/${id}/jogadores`)
      .then(response => response.json())
      .then(data => setJogadores(data));
  }, []);

  console.log(equipa);
  return (
    <div>
      <h1>Detalhes da Equipa</h1>
      <p>Equipa: {equipa.equipa}</p>
      <p>Treinador: {equipa.treinador?.nome}</p>
      <p>Pontos: {equipa.pontos}</p>
      <br></br>
      <h2>Jogadores</h2>
      {jogadores.map(jogador => (
        <div key={jogador.id}>
          <p>Nome: {jogador.nome}</p>
          <p>Idade: {jogador.idade}</p>
          <p>Posição: {jogador.posicao}</p>
          <p>Golos: {jogador.golos}</p>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default Equipa;
