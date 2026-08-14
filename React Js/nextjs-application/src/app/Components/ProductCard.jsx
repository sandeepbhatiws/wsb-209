import React, { useState } from 'react'
import { ShoppingCart, Star } from 'lucide-react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../ReduxToolkit/cartSlice';

function ProductCard({ Data }) {

    const dispatch = useDispatch();

    return (
        <>
            {
                Data.map((v, i) => {
                    return (
                        <div key={i}>  <div className='w-full cursor-pointer'>
                            <div className='w-full h-4/5'>
                                <Link href={`/product/details/${v.category_slug}/${v.slug}`}>
                                    <img className='w-full h-full object-cover' src={v.image} alt={v.name} />
                                </Link>
                            </div>
                            <div className='px-3 py-5  flex flex-col gap-3'>
                                <h3 className='text-xl pt-4'>{v.name} </h3>
                                <div className='flex justify-between'>
                                    <div className='flex gap-2' ><h5>₹ {v.price}</h5> 
                                    {/* <span className='line-through text-l'>₹ {v.mrp}</span> */}
                                    </div>
                                    <div className='flex items-center gap-1 pe-3'><Star size={16} /> <span> {v.rating}</span></div>
                                </div>

                                <button onClick={ () => dispatch(addToCart(v)) } className='cursor-pointer  flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2'>
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>

                            </div>
                        </div></div>
                    )
                })
            }


        </>
    )
}

export default ProductCard
