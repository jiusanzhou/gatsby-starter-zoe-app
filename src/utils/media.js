const dimensions = ['xs', 'sm', 'md', 'lg', 'xl']

const breakpoints = {
  xs: 0,
  sm: 48,
  md: 64,
  lg: 76,
  xl: 86,
}

const width = (m, dim, css) => {
  return `@media (${m}-width:${dim}px) {
    ${css};
  }`
}

export const min = (dim, css) => {
  return width('min', dim, css)
}

export const max = (dim, css) => {
  return width('max', dim, css)
}