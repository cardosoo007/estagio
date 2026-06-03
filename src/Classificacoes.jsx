import { useEffect, useState } from 'react';
import './Classificacoes.css';
import { NativeSelect } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ligas = [
  { codigo: 'PPL', nome: 'Primeira Liga' },
  { codigo: 'PL', nome: 'Premier League' },
  { codigo: 'PD', nome: 'La Liga' },
  { codigo: 'SA', nome: 'Serie A' },
  { codigo: 'BL1', nome: 'Bundesliga' },
  { codigo: 'FL1', nome: 'Ligue 1' },
];

function Classificacoes() {
  const [classificacoes, setClassificacoes] = useState([]);
  const [ligaSelecionada, setLigaSelecionada] = useState('PPL');

  useEffect(() => {
    fetch(`/api/classificacoes?liga=${ligaSelecionada}`)
      .then(response => response.json())
      .then(data => {
        setClassificacoes(data);
      });
  }, [ligaSelecionada]);

  console.log(classificacoes);

  return (
    <div>
      <h1>Classificações</h1>

      <div className="dropdown">
        <NativeSelect.Root width="240px">
          <NativeSelect.Field value={ligaSelecionada} onChange={event => setLigaSelecionada(event.target.value)}>
            {ligas.map(liga => (
              <option value={liga.codigo} key={liga.codigo}>
                {liga.nome}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
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

export default Classificacoes;
