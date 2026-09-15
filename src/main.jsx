import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from "react-router/dom";
import {router} from "./router/router.jsx";
import "./styles/index.css";
import './i18n' // Import i18n configuration

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
