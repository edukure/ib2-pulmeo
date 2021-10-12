import { Flex } from '@chakra-ui/react';

function PageWrapper({ children, justifyContent = 'flex-start' }) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent={justifyContent}
      minHeight="100vh"
      bg="gray.200"
      px={4}
    >
      {children}
    </Flex>
  );
}

export default PageWrapper;
