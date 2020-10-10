import React from "react"
import { css, Global } from '@emotion/core'

import { theme } from "../styles/theme"

export const AccentGlobal = () => {
    const accentKey = "teal"
    const accent = theme.colors[accentKey]
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
      [accentKey]
    )
    return <Global styles={styles} />
  }