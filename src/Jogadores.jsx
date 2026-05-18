import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Jogadores.css';

function Jogadores() {
  // guarda a lista de jogadores obtida da API
  const [listaJogadores, setListaJogadores] = useState([]);

  // carrega os jogadores apenas uma vez quando o componente é montado
  useEffect(() => {
    fetch('/api/jogadores')
      .then(response => response.json())
      .then(data => {
        setListaJogadores(data);
      });
  }, []);

  console.log(listaJogadores);

  return (
    <div>
      <h1>Jogadores</h1>

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
