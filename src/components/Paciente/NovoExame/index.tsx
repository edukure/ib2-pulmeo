import { Box, Button, Stack, Heading, Text } from '@chakra-ui/react';

function NovoExame() {
  return (
    <Box p={4} w="100%" bg="white" maxW="container.md" rounded="lg" mb={8}>
      <Heading as="h2" color="gray.600" fontSize="lg">
        Novo exame
      </Heading>
      <Stack
        direction={{ base: 'column', sm: 'row' }}
        h={{ base: 'auto', sm: 40 }}
        mt={2}
        w="full"
      >
        <Button
          colorScheme="teal"
          minH={{ base: 24, sm: 16 }}
          w="full"
          justifyContent="center"
          alignItems="center"
        >
          <Text>Espirometria</Text>
        </Button>
        <Button
          colorScheme="orange"
          minH={{ base: 24, sm: 16 }}
          w="full"
          justifyContent="center"
          alignItems="center"
        >
          <Text>Oximetria</Text>
        </Button>

        <Box w={{ base: '100%', sm: '50%' }}></Box>
      </Stack>
    </Box>
  );
}

export default NovoExame;
