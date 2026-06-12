import { Link } from 'react-router-dom';

function TabelaClassificacoes({ classificacoesOrdenadas, ordenarPor = () => {} }) {
  return (
    <table className="tabela-classificacoes">
      <thead>
        <tr>
          <th>Posição</th>
          <th>Equipa</th>
          <th>Vitórias</th>
          <th>Empates</th>
          <th>Derrotas</th>
          {/* GM significa Golos Marcados. Ao clicar, chamamos ordenarPor("marcados"). */}
          <th className="clicavel" onClick={() => ordenarPor('marcados')}>
            GM
          </th>
          {/* GS significa Golos Sofridos. Ao clicar, chamamos ordenarPor("sofridos"). */}
          <th className="clicavel" onClick={() => ordenarPor('sofridos')}>
            GS
          </th>
          <th>DG</th>
          <th className="clicavel" onClick={() => ordenarPor('pontos')}>
            Pontos
          </th>
        </tr>
      </thead>

      <tbody>
        {/* Usamos classificacoesOrdenadas, e não classificacoes, para a tabela aparecer na ordem escolhida. */}
        {classificacoesOrdenadas.map(classificacao => (
          <tr key={classificacao.posicao}>
            <td>{classificacao.posicao}</td>
            {/* Mostra o logotipo da equipa e um link para a página de detalhe da equipa */}
            <td className="equipa-com-logotipo">
              <img src={classificacao.logotipo} alt={classificacao.equipa} width="16" height="16" />
              {/* equipaIdApi é o ID da equipa na football-data. Ele é usado no URL para depois pedir os detalhes dessa equipa. */}
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
  );
}

export default TabelaClassificacoes;
