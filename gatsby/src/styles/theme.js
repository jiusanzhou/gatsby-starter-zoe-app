import { theme as _theme, extendTheme } from "@chakra-ui/react"

const config = {
    initialColorMode: 'light',
    useSystemColor: true,
    fonts: {
        body: `"Source Sans Pro",${_theme.fonts.body}`,
        heading: `"Source Sans Pro",${_theme.fonts.heading}`,
    },
}

export const theme = extendTheme(config)