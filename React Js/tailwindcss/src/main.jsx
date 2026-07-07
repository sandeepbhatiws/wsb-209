import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Components/Home'
import './assets/css/style.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AboutUs from './Components/About'
import RootLayout from './Components/Common/RootLayout'

createRoot(document.getElementById('root')).render(
    <>
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout/>}>
                    <Route path='/' element={<Home />} />
                    <Route path='/about-us' element={<AboutUs />} />
                </Route>

                
                
                
            </Routes>
        </BrowserRouter>
    </>,
)
