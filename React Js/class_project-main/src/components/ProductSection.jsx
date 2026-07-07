import React from 'react'
import Card from './Card'

export default function ProductSection({ productData, type, title, tagline }) {
    return (
        <>
            <div className={`pt-5 lg:pt-8 ${ type == 2 ? 'bg-gray-200' : '' }`}>
                <div className='mx-auto px-4 sm:px-6 lg:px-8 pt-4 max-w-7xl'>
                    <h3 className='text-center text-2xl sm:text-3xl lg:text-4xl font-bold'>
                        {title}
                    </h3>
                    <p className='text-center text-sm sm:text-base lg:text-xl pt-3 sm:pt-4 capitalize'>
                        {tagline}
                    </p>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 px-4 sm:px-6 lg:px-8 py-5'>
                    <Card Data={productData} />
                </div>
            </div>
        </>
    )
}
