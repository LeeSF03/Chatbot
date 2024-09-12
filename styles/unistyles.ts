import { breakpoints } from "./breakpoints";
import { light, dark } from "./themes";

type AppBreakpoints = typeof breakpoints;

type AppThemes = {
  light: typeof light;
  dark: typeof dark;
};

declare module "react-native-unistyles" {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

import { UnistylesRegistry } from "react-native-unistyles";

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light,
    dark,
  })
  .addConfig({
    // you can pass here optional config described below
    adaptiveThemes: true,
  });
