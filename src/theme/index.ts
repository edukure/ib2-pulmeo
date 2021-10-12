import { extendTheme } from '@chakra-ui/react';

import { fonts } from './fonts';
import { breakpoints } from './breakpoints';

const theme = extendTheme({
  fonts,
  breakpoints,
});

export default theme;

export { fonts, breakpoints };
