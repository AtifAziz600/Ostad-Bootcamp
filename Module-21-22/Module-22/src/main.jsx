import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./custom.css"

import "milligram/dist/milligram.min.css"

createRoot(document.getElementById('root')).render(
    <App />
)
