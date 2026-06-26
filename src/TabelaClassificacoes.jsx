import { Link } from 'react-router-dom';
import { Icon, IconButton } from '@chakra-ui/react';
import { HiHeart } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function TabelaClassificacoes({ classificacoesOrdenadas, ordenarPor = () => {} }) {
  const [equipasFavoritas, setEquipasFavoritas] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    async function carregarFavoritos() {
      const token = await getAccessTokenSilently();

      fetch(`/api/favoritos?userId=${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setEquipasFavoritas(data);
        });
    }

    carregarFavoritos();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  async function alternarFavorito(classificacao) {
    if (!isAuthenticated) {
      return;
    }
    const token = await getAccessTokenSilently();
    const novoFavorito = {
      userId: user.sub,
      equipaIdApi: classificacao.equipaIdApi,
      equipa: classificacao.equipa,
    };

    console.log(novoFavorito);

    fetch('/api/favoritos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ novoFavorito }),
    }).then(() => {
      fetch(`/api/favoritos?userId=${user.sub}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setEquipasFavoritas(data);
        });
    });
  }

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
        {classificacoesOrdenadas.map(classificacao => {
          const equipaEstaFavorita = equipasFavoritas.some(favorito => {
            return favorito.equipaIdApi === classificacao.equipaIdApi;
          });

          return (
            <tr key={classificacao.posicao}>
              <td>{classificacao.posicao}</td>
              {/* Mostra o logotipo da equipa, um link para a página de detalhe e o botão de favorito. */}
              <td className="equipa-com-logotipo">
                <IconButton variant="ghost" aria-label="Adicionar aos favoritos" size="xs" onClick={() => alternarFavorito(classificacao)}>
                  <Icon color={equipaEstaFavorita ? 'red.500' : 'gray.400'}>
                    <HiHeart />
                  </Icon>
                </IconButton>

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
          );
        })}
      </tbody>
    </table>
  );
}

export default TabelaClassificacoes;
