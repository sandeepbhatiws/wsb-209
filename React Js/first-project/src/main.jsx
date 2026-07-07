import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './HomePage'
import Header from './Header'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Header/> */}
    <HomePage/>
    {/* <HomePage></HomePage> */}
  </StrictMode>,
)
