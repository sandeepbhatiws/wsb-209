import React from 'react'
import { Heart } from 'lucide-react'
import { Link } from 'react-router'

export default function ProductCard({ 
  id,
  image, 
  title, 
  originalPrice, 
  discountedPrice, 
  discountPercent,
  badge,
  extraOffer,
  prepaidOffer,
}) {
  
  return (
    <div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer'>
      
      {/* Image Container */}
      <div className='relative bg-gray-100 aspect-square overflow-hidden group'>
        <Link to={`/product/details/${id}`}>
          <img 
            src={image} 
            alt={title}
            className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
          />
        </Link>
        
        {/* Badge */}
        {badge && (
          <div className='absolute top-4 left-4 bg-[#3C1D04] text-white px-2 py-1 text-[9px] font-medium'>
            {badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button 
         
          className='absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition'
        >
          <Heart 
            size={20} 
            
          />
        </button>
      </div>

      {/* Content */}
      <div className='p-5 flex flex-col justify-between'>
        
        {/* Product Title */}
        <h3 className='text-[15px] font-semibold text-gray-900 mb-1 line-clamp-2 whitespace-nowrap'>
          {title}
        </h3>

        {/* Pricing Section */}
        <div className='mb-3'>
          <div className='flex items-center gap-3 mb-2'>
            <span className='text-[13px] font-bold text-amber-700'>
              Rs. {discountedPrice.toLocaleString()}
            </span>
            <span className='text-[13px] text-gray-400 line-through'>
              Rs. {originalPrice.toLocaleString()}
            </span>
          </div>
          
          {/* Discount Percent */}
          {discountPercent && (
            <p className='text-gray-900 font-medium text-[13px]'>
              Save {discountPercent}% off
            </p>
          )}
        </div>

        {/* Extra Offers */}
        {extraOffer && (
          <div className='mb-2 text-[13px]'>
            <p className='text-amber-700'>
              <span className='font-semibold'>Extra {extraOffer.percent}% off</span>
              <span className='text-gray-700'> — use code </span>
              <span className='font-bold text-amber-700'>{extraOffer.code}</span>
            </p>
          </div>
        )}

        {/* Prepaid Offer */}
        {prepaidOffer && (
          <div className='text-[13px]'>
            <p className='text-amber-700'>
              <span className='text-gray-700'>(Prepaid Orders — Get </span>
              <span className='font-semibold text-amber-700'>{prepaidOffer.percent}% off</span>
              <span className='text-gray-700'> with </span>
              <span className='font-bold text-amber-700'>{prepaidOffer.code}</span>
              <span className='text-gray-700'>)</span>
            </p>
          </div>
        )}

        {/* Add to Cart Button */}
        <button className='w-full mt-5 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer'>
          Add to Cart
        </button>
      </div>
    </div>
  )
}