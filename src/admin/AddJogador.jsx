import { useEffect, useState } from 'react';

// Página para adicionar um novo jogador.
function AddJogador() {
  // Dados de jogadores lidos do backend (não usados diretamente na renderização).
  const [adicionarJogador, setAdicionarJogador] = useState({});
  // Lista de equipas usada para preencher o select do formulário.
  const [equipas, setEquipas] = useState([]);

  // Busca a lista de jogadores quando o componente é montado.
  useEffect(() => {
    fetch(`/api/jogadores`)
      .then(response => response.json())
      .then(data => setAdicionarJogador(data));
  }, []);

  // Busca as equipas para o menu de seleção.
  useEffect(() => {
    fetch('/api/equipas')
      .then(response => response.json())
      .then(data => setEquipas(data));
  }, []);

  function search(formData) {
    // Lê os valores dos campos do formulário.
    const nomeJogador = formData.get('nomeJogador');
    const idadeJogador = formData.get('idadeJogador');
    const posicao = formData.get('posicao');
    const nomeEquipa = formData.get('nomeEquipa');
    const golos = formData.get('golos');

    const novoJogador = { nomeJogador, idadeJogador, posicao, nomeEquipa, golos };

    console.log(novoJogador);
    fetch('/api/jogadores', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ novoJogador }),
    });
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>Adiciona aqui Jogador</p>
      <form action={search}>
        <label htmlFor="nomeJogador">Jogador</label>
        <br />
        <input type="text" name="nomeJogador" />
        <br />
        <label htmlFor="idadeJogador">Idade Jogador</label>
        <br />
        <input type="number" name="idadeJogador" />
        <br />
        <label htmlFor="posicao">Posição</label>
        <br />
        <input type="text" name="posicao" />
        <br />
        <label htmlFor="nomeEquipa">Equipa</label>
        <br />
        <select name="nomeEquipa">
          <option value="">Escolhe uma equipa</option>
          {equipas.map(equipa => (
            <option key={equipa.id} value={equipa.equipa}>
              {equipa.equipa}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="golos">Golos</label>
        <br />
        <input type="number" name="golos" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddJogador;
