import { createContext, useContext, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: Theme
  setTheme: (theme: Theme) => void
  resetTheme: () => void
  defaultTheme: Theme
}

const ThemeContext = createContext<ThemeProviderState>({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: () => null,
  resetTheme: () => null,
  defaultTheme: 'light',
})

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('dark')
    root.classList.add('light')
  }, [])

  const contextValue: ThemeProviderState = {
    theme: 'light',
    resolvedTheme: 'light',
    setTheme: () => null, // No-op to force light theme
    resetTheme: () => null,
    defaultTheme: 'light',
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
