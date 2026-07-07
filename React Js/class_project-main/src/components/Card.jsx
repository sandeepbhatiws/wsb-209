import React, { useContext, useState } from 'react'
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { CreateContext } from '../ContextAPI/ContextAPI';
function Card({ Data }) {

    // var getCartData = JSON.parse(localStorage.getItem('cartItems'));
    // const [cartItems, setCartItems] = useState(getCartData ?? []);

    // const addToCart = (productInfo) => {

    //     var checkCart = cartItems.filter((v) => {
    //         if(v.id == productInfo.id){
                
    //             return v;
    //         }
    //     })

    //     if(checkCart.length > 0){

    //         var updateCartData = cartItems.map((v) => {
    //             if(v.id == productInfo.id){
    //                 v.quantity++;
    //                 return v;
    //             } else {
    //                 return v;
    //             }
    //         })

    //         var finalData = [...updateCartData];
    //         setCartItems(finalData)

    //         toast.success('Update Cart');
    //         localStorage.setItem('cartItems', JSON.stringify(finalData))

    //     } else {
    //         const cartData = {
    //             id : productInfo.id,
    //             name : productInfo.name,
    //             price : productInfo.price,
    //             image : productInfo.image,
    //             description : productInfo.description,
    //             quantity : 1
    //         }

    //         var finalData = [cartData, ...cartItems];
    //         setCartItems(finalData)

    //         toast.success('Add to Cart');
    //         localStorage.setItem('cartItems', JSON.stringify(finalData))
    //     }
        
    // }

    let { addToCart } = useContext(CreateContext);

    return (
        <>
            {
                Data.map((v, i) => {
                    return (
                        <div key={i}>  <div className='w-full cursor-pointer'>
                            <div className='w-full h-4/5'>
                                <Link to={`/product/details/${v.category_slug}/${v.slug}`}>
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

                                <button onClick={ () => addToCart(v) } className='cursor-pointer  flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2'>
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

export default Card
