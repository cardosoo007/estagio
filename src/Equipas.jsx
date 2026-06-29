import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Equipas.css';
import { useTranslation } from 'react-i18next';
// Página que mostra a lista de equipas com paginação.
function Equipas() {
  const [listaEquipas, setListaEquipas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const { t } = useTranslation();
  // Busca as equipas a cada mudança de página.
  useEffect(() => {
    fetch(`/api/equipas?pagina=${paginaAtual}&items=5`)
      .then(response => response.json())
      .then(data => {
        setListaEquipas(data.items);
        setTotalPaginas(Math.ceil(data.total / 5));
      });
  }, [paginaAtual]);

  return (
    <div>
      <h1>{t('equipas')}</h1>
      <ul>
        {listaEquipas.map(equipa => (
          <li className="equipa-estilo" key={equipa.id}>
            {/* Link para a página de detalhe da equipa */}
            <Link to={`/equipas/${equipa.id}`}>{equipa.equipa}</Link>
          </li>
        ))}
      </ul>

      {/* Controles de navegação entre páginas */}
      <button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 0}>
        {t('anterior')}
      </button>

      <span>
        {t('pagina')} {paginaAtual + 1} {t('de')} {totalPaginas}
      </span>

      <button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas - 1}>
        {t('proxima')}
      </button>
    </div>
  );
}

export default Equipas;
