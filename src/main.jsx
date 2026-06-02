import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from './components/ui/provider';
import './index.css';
import Routes from './Routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <Routes />
    </Provider>
  </StrictMode>,
);
