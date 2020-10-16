import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string
    primary400: string
    primary600: string
    secundary: string
    secundary400: string
    secundary600: string
    background: string
    backgroundSecundary: string
    text: {
      light: string
      dark: string
    }
    actions: {
      success: {
        dark: string
        light: string
      }
      error: {
        dark: string
        light: string
      }
      disable: {
        dark: string
        light: string
      }
    }
  }
}
