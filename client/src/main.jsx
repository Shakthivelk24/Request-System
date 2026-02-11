import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { UserDataProvider } from "../context/UserContext.jsx";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <UserDataProvider>
  <BrowserRouter >
    <App />
  </BrowserRouter>
  </UserDataProvider>
)
