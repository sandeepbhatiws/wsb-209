import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import ContextAPI from '../ContextAPI/ContextAPI'

function MainLayout() {
    return (
        <>
        <ContextAPI>
            <ToastContainer/>

            <Header />

            <Outlet />

            <Footer/>
        </ContextAPI>
        </>
    )
}

export default MainLayout