import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import {
  light as lightBase,
  dark as darkBase,
  PancakeTheme
} from '@pancakeswap-libs/uikit';


const CACHE_KEY = 'IS_DARK'

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

// customize light theme
const light: PancakeTheme = lightBase;
light.colors.text = '#e6d4d4';
light.card.background = '#f3f0f0';
light.card.cardHeaderBackground = {
  default: 'coral',
  violet: 'goldenrod',
  blue: 'aquamarine'
};

// customize dark theme
const dark: PancakeTheme = darkBase;
dark.colors.background = '#1f1818'
dark.nav.background = '#13130f'
dark.colors.text = '#e6d7d7';
dark.card.background = '#111';
dark.card.cardHeaderBackground = {
  default: 'bisque',
  violet: 'chartreuse',
  blue: 'blueviolet'
};


const ThemeContext = React.createContext<ThemeContextType>({ isDark: false, toggleTheme: () => null })

const ThemeContextProvider: React.FC = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })

  const toggleTheme = () => {
    setIsDark((prevState: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
