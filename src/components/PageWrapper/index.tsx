import { Flex } from '@chakra-ui/react';

const PageWrapper = ({ children }) => {
  return (
    <Flex direction="column" alignItems="center" justifyContent="flex-start" minHeight="100vh">
      {children}
    </Flex>
  );
};

export default PageWrapper;
