import { useState } from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import { ThemeProvider } from './components/themeProvider'

function App () {
  return (
    <>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <KanbanBoard/>
      </ThemeProvider>
    </>
  )
}

export default App
