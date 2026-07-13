import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Página de detalhe de uma equipa específica.
// Este componente depende do parâmetro :id da rota /equipas/:id e pede ao backend os dados completos dessa equipa.
function Equipa() {
  // Lê o id da equipa dos parâmetros da URL.
  // Exemplo: se o URL for /equipas/503, então id fica com o valor "503".
  const { id } = useParams();

  const { t } = useTranslation();

  // Guarda os dados da equipa que vêm do backend.
  // O valor inicial é um objeto vazio porque a resposta ainda não chegou quando o componente é montado.
  const [equipa, setEquipa] = useState({});

  // Busca os detalhes da equipa sempre que o id da rota muda.
  useEffect(() => {
    // Se por algum motivo o id ainda não existir, não fazemos o pedido.
    // Isto evita chamadas como /api/equipas/undefined.
    if (!id) {
      return;
    }

    // Chamamos o nosso backend e não a API externa diretamente.
    // O backend centraliza a autenticação e o acesso à informação externa, o que é mais seguro e mais limpo.
    fetch(`/api/equipas/${id}`)
      .then(response => response.json())
      .then(data => {
        // Guardamos a resposta num estado para o JSX poder renderizar os dados de forma reativa.
        setEquipa(data);
      });
  }, [id]);

  return (
    <div>
      <h1>{t('detalhesEquipa')}</h1>
      <p>
        {t('nome')}: {equipa.name}
      </p>
      <p>
        {t('nomeCurto')}: {equipa.shortName}
      </p>
      <p>
        {t('treinador')}: {equipa.coach?.name}
      </p>
      <p>
        {t('estadio')}: {equipa.venue}
      </p>
      <p>
        {t('fundacao')}: {equipa.founded}
      </p>
      <h2>{t('jogadores')}</h2>

      {/* A propriedade squad contém a lista de jogadores devolvidos pela API. */}
      {/* O operador ?. evita erros enquanto os dados ainda não foram carregados. */}
      {equipa.squad?.map(jogador => (
        <div key={jogador.id}>
          {/* Cada jogador tem nome, posição e nacionalidade. */}
          <p>
            {t('nome')}: {jogador.name}
          </p>
          <p>
            {t('posicao')}: {jogador.position}
          </p>
          <p>
            {t('nacionalidade')}: {jogador.nationality}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Equipa;
