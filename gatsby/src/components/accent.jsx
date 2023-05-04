import React from "react"
import { css, Global } from '@emotion/react'

import { theme } from "../styles/theme"

export const AccentGlobal = ({ primaryColor }) => {
    const accentKey = primaryColor
    let accent = theme.colors[accentKey]
    if (!accent) {
      // TODO: primaryColor is just a color
      accent = theme.colors["purple"]
    }

    const styles = React.useMemo(
      () => css`
        :root {
          --colors-accent-50: ${accent[50]};
          --colors-accent-100: ${accent[100]};
          --colors-accent-200: ${accent[200]};
          --colors-accent-300: ${accent[300]};
          --colors-accent-400: ${accent[400]};
          --colors-accent-500: ${accent[500]};
          --colors-accent-600: ${accent[600]};
          --colors-accent-700: ${accent[700]};
          --colors-accent-800: ${accent[800]};
          --colors-accent-900: ${accent[900]};
        }
      `,
      [accent]
    )
    return <Global styles={styles} />
  }