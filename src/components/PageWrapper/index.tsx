import { Flex } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';

function PageWrapper({ children, justifyContent = 'flex-start' }) {
  return (
    <Flex
      bg="gray.200"
      justifyContent="center"
      minHeight="100vh"
      p={{ base: 2, md: 0 }}
    >
      <Flex
        direction="column"
        alignItems="center"
        justifyContent={justifyContent}
        maxW="container.md"
        w="full"
      >
        <button onClick={() => signOut()}> deslogar</button>
        {children}
      </Flex>
    </Flex>
  );
}

export default PageWrapper;
