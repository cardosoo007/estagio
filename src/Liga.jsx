import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Liga.css';
import { TabelaClassificacoes } from './Classificacoes';

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

      <TabelaClassificacoes classificacoesOrdenadas={classificacoes} />
    </div>
  );
}

export default Liga;
