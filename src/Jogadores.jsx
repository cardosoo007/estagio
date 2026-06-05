import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Jogadores.css';

function Jogadores() {
  // Estado para guardar a lista de jogadores recebida do backend.
  const [listaJogadores, setListaJogadores] = useState([]);

  // Busca os jogadores assim que o componente é montado.
  useEffect(() => {
    fetch('/api/jogadores')
      .then(response => response.json())
      .then(data => {
        setListaJogadores(data);
      });
  }, []);

  return (
    <div>
      <h1>Jogadores</h1>

      {/* Lista de jogadores com link para a página de detalhe de cada um */}
      <ul>
        {listaJogadores.map(jogador => (
          <li className="jogador-estilo" key={jogador.id}>
            <Link to={`/jogadores/${jogador.id}`}>
              {jogador.nome} - {jogador.golos}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jogadores;
