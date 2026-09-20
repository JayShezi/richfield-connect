/*
  main.jsx - Entry point of the React application.

  This file:
  - Imports necessary React and ReactDOM modules.
  - Imports the global stylesheet and the root App component.
  - Uses React 18's createRoot API to create a root React DOM node.
  - Wraps the App component in React's StrictMode to help identify potential problems.
  - Renders the App component inside the HTML element with id 'root', bootstrapping the React app.
*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
