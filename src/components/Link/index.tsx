import React from 'react';
import NextLink from 'next/link';

import { Link as ChakraLink } from '@chakra-ui/react';
import type { LinkProps } from '@chakra-ui/react';

function Link({ children, href, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
}
export default Link;
