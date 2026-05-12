import { useEffect, useState } from 'react';

function Admin() {
  // guarda os dados das equipas obtidas da API
  const [adicionarEquipa, setAdicionarEquipa] = useState({});

  // carrega os dados das equipas apenas uma vez quando o componente é montado
  useEffect(() => {
    fetch(`/api/equipas`)
      .then(response => response.json())
      .then(data => setAdicionarEquipa(data));
  }, []);

  // envia os dados do formulário para criar uma nova equipa
  function search(formData) {
    const nomeTreinador = formData.get('nomeTreinador');
    const nomeEquipa = formData.get('nomeEquipa');
    const idadeTreinador = formData.get('idadeTreinador');
    const pontos = formData.get('pontos');

    const novaEquipa = { nomeTreinador, nomeEquipa, idadeTreinador, pontos };

    console.log(novaEquipa);

    fetch('/api/equipas', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ novaEquipa }),
    });
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>Gere as tuas equipas</p>
      {/* o formulário chama a função search quando é submetido */}
      <form action={search}>
        <label htmlFor="nomeEquipa">Equipa</label>
        <br></br>
        <input type="text" name="nomeEquipa"></input>
        <br></br>
        <label htmlFor="nomeTreinador">Nome Treinador</label>
        <br></br>
        <input type="text" name="nomeTreinador"></input>
        <br></br>
        <label htmlFor="idadeTreinador">Idade Treinador</label>
        <br></br>
        <input type="number" name="idadeTreinador"></input>
        <br></br>
        <label htmlFor="pontos">Pontos</label>
        <br></br>
        <input type="number" name="pontos"></input>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Admin;
