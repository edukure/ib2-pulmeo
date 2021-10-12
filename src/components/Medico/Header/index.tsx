import {
  Container,
  Flex,
  Image,
  Heading,
  Avatar,
  Text,
  VStack,
} from '@chakra-ui/react';

function Header({ medico }) {
  return (
    <Container
      maxW="container.md"
      my={8}
      overflow="hidden"
      bg="white"
      p={0}
      rounded="lg"
      pb={2}
    >
      <Flex
        bg="#C9E5E6"
        h={32}
        roundedTop="lg"
        alignItems="center"
        justifyContent="center"
      >
        <Image src="/pulmeo-logo.png" width="250px" alt="logo pulmeo" />
      </Flex>

      <Flex>
        <Avatar
          src={medico.image}
          size="2xl"
          borderWidth={4}
          borderColor="white"
          marginTop={-10}
          marginLeft={8}
        />
        <VStack ml={4} mt={4} alignItems="left">
          <Heading as="h2" fontSize="2xl" bg="white">
            {medico.nome}
          </Heading>
          <Text bg="white">CRM: {medico.crm}</Text>
        </VStack>
      </Flex>
    </Container>
  );
}

export default Header;
