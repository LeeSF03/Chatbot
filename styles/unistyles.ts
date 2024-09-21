import { UnistylesRegistry } from 'react-native-unistyles'
import { breakpoints } from './breakpoints'
import { light, dark } from './themes'

type AppBreakpoints = typeof breakpoints

type AppThemes = {
  light: typeof light
  dark: typeof dark
}

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    dark,
    light,
  })
  .addConfig({
    adaptiveThemes: true, // this will override theme selected in the app
  })
