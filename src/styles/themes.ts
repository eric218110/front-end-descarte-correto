import { DefaultTheme } from 'styled-components'

export const light: DefaultTheme = {
  primary: '#285d19',
  primary400: '#568b44',
  primary600: '#003200',
  secundary: '#12493e',
  secundary400: '#417568',
  secundary600: '#002118',
  background: '#F8F9FB',
  backgroundSecundary: '#E7F4ED',
  backgroundDark: '#95A39C',
  text: {
    dark: '#000000',
    light: '#ffffff'
  },
  actions: {
    disable: {
      light: '#d1d1d1',
      dark: '#a0a0a0'
    },
    success: {
      light: '#80e27e',
      dark: '#005005'
    },
    error: {
      light: '#f05545',
      dark: '#7f0000'
    }
  }
}

export const dark: DefaultTheme = {
  primary: '#2B6337',
  primary400: '#589162',
  primary600: '#003810',
  secundary: '#3f8777',
  secundary400: '#6fb7a6',
  secundary600: '#045a4b',
  background: '#111e25',
  backgroundSecundary: '#38454d',
  backgroundDark: '#00000f',
  text: {
    dark: '#000000',
    light: '#ffffff'
  },
  actions: {
    disable: {
      light: '#263238',
      dark: '#121212'
    },
    success: {
      light: '#80e27e',
      dark: '#005005'
    },
    error: {
      light: '#f05545',
      dark: '#7f0000'
    }
  }
}
