// @flow
import { rgba, darken } from 'polished';

import spectrum from './spectrum';
import pallete from './pallete';

export default {
  pallete: pallete, //for use on objects and for extended background options
  background: {
    default: spectrum.white,
    tint1: spectrum.neutral[0],
    tint2: pallete.neutral.light,
    overlay: rgba(spectrum.neutral[7], 0.7),
  },

  border: {
    muted: spectrum.neutral[0],
    default: spectrum.neutral[1],
    dark: spectrum.neutral[4],

    primary: pallete.blue.base,
    secondary: pallete.teal.base,
  },

  button: {
    primary: pallete.blue.base,
    secondary: pallete.teal.base,
    ghost: spectrum.white,

    base: pallete.neutral.darkest,
    muted: spectrum.neutral[2],
    disabled: spectrum.neutral[1],
    success: pallete.green.base,
    info: pallete.cyan.base,
    danger: pallete.red.base,
    warning: pallete.yellow.base,
  },

  text: {
    muted: spectrum.neutral[6],
    default: pallete.neutral.dark,
    dark: rgba(darken(0.13, pallete.neutral.darkest), 0.85),
    light: spectrum.white,
    selected: pallete.blue.base,

    primary: pallete.blue.base,
    secondary: pallete.teal.base,

    success: pallete.green.base,
    info: pallete.blue.light,
    danger: pallete.red.base,
    warning: pallete.yellow.base,
  },

  icon: {
    muted: spectrum.neutral[4],
    default: spectrum.neutral[6],
    selected: pallete.blue.base,

    success: pallete.green.base,
    info: pallete.cyan.base,
    danger: pallete.red.base,
    warning: pallete.yellow.base,
  },
}
