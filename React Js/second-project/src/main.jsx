import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Counter from './Counter'
import './assets/css/style.css'
import ShowHidePassword from './ShowHidePassword'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Counter/> */}

    <ShowHidePassword/>
  </StrictMode>,
)
