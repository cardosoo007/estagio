import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      paginaPrincipal: 'Página Principal',
      calendario: 'Calendário',
      classificacoes: 'Classificações',
      equipas: 'Equipas',
      configuracoes: 'Configurações',
      pesquisarLiga: 'Pesquisar liga',
      construidoPor: 'Construido por Rodrigo Cardoso',

      entrar: 'Entrar',
      sair: 'Sair',
      terminarSessao: 'Terminar sessão',

      detalhesEquipa: 'Detalhes da Equipa',
      nome: 'Nome',
      nomeCurto: 'Nome curto',
      treinador: 'Treinador',
      estadio: 'Estádio',
      fundacao: 'Fundação',
      jogadores: 'Jogadores',
      posicao: 'Posição',
      nacionalidade: 'Nacionalidade',

      vitorias: 'Vitórias',
      empates: 'Empates',
      derrotas: 'Derrotas',

      gereEquipas: 'Gere as tuas equipas',
      nomeTreinador: 'Nome Treinador',
      idadeTreinador: 'Idade Treinador',
      pontos: 'Pontos',
      submeter: 'Submeter',

      textoConfiguracoes: 'Aqui é onde podes mostrar opções e ajustes do site.',
      verDatas: 'Vê as datas',
      anterior: 'Anterior',
      pagina: 'Página',
      de: 'de',
      proxima: 'Próxima',
    },
  },
  en: {
    translation: {
      paginaPrincipal: 'Home',
      calendario: 'Calendar',
      classificacoes: 'Standings',
      equipas: 'Teams',
      configuracoes: 'Settings',
      pesquisarLiga: 'Search league',
      construidoPor: 'Built by Rodrigo Cardoso',

      entrar: 'Login',
      sair: 'Logout',
      terminarSessao: 'End session',

      detalhesEquipa: 'Team Details',
      nome: 'Name',
      nomeCurto: 'Short name',
      treinador: 'Coach',
      estadio: 'Stadium',
      fundacao: 'Founded',
      jogadores: 'Players',
      posicao: 'Position',
      nacionalidade: 'Nationality',

      vitorias: 'Wins',
      empates: 'Draws',
      derrotas: 'Losses',

      gereEquipas: 'Manage your teams',
      nomeTreinador: 'Coach Name',
      idadeTreinador: 'Coach Age',
      pontos: 'Points',
      submeter: 'Submit',

      textoConfiguracoes: 'This is where you can show site options and settings.',
      verDatas: 'See dates',

      anterior: 'Previous',
      pagina: 'Page',
      de: 'of',
      proxima: 'Next',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
