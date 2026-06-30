import { useEffect, useState } from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

// Página de administração para criar novas equipas.
function Admin() {
  const { getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [aCarregar, setACarregar] = useState(true);
  // Estado usado para guardar os dados de equipas retornados pela API.
  const [adicionarEquipa, setAdicionarEquipa] = useState({});

  useEffect(() => {
    getAccessTokenSilently()
      .then(token =>
        fetch('/api/admin/verificar', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      )
      .then(response => {
        setIsAdmin(response.ok);
        setACarregar(false);
      })
      .catch(() => {
        setIsAdmin(false);
        setACarregar(false);
      });
  }, [getAccessTokenSilently]);

  // Busca os dados de equipas quando o componente é montado.
  useEffect(() => {
    fetch(`/api/equipas`)
      .then(response => response.json())
      .then(data => setAdicionarEquipa(data));
  }, []);

  // Ao submeter o formulário, envia os dados para o backend.
  async function search(formData) {
    const nomeTreinador = formData.get('nomeTreinador');
    const nomeEquipa = formData.get('nomeEquipa');
    const idadeTreinador = formData.get('idadeTreinador');
    const pontos = formData.get('pontos');

    const novaEquipa = { nomeTreinador, nomeEquipa, idadeTreinador, pontos };

    console.log(novaEquipa);
    const token = await getAccessTokenSilently();
    fetch('/api/equipas', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ novaEquipa }),
    });
  }

  if (aCarregar) {
    return <p>A verificar permissões...</p>;
  }

  if (!isAdmin) {
    return <p>Não tens permissão para aceder a esta página.</p>;
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>Gere as tuas equipas</p>
      {/* O formulário envia a nova equipa para o backend quando submetido. */}
      <form action={search}>
        <label htmlFor="nomeEquipa">Equipa</label>
        <br />
        <input type="text" name="nomeEquipa" />
        <br />
        <label htmlFor="nomeTreinador">Nome Treinador</label>
        <br />
        <input type="text" name="nomeTreinador" />
        <br />
        <label htmlFor="idadeTreinador">Idade Treinador</label>
        <br />
        <input type="number" name="idadeTreinador" />
        <br />
        <label htmlFor="pontos">Pontos</label>
        <br />
        <input type="number" name="pontos" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default withAuthenticationRequired(Admin, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
