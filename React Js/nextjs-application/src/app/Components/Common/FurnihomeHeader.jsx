'use client'
import React, { useContext, useState } from 'react';
import { Search, Heart, ShoppingCart, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/app/ReduxToolkit/userSlice';
import { useRouter } from 'next/navigation';

export default function FurnihomeHeader() {

  const getCartItems = useSelector((items) => {
    return items.cart.cartItems
  })

  const userLogin = useSelector((login) => {
    return login.user_login.isLogin
  })


  const router = useRouter();

  const wishlist = () =>{
    router.push('/')
  }


  const dispatch  = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (mobileSearchOpen) {
      setSearchQuery(''); // Clear search when closing
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Main Header Content */}
        <div className="flex items-center justify-between gap-8">
          
          {/* Mobile Search Open - Show Back Button + Search */}
          {mobileSearchOpen && (
            <div className="flex items-center gap-3 flex-1 md:hidden">
              <button 
                onClick={handleMobileSearchToggle}
                className="text-gray-700 hover:text-amber-700 transition flex-shrink-0"
              >
                <ArrowLeft size={24} />
              </button>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent text-sm"
                />
              </div>
            </div>
          )}

          {/* Desktop + Mobile Logo Section */}
          {!mobileSearchOpen && (
            <>
              <div className='flex flex-1 items-center gap-7'>
                {/* Logo Section */}
                <div className="flex-shrink-0">
                  <h1 className="text-3xl font-bold tracking-wide">
                    <span className="text-gray-900">FURNI</span>
                    <span className="text-amber-700">HOME</span>
                  </h1>
                  <p className="text-xs text-gray-500 tracking-widest mt-1">LIVE BEAUTIFULLY</p>
                </div>

                {/* Search Bar - Desktop Only */}
                <div className="flex-1 max-w-2xl hidden md:block">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for products, categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:border-transparent text-sm"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-700 transition">
                      <Search size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-6">
                {/* Search Icon - Mobile Only */}
                <button 
                  onClick={handleMobileSearchToggle}
                  className="md:hidden text-gray-700 hover:text-amber-700 transition"
                >
                  <Search size={24} />
                </button>

                {/* Wishlist */}
                <div className='flex flex-col items-center justify-between' onClick={ wishlist }>
                  <div className="relative cursor-pointer group">
                    <Heart
                      size={24}
                      className="text-gray-700 group-hover:text-amber-700 transition"
                    />
                    <span className="absolute -top-2 -right-3 bg-amber-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      3
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 hidden md:block">Wishlist</span>
                </div>

                {/* Cart */}
                <div className='flex flex-col items-center justify-between'>
                  <Link href={'/view-cart'}>
                    <div className="relative cursor-pointer group">
                      <ShoppingCart
                        size={24}
                        className="text-gray-700 group-hover:text-amber-700 transition"
                      />
                      <span className="absolute -top-2 -right-3 bg-amber-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                        { getCartItems.length }
                      </span>
                    </div>
                    <span className="text-xs text-gray-600 hidden md:block">Cart</span>
                  </Link>
                </div>

                {/* Account */}

                <div className='flex flex-col items-center justify-between'>
                  {/* <Link href={'/login'}> */}

                  {
                    userLogin
                    ?
                    <>
                      <button onClick={ () => dispatch(logout())} className="text-gray-700 hover:text-amber-700 transition">
                        <User size={24} />
                      </button>
                      <span className="text-xs text-gray-600 hidden md:block">My Dashboard</span>
                    </>
                    :
                    <>
                      <button onClick={ () => dispatch(login()) } className="text-gray-700 hover:text-amber-700 transition">
                        <User size={24} />
                      </button>
                      <span className="text-xs text-gray-600 hidden md:block">Login</span>
                    </>
                  }
                    
                  {/* </Link> */}
                </div>


              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}