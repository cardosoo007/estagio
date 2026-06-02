import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, HStack, List, Text } from '@chakra-ui/react';

function Marcadores() {
  const [listaMarcadores, setListaMarcadores] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);

  useEffect(() => {
    fetch(`/api/marcadores?pagina=${paginaAtual}&items=5`)
      .then(response => response.json())
      .then(data => {
        setListaMarcadores(data.items);
        setTotalPaginas(Math.ceil(data.total / 5));
      });
  }, [paginaAtual]);
  return (
    <Box>
      <Heading mb="2">Marcadores</Heading>
      <Text mb="4">melhores marcadores</Text>

      <List.Root>
        {listaMarcadores.map(marcador => (
          <List.Item key={marcador.id}>
            <Link to={`/jogadores/${marcador.id}`}>
              {marcador.nome} - {marcador.golos}
            </Link>
          </List.Item>
        ))}
      </List.Root>

      <HStack mt="4">
        <Button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 0}>
          Anterior
        </Button>

        <Text>
          Página {paginaAtual + 1} de {totalPaginas}
        </Text>

        <Button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas - 1}>
          Proxima
        </Button>
      </HStack>
    </Box>
  );
}

export default Marcadores;
