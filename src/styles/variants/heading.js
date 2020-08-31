import colors from '../colors';
import fonts from '../fonts';

const { fontFamily, fontSize, lineHeight } = fonts;

export default {
  hero: {
    fontSize: fontSize['1000'],
    fontWeight: 700,
    lineHeight: lineHeight['1000'],
    // letterSpacing: '-0.2px',
    fontFamily: fontFamily.serif,
    color: colors.text.dark,
  },
  '900': {
    fontSize: fontSize['900'],
    fontWeight: 800,
    lineHeight: lineHeight['900'],
    // letterSpacing: '-0.2px',
    fontFamily: fontFamily.serif,
    color: colors.text.dark,
  },
  '800': {
    fontSize: fontSize['800'],
    fontWeight: 800,
    lineHeight: lineHeight['800'],
    // letterSpacing: '-0.2px',
    fontFamily: fontFamily.serif,
    color: colors.text.dark,
  },
  '700': {
    fontSize: fontSize['700'],
    fontWeight: 700,
    lineHeight: lineHeight['700'],
    letterSpacing: '-0.1px',
    // fontFamily: fontFamily.display,
    color: colors.text.dark,
  },
  '600': {
    fontSize: fontSize['600'],
    fontWeight: 700,
    lineHeight: lineHeight['600'],
    letterSpacing: '-0.1px',
    // fontFamily: fontFamily.display,
    color: colors.text.dark,
  },
  '500': {
    fontSize: fontSize['500'],
    fontWeight: 700,
    lineHeight: lineHeight['500'],
    letterSpacing: '-0.07px',
    // fontFamily: fontFamily.ui,
    color: colors.text.dark,
  },
  '400': {
    fontSize: fontSize['400'],
    fontWeight: 600,
    lineHeight: lineHeight['400'],
    letterSpacing: '-0.2px',
    // fontFamily: fontFamily.ui,
    color: colors.text.dark,
  },
  '300': {
    fontSize: fontSize['300'],
    fontWeight: 600,
    lineHeight: lineHeight['300'],
    letterSpacing: '0',
    // fontFamily: fontFamily.ui,
    color: colors.text.dark,
  },
  '200': {
    fontSize: fontSize['200'],
    fontWeight: 600,
    lineHeight: lineHeight['200'],
    letterSpacing: '0',
    // fontFamily: fontFamily.ui,
    color: colors.text.muted,
  },
  '100': {
    fontSize: fontSize['200'],
    fontWeight: 600,
    textTransform: 'uppercase',
    lineHeight: lineHeight['300'],
    letterSpacing: '0',
    // fontFamily: fontFamily.ui,
    color: colors.text.default,
  },
}