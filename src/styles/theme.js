import { theme as _theme } from "@chakra-ui/react"

export const theme = {
    ..._theme,
    fonts: {
        ..._theme.fonts,
        body: `"Source Sans Pro",${_theme.fonts.body}`,
        heading: `"Source Sans Pro",${_theme.fonts.heading}`,
    },
}