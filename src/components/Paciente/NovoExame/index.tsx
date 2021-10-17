import { Box, Button, Stack, Heading, Text } from '@chakra-ui/react';
import Link from '@components/Link';

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
        minW="full"
      >
        <Button
          as={Link}
          href={'/exames/espirometria'}
          colorScheme="teal"
          minH={{ base: 24, sm: 16 }}
          h="full"
          isFullWidth
          justifyContent="center"
          alignItems="center"
        >
          <Text>Espirometria</Text>
        </Button>
        <Button
          as={Link}
          href={'/exames/oximetria'}
          colorScheme="orange"
          minH={{ base: 24, sm: 16 }}
          isFullWidth
          h="full"
          justifyContent="center"
          alignItems="center"
        >
          <Text>Oximetria</Text>
        </Button>
      </Stack>
    </Box>
  );
}

export default NovoExame;
