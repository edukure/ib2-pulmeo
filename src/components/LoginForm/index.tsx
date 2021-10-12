import { Container, Flex, Box, VStack, Image, Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';

function LoginForm() {
  return (
    <Flex
      alignItems={{ base: 'start', sm: 'center' }}
      w="100%"
      justify="center"
      flex={1}
      bg="gray.200"
    >
      <Flex
        rounded={{ base: 'initial', sm: 'lg' }}
        w={{ base: '100%', sm: 'auto' }}
        h={{ base: '100vh', sm: 'auto' }}
        background="#C9E5E6"
        overflow="hidden"
      >
        <Container textAlign="center" maxW="container.sm">
          <VStack
            alignItems="center"
            justify="center"
            flexDirection="column"
            spacing={16}
            h="full"
            px={12}
            py={8}
          >
            {/* LOGO */}
            <Image src="/pulmeo-logo.png" width="250px" alt="logo pulmeo" />

            <Box>
              <Button
                // leftIcon={<GithubIcon />}
                background="teal.500"
                color="white"
                _hover={{ opacity: 0.6 }}
                fontWeight="normal"
                onClick={() => signIn('google')}
              >
                entrar com Google
              </Button>
            </Box>
          </VStack>
        </Container>
      </Flex>
    </Flex>
  );
}

export default LoginForm;
