import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Equipa() {
  const { id } = useParams();
  const [equipa, setEquipa] = useState({});
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetch(`/api/equipas/${id}`)
      .then(response => response.json())
      .then(data => {
        setEquipa(data);
      });
  }, [id]);

  return (
    <div>
      <h1>Detalhes da Equipa</h1>

      <img src={equipa.crest} alt={equipa.name} width="100" />
      <br />
      <p>Nome: {equipa.name}</p>
      <p>Nome curto: {equipa.shortName}</p>
      <p>Treinador: {equipa.coach?.name}</p>
      <p>Estádio: {equipa.venue}</p>
      <p>Fundação: {equipa.founded}</p>
      <br />
      <h2>Jogadores</h2>
      {equipa.squad?.map(jogador => (
        <div key={jogador.id}>
          <p>Nome: {jogador.name}</p>
          <p>Posição: {jogador.position}</p>
          <p>Nacionalidade: {jogador.nationality}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Equipa;
