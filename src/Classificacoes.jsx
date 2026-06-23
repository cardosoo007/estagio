import { useEffect, useState } from 'react';
import { NativeSelect } from '@chakra-ui/react';

import TabelaClassificacoes from './TabelaClassificacoes';

// Liga selecionada e nomes disponíveis para o filtro.
const ligas = [
  { codigo: 'PPL', nome: 'Primeira Liga' },
  { codigo: 'PL', nome: 'Premier League' },
  { codigo: 'PD', nome: 'La Liga' },
  { codigo: 'SA', nome: 'Serie A' },
  { codigo: 'BL1', nome: 'Bundesliga' },
  { codigo: 'FL1', nome: 'Ligue 1' },
];

function Classificacoes() {
  // Estado da liga selecionada no menu drop-down.
  const [ligaSelecionada, setLigaSelecionada] = useState('PPL');
  // Estado usado para saber qual coluna está ordenada e em que direção.
  // campo: guarda a coluna escolhida, por exemplo "marcados" ou "sofridos".
  // Quando campo é null, significa que ainda não clicámos em nenhuma coluna para ordenar.
  // direcao: guarda se a ordenação é do maior para o menor ("desc") ou do menor para o maior ("asc").
  const [ordenacao, setOrdenacao] = useState({
    campo: null,
    direcao: 'desc',
  });

  const {
    data: classificacoes = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ['classificacoes', ligaSelecionada],
    queryFn: async () => {
      console.log(' backend:', ligaSelecionada);
      const response = await fetch(`/api/classificacoes?liga=${ligaSelecionada}`);
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  // Função chamada quando o utilizador clica nos cabeçalhos GM ou GS.
  // O parâmetro campo recebe o nome da propriedade que queremos ordenar dentro de golos.
  // Exemplo: ordenarPor("marcados") ordena por golos marcados.
  // Exemplo: ordenarPor("sofridos") ordena por golos sofridos.
  function ordenarPor(campo) {
    // Usamos o estado atual para saber se o utilizador clicou na mesma coluna outra vez.
    setOrdenacao(ordenacaoAtual => {
      // Se o utilizador clicar outra vez na mesma coluna, invertemos a direção da ordenação.
      // Isto permite alternar entre descendente e crescente a cada clique.
      if (ordenacaoAtual.campo === campo) {
        return {
          campo,
          direcao: ordenacaoAtual.direcao === 'desc' ? 'asc' : 'desc',
        };
      }

      // Se clicar numa coluna diferente, começamos essa coluna ordenada do maior para o menor.
      // Isto cumpre o requisito: o primeiro clique deve ordenar por ordem decrescente.
      return {
        campo,
        direcao: 'desc',
      };
    });
  }

  // Ordena localmente a tabela quando o utilizador clica nos cabeçalhos.
  // "Localmente" significa que não vamos buscar novos dados à API; só mudamos a ordem dos dados que já temos.
  // Usamos [...classificacoes] para criar uma cópia, porque sort() altera o array onde é usado.
  // Como classificacoes é um estado do React, é melhor não alterar esse array diretamente.
  const classificacoesOrdenadas = [...classificacoes].sort((a, b) => {
    if (!ordenacao.campo) {
      // Quando ainda não foi escolhida nenhuma coluna, mantemos a ordem original da API.
      return 0;
    }

    // Como GM e GS estão dentro do objeto golos, usamos ordenacao.campo para escolher qual deles comparar.
    // Se ordenacao.campo for "marcados", isto vai buscar a.golos.marcados e b.golos.marcados.
    // Se ordenacao.campo for "sofridos", isto vai buscar a.golos.sofridos e b.golos.sofridos.

    const valorA = ordenacao.campo === 'pontos' ? a.pontos : a.golos[ordenacao.campo];
    const valorB = ordenacao.campo === 'pontos' ? b.pontos : b.golos[ordenacao.campo];
    // Se a direção for desc, o maior vem primeiro. Se for asc, o menor vem primeiro.
    // valorB - valorA coloca números maiores antes; valorA - valorB coloca números menores antes.
    return ordenacao.direcao === 'desc' ? valorB - valorA : valorA - valorB;
  });

  if (isPending) {
    return <p>A carregar classificações...</p>;
  }

  if (error) {
    return <p>Erro ao carregar classificações.</p>;
  }

  return (
    <div>
      <h1>Classificações</h1>

      <div className="dropdown">
        {/* Seletor de liga para filtrar as classificações */}
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

      <TabelaClassificacoes classificacoesOrdenadas={classificacoesOrdenadas} ordenarPor={ordenarPor} />
    </div>
  );
}

export default Classificacoes;
