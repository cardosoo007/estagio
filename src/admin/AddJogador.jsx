import { useEffect, useState } from 'react';

function AddJogador() {
  const [adicionarJogador, setAdicionarJogador] = useState({});

  useEffect(() => {
    fetch(`/api/equipas`)
      .then(response => response.json())
      .then(data => setAdicionarJogador(data));
  }, []);

  function search(formData) {
    const nomeJogador = formData.get('nomeJogador');
    const idadeJogador = formData.get('idadeJogador');
    const posicao = formData.get('posicao');
    const nomeEquipa = formData.get('nomeEquipa');
    const golos = formData.get('golos');

    const novoJogador = { nomeJogador, idadeJogador, posicao, nomeEquipa, golos };

    console.log(novoJogador);

    fetch('/api/marcadores', {
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
        <input type="text" name="nomeEquipa"></input>
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
