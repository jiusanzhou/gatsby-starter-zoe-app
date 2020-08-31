// @flow
import { darken } from 'polished';

import spectrum from './spectrum';

const lightest = 0;
const light = 3;
const base = 5;
const dark = 9;

const darkest = color => {
  return darken(0.1, color);
};

export default {
  neutral: {
    lightest: spectrum.neutral[lightest],
    light: spectrum.neutral[1],
    medium: spectrum.neutral[3],
    base: spectrum.neutral[7],
    dark: spectrum.neutral[dark],
    darkest: darkest(spectrum.neutral[dark]),
    white: spectrum.white,
  },
  red: {
    lightest: spectrum.red[lightest],
    light: spectrum.red[light],
    base: spectrum.red[base],
    dark: spectrum.red[dark],
    darkest: darkest(spectrum.red[dark]),
  },
  pink: {
    lightest: spectrum.pink[lightest],
    light: spectrum.pink[light],
    base: spectrum.pink[base],
    dark: spectrum.pink[dark],
    darkest: darkest(spectrum.pink[dark]),
  },
  grape: {
    lightest: spectrum.grape[lightest],
    light: spectrum.grape[light],
    base: spectrum.grape[base],
    dark: spectrum.grape[dark],
    darkest: darkest(spectrum.grape[dark]),
  },
  violet: {
    lightest: spectrum.violet[lightest],
    light: spectrum.violet[light],
    base: spectrum.violet[base],
    dark: spectrum.violet[dark],
    darkest: darkest(spectrum.violet[dark]),
  },
  indigo: {
    lightest: spectrum.indigo[lightest],
    light: spectrum.indigo[light],
    base: spectrum.indigo[base],
    dark: spectrum.indigo[dark],
    darkest: darkest(spectrum.indigo[dark]),
  },
  blue: {
    lightest: spectrum.blue[lightest],
    light: spectrum.blue[light],
    base: spectrum.blue[base],
    dark: spectrum.blue[dark],
    darkest: darkest(spectrum.blue[dark]),
  },
  turquoise: {
    lightest: spectrum.turqouise[lightest],
    light: spectrum.turqouise[light],
    base: spectrum.turqouise[base],
    dark: spectrum.turqouise[dark],
    darkest: darkest(spectrum.turqouise[dark]),
  },
  cyan: {
    lightest: spectrum.cyan[lightest],
    light: spectrum.cyan[light],
    base: spectrum.cyan[base],
    dark: spectrum.cyan[dark],
    darkest: darkest(spectrum.cyan[dark]),
  },
  teal: {
    lightest: spectrum.teal[lightest],
    light: spectrum.teal[light],
    base: spectrum.teal[base],
    dark: spectrum.teal[dark],
    darkest: darkest(spectrum.teal[dark]),
  },
  green: {
    lightest: spectrum.green[lightest],
    light: spectrum.green[light],
    base: spectrum.green[base],
    dark: spectrum.green[dark],
    darkest: darkest(spectrum.green[dark]),
  },
  lime: {
    lightest: spectrum.lime[lightest],
    light: spectrum.lime[light],
    base: spectrum.lime[base],
    dark: spectrum.lime[dark],
    darkest: darkest(spectrum.lime[dark]),
  },
  yellow: {
    lightest: spectrum.yellow[lightest],
    light: spectrum.yellow[light],
    base: spectrum.yellow[base],
    dark: spectrum.yellow[dark],
    darkest: darkest(spectrum.yellow[dark]),
  },
  orange: {
    lightest: spectrum.orange[lightest],
    light: spectrum.orange[light],
    base: spectrum.orange[base],
    dark: spectrum.orange[dark],
    darkest: darkest(spectrum.orange[dark]),
  },
}