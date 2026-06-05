import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, HStack, List, Text } from '@chakra-ui/react';

function Marcadores() {
  // Lista de melhores marcadores retornada pela API.
  const [listaMarcadores, setListaMarcadores] = useState([]);
  // Página atual para paginação.
  const [paginaAtual, setPaginaAtual] = useState(0);
  // Total de páginas com base no número total de marcadores.
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Fetch de marcadores ao mudar a página.
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

      {/* Lista de marcadores com links para a página de detalhe do jogador */}
      <List.Root>
        {listaMarcadores.map(marcador => (
          <List.Item key={marcador.id}>
            <Link to={`/jogadores/${marcador.id}`}>
              {marcador.nome} - {marcador.golos}
            </Link>
          </List.Item>
        ))}
      </List.Root>

      {/* Controles de paginação */}
      <HStack mt="4">
        <Button onClick={() => setPaginaAtual(paginaAtual - 1)} disabled={paginaAtual === 0}>
          Anterior
        </Button>

        <Text>
          Página {paginaAtual + 1} de {totalPaginas}
        </Text>

        <Button onClick={() => setPaginaAtual(paginaAtual + 1)} disabled={paginaAtual === totalPaginas - 1}>
          Próxima
        </Button>
      </HStack>
    </Box>
  );
}

export default Marcadores;
