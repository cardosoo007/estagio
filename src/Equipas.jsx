import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Equipas.css';

function Equipas() {
  const [listaEquipas, setListaEquipas] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);

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
      <h1>Equipas</h1>
      <ul>
        {listaEquipas.map(equipa => (
          <li className="equipa-estilo" key={equipa.id}>
            <Link to={`/equipas/${equipa.id}`}>{equipa.equipa}</Link>
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

export default Equipas;
