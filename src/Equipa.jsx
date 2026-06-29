import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Página de detalhe de uma equipa específica.
function Equipa() {
  // Lê o id da equipa dos parâmetros da URL.
  // Exemplo: se o URL for /equipas/503, então id fica com o valor "503".
  const { id } = useParams();

  const { t } = useTranslation();
  // Guarda os dados da equipa que vêm do backend.
  // Começa como objeto vazio porque ainda não recebemos a resposta da API.
  const [equipa, setEquipa] = useState({});

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
      {/* squad é a lista de jogadores que vem dentro da resposta da equipa na football-data. */}
      {/* O ?. evita erro enquanto equipa.squad ainda não existe, antes da resposta chegar. */}
      {equipa.squad?.map(jogador => (
        <div key={jogador.id}>
          {/* Cada jogador também vem da football-data, por isso usamos name, position e nationality. */}
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
