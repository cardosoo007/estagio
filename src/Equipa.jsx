import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Página de detalhe de uma equipa específica.
function Equipa() {
  // Lê o id da equipa dos parâmetros da URL.
  // Exemplo: se o URL for /equipas/503, então id fica com o valor "503".
  const { id } = useParams();

  // Guarda os dados da equipa que vêm do backend.
  // Começa como objeto vazio porque ainda não recebemos a resposta da API.
  const [equipa, setEquipa] = useState({});

  // Este estado já não é necessário para a nova lógica, porque os jogadores vêm dentro de equipa.squad.
  // Pode ser removido quando quiseres limpar o ficheiro.
  const [jogadores, setJogadores] = useState([]);

  // Busca os detalhes da equipa quando o id da rota mudar.
  useEffect(() => {
    // Se por algum motivo o id ainda não existir, não fazemos o pedido.
    // Isto evita chamadas como /api/equipas/undefined.
    if (!id) {
      return;
    }

    // Chamamos o nosso backend, não a football-data diretamente.
    // O backend é que chama a API externa com o token, evitando problemas de CORS e escondendo a chave.
    fetch(`/api/equipas/${id}`)
      .then(response => response.json())
      .then(data => {
        // Guardamos no estado a equipa devolvida pelo backend para a conseguir mostrar no JSX.
        setEquipa(data);
      });
  }, [id]);

  return (
    <div>
      <h1>Detalhes da Equipa</h1>

      {/* Mostra os dados básicos da equipa */}
      {/* crest, name, shortName, coach, venue e founded são campos que vêm da football-data. */}
      <img src={equipa.crest} alt={equipa.name} width="100" />
      <br />
      <p>Nome: {equipa.name}</p>
      <p>Nome curto: {equipa.shortName}</p>
      {/* O ?. evita erro se coach ainda não existir ou vier vazio na resposta. */}
      <p>Treinador: {equipa.coach?.name}</p>
      <p>Estádio: {equipa.venue}</p>
      <p>Fundação: {equipa.founded}</p>
      <br />
      <h2>Jogadores</h2>
      {/* squad é a lista de jogadores que vem dentro da resposta da equipa na football-data. */}
      {/* O ?. evita erro enquanto equipa.squad ainda não existe, antes da resposta chegar. */}
      {equipa.squad?.map(jogador => (
        <div key={jogador.id}>
          {/* Cada jogador também vem da football-data, por isso usamos name, position e nationality. */}
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
