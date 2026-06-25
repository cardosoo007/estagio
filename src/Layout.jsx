import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import { Avatar, Button, Combobox, Portal, Text, useFilter, useListCollection } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useTranslation } from 'react-i18next';

const ligas = [
  { codigo: 'PPL', nome: 'Primeira Liga' },
  { codigo: 'PL', nome: 'Premier League' },
  { codigo: 'PD', nome: 'La Liga' },
  { codigo: 'SA', nome: 'Serie A' },
  { codigo: 'BL1', nome: 'Bundesliga' },
  { codigo: 'FL1', nome: 'Ligue 1' },
];

// Layout comum da app: menu de navegação e localização do conteúdo.
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

  function escolherLiga(event) {
    const codigoLiga = event.value[0];

    if (codigoLiga) {
      navigate(`/ligas/${codigoLiga}`);
    }
  }

  return (
    <div>
      <nav className="navbar">
        {/* Navegação principal do site */}
        <Link to="/">{t('paginaPrincipal')}</Link>
        <Link to="/calendario">{t('calendario')}</Link>
        <Link to="/classificacoes">{t('classificacoes')}</Link>
        <Link to="/equipas">{t('equipas')}</Link>
        <Link to="/configuracoes">{t('configuracoes')}</Link>

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
      {/* Aqui o componente da rota atual é renderizado */}
      <Outlet />
      <footer className="footer">
        {t('construidoPor')}

        <Button size="sm" variant="ghost" onClick={() => i18n.changeLanguage('pt')}>
          🇵🇹
        </Button>

        <Button size="sm" variant="ghost" onClick={() => i18n.changeLanguage('en')}>
          🇬🇧
        </Button>
      </footer>
    </div>
  );
}

export default Layout;
