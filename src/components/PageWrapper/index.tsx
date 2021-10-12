import { Flex } from '@chakra-ui/react';

function PageWrapper({ children }) {
  return (
    <Flex
      px={{ base: 4, md: 0 }}
      pb={8}
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="100vh"
      bg="gray.200"
    >
      {children}
    </Flex>
  );
}

export default PageWrapper;
