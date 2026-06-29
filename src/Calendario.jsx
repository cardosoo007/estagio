import { useEffect, useState } from 'react';
import { Box, DatePicker, Heading, NativeSelect, Text } from '@chakra-ui/react';
import { parseDate } from '@internationalized/date';

const ligas = [
  { codigo: 'PPL', nome: 'Primeira Liga' },
  { codigo: 'PL', nome: 'Premier League' },
  { codigo: 'PD', nome: 'La Liga' },
  { codigo: 'SA', nome: 'Serie A' },
  { codigo: 'BL1', nome: 'Bundesliga' },
  { codigo: 'FL1', nome: 'Ligue 1' },
];

function Calendario() {
  const [jogos, setJogos] = useState([]);
  const [ligaSelecionada, setLigaSelecionada] = useState('PPL');
  const [dataEscolhida, setDataEscolhida] = useState('');

  useEffect(() => {
    fetch(`/api/jogos?liga=${ligaSelecionada}`)
      .then(response => response.json())
      .then(data => {
        setJogos(data);

        if (data.length > 0) {
          setDataEscolhida(data[0].data);
        } else {
          setDataEscolhida('');
        }
      });
  }, [ligaSelecionada]);

  const jogosDoDia = jogos.filter(jogo => jogo.data === dataEscolhida);

  return (
    <Box p="5">
      <Heading size="lg" mb="4">
        Calendário de Jogos
      </Heading>

      <Box mb="5" maxW="360px">
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
      </Box>

      <Box maxW="360px">
        <DatePicker.Root
          inline
          size="sm"
          value={dataEscolhida ? [parseDate(dataEscolhida)] : []}
          onValueChange={event => {
            setDataEscolhida(event.valueAsString[0]);
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
      </Box>

      <Box mt="5">
        <Heading size="md" mb="3">
          Jogos do dia
        </Heading>

        {jogosDoDia.length === 0 && <Text>Não existem jogos neste dia.</Text>}

        {jogosDoDia.map(jogo => (
          <Box key={jogo.id} borderWidth="1px" p="3" borderRadius="md" mb="2">
            <Text fontWeight="bold">
              {jogo.casa} vs {jogo.fora}
            </Text>

            <Text>{jogo.hora}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Calendario;
