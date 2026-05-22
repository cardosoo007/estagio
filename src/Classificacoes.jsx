import { useEffect, useState } from 'react';
import './Classificacoes.css';

function Classificacoes() {
  const [classificacoes, setClassificacoes] = useState([]);

  useEffect(() => {
    fetch('/api/classificacoes')
      .then(response => response.json())
      .then(data => {
        setClassificacoes(data);
      });
  }, []);

  return (
    <div>
      <h1>Classificações</h1>

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
              <td>{classificacao.equipa}</td>
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
