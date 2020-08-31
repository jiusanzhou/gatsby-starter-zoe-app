import colors from './colors';
import fonts from './fonts';
//import cards from './variants/cards';
import headings from './variants/headings';
import text from './variants/text';

const { fontFamily, fontSize, lineHeight } = fonts

export default {
  breakpoints: [640, 720, 1024, 1200, 1700],
  fontSizes: fontSize,
  fontWeights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  lineHeights: lineHeight,
  colors,
  space: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 128, 256],
  radii: [0, 4, 8, 16],
  fonts: fontFamily,
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .1)',
    medium: '0 0 16px rgba(0,0,0,.1)',
    large: '0 0 24px -2px rgba(0, 0, 0, .1)',
    hover: '0 0 24px 0px rgba(0, 0, 0, .12)',
  },
  maxWidths: [64, 128, 256, 512, 640, 960, 1120],

  //These are our custom variants
  variants: {
    headings: headings,
    text: text,
  },
}