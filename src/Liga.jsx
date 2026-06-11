import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Classificacoes.css';
import './Liga.css';

// Liga selecionada e nomes disponíveis para a pesquisa.
const ligas = [
  { codigo: 'PPL', nome: 'Primeira Liga', logo: 'https://crests.football-data.org/PPL.png' },
  { codigo: 'PL', nome: 'Premier League', logo: 'https://crests.football-data.org/PL.png' },
  { codigo: 'PD', nome: 'La Liga', logo: 'https://crests.football-data.org/PD.png' },
  { codigo: 'SA', nome: 'Serie A', logo: 'https://crests.football-data.org/SA.png' },
  { codigo: 'BL1', nome: 'Bundesliga', logo: 'https://crests.football-data.org/BL1.png' },
  { codigo: 'FL1', nome: 'Ligue 1', logo: 'https://crests.football-data.org/FL1.png' },
];

function Liga() {
  const { codigo } = useParams();
  const [classificacoes, setClassificacoes] = useState([]);
  const liga = ligas.find(ligaAtual => ligaAtual.codigo === codigo);

  useEffect(() => {
    fetch(`/api/classificacoes?liga=${codigo}`)
      .then(response => response.json())
      .then(data => {
        setClassificacoes(data);
      });
  }, [codigo]);

  return (
    <div>
      <div className="cabecalho-liga">
        <img src={liga?.logo} alt={liga?.nome} />
        <h1>{liga?.nome}</h1>
      </div>

      <table className="tabela-classificacoes">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Equipa</th>
            <th>Vitórias</th>
            <th>Empates</th>
            <th>Derrotas</th>
            <th>GM</th>
            <th>GS</th>
            <th>DG</th>
            <th>Pontos</th>
          </tr>
        </thead>

        <tbody>
          {classificacoes.map(classificacao => (
            <tr key={classificacao.posicao}>
              <td>{classificacao.posicao}</td>
              <td className="equipa-com-logotipo">
                <img src={classificacao.logotipo} alt={classificacao.equipa} width="16" height="16" />
                <Link to={`/equipas/${classificacao.equipaIdApi}`}>{classificacao.equipa}</Link>
              </td>
              <td>{classificacao.vitorias}</td>
              <td>{classificacao.empates}</td>
              <td>{classificacao.derrotas}</td>
              <td>{classificacao.golos.marcados}</td>
              <td>{classificacao.golos.sofridos}</td>
              <td>{classificacao.golos.marcados - classificacao.golos.sofridos}</td>
              <td>{classificacao.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Liga;
