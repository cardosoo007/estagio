import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from './components/ui/provider';
import './index.css';
import Routes from './Routes.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        useRefreshTokens
        cacheLocation="localstorage"
      >
        <Provider>
          <Routes />
        </Provider>
      </Auth0Provider>
    </QueryClientProvider>
  </StrictMode>,
);
