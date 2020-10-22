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
    backgroundDark: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapStyle: Array<any>
    text: {
      light: string
      dark: string
      input: string
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
