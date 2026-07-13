import { useEffect, useState } from 'react';
import { Badge, Box, Card, DatePicker, Heading, NativeSelect, Text } from '@chakra-ui/react';
import { parseDate } from '@internationalized/date';
import { useTranslation } from 'react-i18next';

// Lista de ligas disponíveis para o seletor do calendário.
// Esta lista serve como referência para os nomes e códigos das ligas que o utilizador pode escolher.
// Ter esta informação centralizada ajuda a manter o projeto organizado e evita divergências entre páginas.
const ligas = [
  { codigo: 'PPL', nome: 'Primeira Liga' },
  { codigo: 'PL', nome: 'Premier League' },
  { codigo: 'PD', nome: 'La Liga' },
  { codigo: 'SA', nome: 'Serie A' },
  { codigo: 'BL1', nome: 'Bundesliga' },
  { codigo: 'FL1', nome: 'Ligue 1' },
];

// Página de calendário de jogos.
// O fluxo desta página é bastante claro: quando a liga muda, é feito um pedido à API, os dados ficam guardados em estado
// e depois são filtrados por data para mostrar apenas os jogos do dia selecionado.
// Este é um bom exemplo de como o componente reage a alterações do utilizador e atualiza a interface de forma dinâmica.
function Calendario() {
  const { t } = useTranslation();
  const [jogos, setJogos] = useState([]);
  const [ligaSelecionada, setLigaSelecionada] = useState('PPL');
  const [dataEscolhida, setDataEscolhida] = useState('');

  useEffect(() => {
    fetch(`/api/jogos?liga=${ligaSelecionada}`)
      .then(response => response.json())
      .then(data => {
        setJogos(data);

        // Quando a liga muda, escolhe-se automaticamente a primeira data disponível.
        if (data.length > 0) {
          setDataEscolhida(data[0].data);
        }
      });
  }, [ligaSelecionada]);

  // Filtra os jogos para o dia que o utilizador escolheu no calendário.
  // Sem este passo, a interface mostraria todos os jogos de todas as datas e seria mais confusa.
  const jogosDoDia = jogos.filter(jogo => jogo.data === dataEscolhida);

  return (
    <Box>
      <Heading>{t('calendario')}</Heading>

      <NativeSelect.Root>
        <NativeSelect.Field value={ligaSelecionada} onChange={event => setLigaSelecionada(event.target.value)}>
          {ligas.map(liga => (
            <option value={liga.codigo} key={liga.codigo}>
              {liga.nome}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      <DatePicker.Root
        inline
        value={dataEscolhida ? [parseDate(dataEscolhida)] : []}
        onValueChange={event => {
          const data = event.value[0];

          if (data) {
            setDataEscolhida(data.toString());
          }
        }}
      >
        <DatePicker.View view="day">
          <DatePicker.Header />
          <DatePicker.DayTable />
        </DatePicker.View>

        <DatePicker.View view="month">
          <DatePicker.Header />
          <DatePicker.MonthTable />
        </DatePicker.View>

        <DatePicker.View view="year">
          <DatePicker.Header />
          <DatePicker.YearTable />
        </DatePicker.View>
      </DatePicker.Root>

      <Heading>Jogos do dia</Heading>

      {jogosDoDia.length === 0 && <Text>Não existem jogos neste dia.</Text>}

      {jogosDoDia.map(jogo => (
        <Card.Root key={jogo.id}>
          <Card.Body>
            <Text>
              {jogo.casa} vs {jogo.fora}
            </Text>

            {jogo.resultadoCasa !== null && jogo.resultadoFora !== null && (
              <Text>
                Resultado: {jogo.resultadoCasa} - {jogo.resultadoFora}
              </Text>
            )}

            <Badge>{jogo.hora}</Badge>
          </Card.Body>
        </Card.Root>
      ))}
    </Box>
  );
}

export default Calendario;
