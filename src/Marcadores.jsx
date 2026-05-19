import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Marcadores() {
  const [listaMarcadores, setListaMarcadores] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    fetch(`/api/marcadores?pagina=${paginaAtual}&items=5`)
      .then(response => response.json())
      .then(data => {
        setListaMarcadores(data.items);
        setTotalPaginas(Math.ceil(data.total / 5));
      });
  }, [paginaAtual]);
  return (
    <div>
      <h1>Marcadores</h1>
      <p>melhores marcadores</p>

      <ul>
        {listaMarcadores.map(marcador => (
          <li key={marcador.id}>
            <Link to={`/jogadores/${marcador.id}`}>
              {marcador.nome} - {marcador.golos}
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 0}>
        Anterior
      </button>
      <span>
        Página {paginaAtual + 1} de {totalPaginas}
      </span>
      <button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas - 1}>
        Proxima
      </button>
    </div>
  );
}

export default Marcadores;
