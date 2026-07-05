
// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(true) // default dark

  useEffect(() => {
    // apply or remove .dark on <html>
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

// custom hook — use this anywhere
export const useTheme = () => useContext(ThemeContext)