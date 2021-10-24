import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

import { fonts } from './fonts';
import { breakpoints } from './breakpoints';

const theme = extendTheme({
  components: {
    Steps,
  },
  fonts,
  breakpoints,
});

export default theme;

export { fonts, breakpoints };
