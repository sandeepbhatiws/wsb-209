'use client'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Provider } from 'react-redux'
import { reduxStore } from '@/app/ReduxToolkit/ReduxToolkit'
import { ToastContainer } from 'react-toastify'

export default function Layout({ children }) {
    return (
        <>
            <Provider store={reduxStore}>

                <ToastContainer/>
                <Header />

                {children}

                <Footer />
            </Provider>
        </>
    )
}
