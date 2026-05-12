import { useEffect, useState } from 'react';

function AddJogador() {
  // guarda os dados retornados de /api/jogadores (aqui não está a usar depois)
  const [adicionarJogador, setAdicionarJogador] = useState({});
  // guarda a lista de equipas que vem do backend
  const [equipas, setEquipas] = useState([]);

  // busca jogadores do backend quando o componente monta pela primeira vez
  useEffect(() => {
    fetch(`/api/jogadores`)
      .then(response => response.json())
      .then(data => setAdicionarJogador(data));
  }, []);

  // busca a lista de equipas do backend quando o componente monta
  useEffect(() => {
    fetch('/api/equipas')
      .then(response => response.json())
      .then(data => setEquipas(data));
  }, []);

  function search(formData) {
    // lê os valores dos campos do formulário
    const nomeJogador = formData.get('nomeJogador');
    const idadeJogador = formData.get('idadeJogador');
    const posicao = formData.get('posicao');
    const nomeEquipa = formData.get('nomeEquipa');
    const golos = formData.get('golos');

    // monta o objeto que vamos enviar para criar um novo jogador
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
        <label htmlFor="nome">Jogador</label>
        <br></br>
        <input type="text" name="nomeJogador"></input>
        <br></br>
        <label htmlFor="idadeJogador">Idade Jogador</label>
        <br></br>
        <input type="number" name="idadeJogador"></input>
        <br></br>
        <label htmlFor="posicao">Posicao</label>
        <br></br>
        <input type="text" name="posicao"></input>
        <br></br>
        <label htmlFor="nomeEquipa">Equipa</label>
        <br></br>
        <select name="nomeEquipa">
          <option value="">Escolhe uma equipa</option>
          {equipas.map(equipa => (
            <option key={equipa.id} value={equipa.equipa}>
              {equipa.equipa}
            </option>
          ))}
        </select>
        <br></br>
        <label htmlFor="golos">Golos</label>
        <br></br>
        <input type="number" name="golos"></input>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default AddJogador;
