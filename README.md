# Estágio - Aplicação de Liga de Futebol

Este projeto é uma aplicação web em React para explorar informação de futebol, com foco em:

- calendário de jogos;
- lista de equipas;
- detalhes de cada equipa;
- classificações por liga;
- autenticação com Auth0;
- suporte a múltiplos idiomas.

## O que esta aplicação faz

A aplicação permite navegar entre diferentes secções de uma competição de futebol, consultar jogos, ver equipas e acompanhar a classificação das ligas. O projeto também inclui uma área administrativa protegida e uma navegação comum com selector de liga.

## Tecnologias principais

- React 19
- Vite
- React Router DOM
- Chakra UI
- TanStack Query
- i18next
- Auth0
- Vitest

## Estrutura do projeto

- src/App.jsx: página inicial simples da aplicação.
- src/Layout.jsx: layout comum com navegação, seletor de liga e autenticação.
- src/Routes.jsx: definição das rotas principais da aplicação.
- src/Calendario.jsx: consulta e visualização do calendário de jogos.
- src/Equipas.jsx: lista paginada de equipas.
- src/Equipa.jsx: detalhes de uma equipa específica.
- src/Classificacoes.jsx: tabela de classificações com ordenação local.
- src/Configuracoes.jsx: espaço reservado para futuras definições.
- src/admin/Admin.jsx: área administrativa protegida.
- src/main.jsx: ponto de entrada da app, com providers globais.

## Como correr localmente

1. Instala as dependências:
   npm install
2. Inicia o servidor de desenvolvimento:
   npm run dev
3. Para criar uma build de produção:
   npm run build

## Variáveis de ambiente

A aplicação espera algumas variáveis de ambiente para autenticação, por exemplo:

- VITE_AUTH0_DOMAIN
- VITE_AUTH0_CLIENT_ID
- VITE_AUTH0_AUDIENCE

## Notas importantes para o futuro

- A comunicação com o backend é feita através de endpoints com prefixo /api.
- O estado de dados mais complexo é gerido com TanStack Query.
- O projeto já está preparado para internacionalização com i18next.
- Os comentários inline foram adicionados para facilitar a compreensão e a evolução futura do projeto.
