import { expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Routes from './Routes';
import { Provider } from './components/ui/provider';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

test('vai da homepage para o calendário pela navbar', () => {
  window.history.pushState({}, '', '/');

  render(
    <Provider>
      <Routes />
    </Provider>,
  );

  expect(window.location.pathname).toBe('/');

  fireEvent.click(screen.getByText('calendario'));

  expect(window.location.pathname).toBe('/calendario');
});
