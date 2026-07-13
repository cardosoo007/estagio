import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { Avatar, Button, Combobox, Portal, Text, useFilter, useListCollection } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useTranslation } from 'react-i18next';
import './Layout.css';

// Lista de ligas suportadas pela aplicação.
// Este array funciona como uma pequena base de dados local simples para os nomes das ligas.
// É reutilizado em vários pontos da interface, o que facilita manter os dados consistentes e evita repetir manualmente a mesma informação.
const ligas = [
  { codigo: 'PPL', nome: 'Primeira Liga' },
  { codigo: 'PL', nome: 'Premier League' },
  { codigo: 'PD', nome: 'La Liga' },
  { codigo: 'SA', nome: 'Serie A' },
  { codigo: 'BL1', nome: 'Bundesliga' },
  { codigo: 'FL1', nome: 'Ligue 1' },
];

// Layout comum da aplicação.
// Este componente é a estrutura base da app: junta a navegação superior, o conteúdo da página atual e o rodapé.
// Como envolve todas as páginas, qualquer alteração aqui afeta toda a experiência visual da aplicação, por isso é importante saber que este é um ponto central.
function Layout() {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: ligas,
    itemToString: liga => liga.nome,
    itemToValue: liga => liga.codigo,
    filter: contains,
  });

  // Redireciona para a página de detalhe da liga escolhida.
  // O parâmetro vem do componente Combobox do Chakra UI e contém o código da liga selecionada pelo utilizador.
  // Esta função é o ponto de ligação entre a interação do utilizador e a navegação da aplicação.
  function escolherLiga(event) {
    const codigoLiga = event.value[0];

    if (codigoLiga) {
      navigate(`/ligas/${codigoLiga}`);
    }
  }

  return (
    <div>
      <nav className="navbar">
        {/* Navegação principal do site. */}
        {/* Estes links permitem saltar entre as secções principais da aplicação sem perder a estrutura geral do layout. */}
        <Link to="/">{t('paginaPrincipal')}</Link>
        <Link to="/calendario">{t('calendario')}</Link>
        <Link to="/classificacoes">{t('classificacoes')}</Link>
        <Link to="/equipas">{t('equipas')}</Link>
        <Link to="/configuracoes">{t('configuracoes')}</Link>

        {/* Seletor de ligas com pesquisa local. */}
        <Combobox.Root collection={collection} width="180px" onInputValueChange={event => filter(event.inputValue)} onValueChange={escolherLiga}>
          <Combobox.Control>
            <Combobox.Input placeholder={t('pesquisarLiga')} />
            <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </Combobox.IndicatorGroup>
          </Combobox.Control>

          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                {collection.items.map(liga => (
                  <Combobox.Item item={liga} key={liga.codigo}>
                    <Combobox.ItemText>{liga.nome}</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                ))}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>

        <div className="login-button">
          {isAuthenticated ? (
            <>
              <div className="perfil-utilizador">
                <Avatar.Root>
                  <Avatar.Fallback name={user?.name} />
                  <Avatar.Image src={user?.picture} />
                </Avatar.Root>
                <Text>{user?.name}</Text>
              </div>
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </div>
      </nav>

      {/* Aqui é onde o componente correspondente à rota atual é renderizado dentro do layout. */}
      {/* Este ponto é fundamental porque permite trocar o conteúdo da página sem mudar a navbar ou o footer. */}
      <Outlet />

      <footer className="footer">
        <div>
          {/* Troca de idioma para português. */}
          <Button size="sm" variant="ghost" onClick={() => i18n.changeLanguage('pt')}>
            🇵🇹
          </Button>

          {/* Troca de idioma para inglês. */}
          <Button size="sm" variant="ghost" onClick={() => i18n.changeLanguage('en')}>
            🇬🇧
          </Button>
        </div>

        {t('construidoPor')}
      </footer>
    </div>
  );
}

export default Layout;
