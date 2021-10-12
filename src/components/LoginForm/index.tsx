import { Button } from '@chakra-ui/button';
import { Container, Flex, Text, VStack } from '@chakra-ui/layout';

function LoginForm() {
  return (
    <Flex
      alignItems={{ base: 'start', sm: 'center' }}
      w="100%"
      justify="center"
      flex={1}
      bgGradient="linear(to-b, teal.500, teal.900)"
    >
      <Flex
        rounded={{ base: 'initial', sm: 'lg' }}
        w={{ base: '100%', sm: 'auto' }}
        background="teal.300"
        overflow="hidden"
      >
        <Container textAlign="center" maxW="container.sm">
          <VStack
            alignItems="center"
            justify="center"
            flexDirection="column"
            spacing={8}
            h="full"
            px={12}
            py={6}
          >
            <Text color="white" fontWeight="bold" fontSize="24px">
              Bem Vindo
            </Text>

            {/* LOGO */}
            <Text color="white" fontWeight="bold" fontSize="24px">
              LOGO
            </Text>

            {/* texto PULMEO */}
            <Text color="white" fontWeight="bold" fontSize="24px">
              PULMEO
            </Text>

            <VStack spacing={2}>
              <Button
                // leftIcon={<GithubIcon />}
                background="teal.500"
                color="white"
                _hover={{ opacity: 0.6 }}
                fontWeight="normal"
                // onClick={() => signIn('github')}
              >
                entrar com Google
              </Button>
              {/* <Button variant="ghost" fontWeight="normal" color="gray.300">
                entrar como visitante
              </Button> */}
            </VStack>
          </VStack>
        </Container>
      </Flex>
    </Flex>
  );
}

export default LoginForm;
