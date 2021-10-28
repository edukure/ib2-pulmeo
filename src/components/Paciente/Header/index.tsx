import {
  Container,
  Flex,
  Stack,
  Image,
  Heading,
  Avatar,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
} from '@chakra-ui/react';

// type HeaderPacienteProps = {
//   nome: string;
//   idade: number;
//   foto: string;
//   fumante: boolean;
//   covid: boolean;
// };

function Header({
  nome,
  idade,
  image,
  email = 'email@gmail.com',
  fumante,
  teveCovid,
  doencaRespiratoria = '',
}) {
  return (
    <Container
      w="100%"
      maxW="container.md"
      mt={8}
      overflow="hidden"
      bg="white"
      rounded="lg"
      p={0}
      pb={{ base: 4, sm: 2 }}
    >
      <Flex
        bg="#C9E5E6"
        h={32}
        roundedTop="lg"
        alignItems="center"
        justifyContent="center"
      >
        <Image src="/pulmeo-logo.png" height={32} alt="logo pulmeo" />
      </Flex>

      <Stack
        direction={{ base: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent={{ base: 'center', sm: 'space-around' }}
        spacing={{ base: 2, sm: 4 }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          direction={{ base: 'column', sm: 'row' }}
          spacing={{ base: 2, sm: 4 }}
        >
          <Avatar
            src={image}
            size="2xl"
            borderWidth={4}
            borderColor="white"
            marginTop={-10}
          />
          <Box textAlign={{ base: 'center', sm: 'left' }}>
            <Heading as="h2" fontSize="2xl" bg="white">
              {nome}, {idade}
            </Heading>
            <Text>{email}</Text>
          </Box>
        </Stack>

        <Table bg="white" maxW="100px" rounded="lg" size="sm">
          <Thead>
            <Tr>
              <Th>fumante</Th>
              <Th>covid</Th>
              <Th>doença respiratória</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr h={8}>
              <Td textAlign="center">
                <Text>{fumante ? 'sim' : 'não'}</Text>
              </Td>
              <Td textAlign="center">{teveCovid ? 'sim' : 'não'}</Td>
              <Td textAlign="center">{doencaRespiratoria || 'nenhuma'}</Td>
            </Tr>
            <Tr></Tr>
          </Tbody>
        </Table>
      </Stack>
    </Container>
  );
}

// nome: 'Eduardo',
// foto: https://randomuser.me/api/portraits/men/75.jpg
// idade: 23,
// altura: '1,58m',
// peso: '60kg',
// fumante: false,
// covid: false,
// doencaRespiratoria: '',
// email: 'tioma.eduardo@gmail.com',

export default Header;
