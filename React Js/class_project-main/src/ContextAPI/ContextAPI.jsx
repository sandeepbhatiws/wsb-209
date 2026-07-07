import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

var CreateContext = createContext();

export default function ContextAPI({children}) {

    var getCartData = JSON.parse(localStorage.getItem('cartItems'));
    const [cartItems, setCartItems] = useState(getCartData ?? []);

    const addToCart = (productInfo) => {
        var checkCart = cartItems.filter((v) => {
            if(v.id == productInfo.id){
                return v;
            }
        })

        if(checkCart.length > 0){
            var updateCartData = cartItems.map((v) => {
                if(v.id == productInfo.id){
                    if(v.quantity < 5){
                        v.quantity++;
                        toast.success('Update Cart');
                        return v;
                    } else {
                        toast.error('Maximum quantity reached.');
                        return v;
                    }
                    
                } else {
                    return v;
                }
            })

            var finalData = [...updateCartData];
            setCartItems(finalData)

            localStorage.setItem('cartItems', JSON.stringify(finalData))

        } else {
            const cartData = {
                id : productInfo.id,
                name : productInfo.name,
                price : productInfo.price,
                image : productInfo.image,
                description : productInfo.description,
                quantity : 1
            }

            var finalData = [cartData, ...cartItems];
            setCartItems(finalData)

            toast.success('Add to Cart');
            localStorage.setItem('cartItems', JSON.stringify(finalData))
        }
    }

    const removeCart = (id) => {
        if(confirm('Are you sure you want to delete ?')){
            const allProducts = cartItems.filter((v) => {
                if(v.id != id){
                    return v
                }
            })

            var finalData = [...allProducts];
            setCartItems(finalData)
            localStorage.setItem('cartItems', JSON.stringify(finalData))
            toast.success('Remove Item Succussfully')
            
        }
        
    }

    const updateCart = (id, type) => {
        if(type == 'increase'){
            
            const quantityUpdate = cartItems.map((v) => {
                if(v.id == id){
                    if(v.quantity < 5){
                        v.quantity++;

                        return v;
                    } else {
                        toast.error('Maximum Quantity Added')
                        return v;
                    }
                } else {
                    return v;
                }
            });

            var finalData = [...quantityUpdate];
            setCartItems(finalData)
            localStorage.setItem('cartItems', JSON.stringify(finalData))


        } else {
            const quantityUpdate = cartItems.map((v) => {
                if(v.id == id){
                    if(v.quantity > 1){
                        v.quantity--;
                        
                        return v;
                    } else {
                        toast.error('Minimun 1 Quantity Required')
                        return v;
                    }
                } else {
                    return v;
                }
            });

            var finalData = [...quantityUpdate];
            setCartItems(finalData)
            localStorage.setItem('cartItems', JSON.stringify(finalData))
        }
    }

    var data = { 
        cartItems,
        setCartItems,
        addToCart,
        removeCart,
        updateCart
     };

  return (
    <>
        <CreateContext.Provider value={ data }>
            {children}
        </CreateContext.Provider>
    </>
  )
}

export { CreateContext };