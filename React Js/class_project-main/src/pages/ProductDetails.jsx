import React, { useEffect, useState } from 'react'
import { Heart, ShoppingCart, Star, Truck, RotateCcw, Shield, Check } from 'lucide-react'
import { useParams } from 'react-router';
import axios from 'axios';

export default function ProductDetails() {

  const params = useParams();

  console.log(params.slug)

  const [productDetails, setProductDetails] = useState('');
  const [singleImage, setSingleImage] = useState('');
  const [multipleImages, setMultipleImages] = useState([]);

  useEffect(() => {
    axios.get((`https://wscubetech.co/ecommerce-api/productdetails.php?slug=${params.slug}`))
    .then((result) => {
      setProductDetails(result.data.product);
      setSingleImage(result.data.product.image);
      setMultipleImages(result.data.product.multiple_images);
    })
  }, [])


   const product = {
    id: 8672473514174,
  
    title: "Acquis Parawood 6 Seater Dining Table",
  
    sku: "LS-1080",
  
    category: "Dining Tables",
  
    brand: "Living Shapes",
  
    description:
      "Acquis is a refined 6 seater dining table crafted entirely from premium parawood, showcasing both strength and sophistication. Its broad dual-leg design provides architectural balance while the spacious tabletop offers ample room for family gatherings and everyday dining.",
  
    images: [
      "https://cdn.shopify.com/s/files/1/0644/0710/9822/files/LS-1080.jpg?v=1768651891",
      "https://cdn.shopify.com/s/files/1/0644/0710/9822/files/LS-1080-1.jpg?v=1768651891",
      "https://cdn.shopify.com/s/files/1/0644/0710/9822/files/LS-1080-Size.jpg?v=1768651891",
      "https://cdn.shopify.com/s/files/1/0644/0710/9822/files/LS-1080-2.jpg?v=1768651891",
      "https://cdn.shopify.com/s/files/1/0644/0710/9822/files/LS-1080-4.jpg?v=1768651891",
      "https://cdn.shopify.com/s/files/1/0644/0710/9822/files/LS-1080-5.jpg?v=1768651891",
      "https://cdn.shopify.com/s/files/1/0644/0710/9822/files/LS-1080-3.jpg?v=1768651891"
    ],
  
    pricing: {
      originalPrice: 89999,
      discountedPrice: 62999,
      discountPercent: 30
    },
  
    badge: "Ready To Ship",
  
    rating: 4.8,
  
    reviews: 126,
  
    stock: true,
  
    extraOffer: {
      percent: 10,
      code: "EXTRA10"
    },
  
    prepaidOffer: {
      percent: 5,
      code: "PREPAID5"
    },
  
    specifications: {
      Material: "Parawood",
      Finish: "Natural Wood",
      Seating: "6 Seater",
      Assembly: "Required",
      Warranty: "12 Months",
      Country: "India"
    },
  
    features: [
      "Premium Parawood Construction",
      "Modern Luxury Design",
      "Durable Wooden Finish",
      "Perfect For Family Dining",
      "Spacious Table Top",
      "Strong Dual-Leg Support"
    ],
  
    dimensions: {
      Length: "180 cm",
      Width: "90 cm",
      Height: "76 cm"
    },
  
    careInstructions: [
      "Wipe with soft dry cloth",
      "Avoid direct sunlight",
      "Keep away from excessive moisture",
      "Do not use harsh chemicals"
    ],
  
    deliveryInfo: {
      shipping: "Free Shipping",
      dispatch: "3-5 Business Days",
      delivery: "7-12 Business Days"
    }
  };
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('details')

  if (!product) return <div className='text-center py-12'>Product not found</div>

  const { pricing, images, specifications, dimensions, features, careInstructions, deliveryInfo } = product

  return (
    <div className='max-w-7xl mx-auto px-6 py-8'>

      {/* Breadcrumb */}
      <div className='text-sm text-gray-500 mb-8'>
        <a href='/' className='hover:text-amber-700'>Home</a>
        <span className='mx-2'>/</span>
        <a href='/shop' className='hover:text-amber-700'>Shop</a>
        <span className='mx-2'>/</span>
        <span className='text-gray-700'>{productDetails.name}</span>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12'>

        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className='bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square'>
            <img
              src={singleImage}
              alt={productDetails.name}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Thumbnail Images */}
          <div className='grid grid-cols-5 gap-3'>
            {multipleImages.map((image, idx) => (
              <button
                key={idx}
                // onClick={() => setSelectedImage(idx)}

                onClick={ () => {
                  setSingleImage(image)
                } }
                className={`bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer border-2 transition ${selectedImage === idx ? 'border-amber-700' : 'border-transparent hover:border-gray-300'
                  }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${idx + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>

          {/* Badge */}
          {product.badge && (
            <div className='inline-block bg-[#3c1d04] text-white px-4 py-2 text-sm font-medium mb-4'>
              {product.badge}
            </div>
          )}

          {/* Title */}
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>
            {productDetails.name}
          </h1>

          {/* Brand */}
          <p className='text-gray-600 text-lg mb-4'>By {productDetails.brand}</p>

          {/* Rating */}
          <div className='flex items-center gap-3 mb-6'>
            <div className='flex text-yellow-400'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
              ))}
            </div>
            <span className='text-gray-600 text-sm font-semibold'>{product.rating}</span>
            <span className='text-gray-600 text-sm'>({product.reviews} Reviews)</span>
          </div>

          {/* Pricing */}
          <div className='bg-gray-50 rounded-lg p-6 mb-6'>
            <div className='flex items-baseline gap-4 mb-3'>
              <span className='text-3xl font-bold text-amber-700'>
                Rs. {pricing.discountedPrice.toLocaleString()}
              </span>
              <span className='text-xl text-gray-400 line-through'>
                Rs. {pricing.originalPrice.toLocaleString()}
              </span>
              <span className='bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-semibold'>
                Save {pricing.discountPercent}%
              </span>
            </div>

            {/* Offers */}
            <div className='space-y-2 pt-4 border-t border-gray-200'>
              <p className='text-sm'>
                <span className='font-semibold text-amber-700'>Extra {product.extraOffer.percent}% off</span>
                <span className='text-gray-600'> — use code </span>
                <span className='font-bold text-amber-700'>{product.extraOffer.code}</span>
              </p>
              <p className='text-sm text-gray-600'>
                (Prepaid Orders — Get <span className='font-semibold text-amber-700'>{product.prepaidOffer.percent}% off</span> with <span className='font-bold text-amber-700'>{product.prepaidOffer.code}</span>)
              </p>
            </div>
          </div>

          {/* Shipping Info */}
          <div className='grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-200'>
            <div className='flex flex-col items-center text-center'>
              <Truck className='text-amber-700 mb-2' size={24} />
              <span className='text-sm font-medium text-gray-900'>{deliveryInfo.shipping}</span>
              <span className='text-xs text-gray-600'>{deliveryInfo.delivery}</span>
            </div>
            <div className='flex flex-col items-center text-center'>
              <RotateCcw className='text-amber-700 mb-2' size={24} />
              <span className='text-sm font-medium text-gray-900'>Easy Returns</span>
              <span className='text-xs text-gray-600'>30 days return policy</span>
            </div>
            <div className='flex flex-col items-center text-center'>
              <Shield className='text-amber-700 mb-2' size={24} />
              <span className='text-sm font-medium text-gray-900'>Secure Payment</span>
              <span className='text-xs text-gray-600'>100% safe & secure</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className='flex items-center gap-6 mb-8'>
            <span className='font-semibold text-gray-900'>Quantity:</span>
            <div className='flex items-center border border-gray-300 rounded-lg'>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className='px-4 py-2 text-gray-600 hover:bg-gray-100 transition'
              >
                −
              </button>
              <span className='px-6 py-2 text-center font-semibold'>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className='px-4 py-2 text-gray-600 hover:bg-gray-100 transition'
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-4 mb-8'>
            <button className='flex-1 bg-amber-700 hover:bg-amber-800 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2'>
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className='px-6 py-4 border border-gray-300 rounded-lg hover:border-amber-700 transition'
            >
              <Heart
                size={20}
                className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
          </div>

          {/* Stock & SKU */}
          <div className='text-sm text-gray-600 border-t pt-6'>
            <p className='mb-3'><span className='font-semibold'>SKU:</span> {product.sku}</p>
            <p className='mb-3'><span className='font-semibold'>Category:</span> {product.category}</p>
            <p>
              <span className='font-semibold'>Availability:</span>
              <span className={`ml-2 font-semibold ${product.stock ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock ? 'In Stock' : 'Out of Stock'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className='border-t pt-12'>

        {/* Tab Buttons */}
        <div className='flex gap-8 mb-8 border-b'>
          {['details', 'specifications', 'dimensions', 'care'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-semibold transition ${activeTab === tab
                  ? 'text-amber-700 border-b-2 border-amber-700'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Product Description</h2>
              <p className='text-gray-700 leading-relaxed mb-8'>
                {product.description}
              </p>

              <h3 className='text-xl font-bold text-gray-900 mb-4'>Key Features</h3>
              <ul className='space-y-3'>
                {features.map((feature, idx) => (
                  <li key={idx} className='flex gap-3 items-start'>
                    <Check size={20} className='text-amber-700 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700'>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className='bg-gray-50 rounded-lg p-6 h-fit'>
              <h3 className='font-bold text-gray-900 mb-4'>Delivery Details</h3>
              <ul className='space-y-4 text-sm'>
                <li>
                  <span className='font-semibold text-gray-900'>Dispatch:</span>
                  <p className='text-gray-600'>{deliveryInfo.dispatch}</p>
                </li>
                <li>
                  <span className='font-semibold text-gray-900'>Delivery:</span>
                  <p className='text-gray-600'>{deliveryInfo.delivery}</p>
                </li>
                <li>
                  <span className='font-semibold text-gray-900'>Shipping:</span>
                  <p className='text-gray-600'>{deliveryInfo.shipping}</p>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className='max-w-3xl'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Technical Specifications</h2>
            <div className='space-y-4'>
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className='flex justify-between py-4 border-b'>
                  <span className='font-semibold text-gray-900'>{key}</span>
                  <span className='text-gray-700'>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dimensions' && (
          <div className='max-w-3xl'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Dimensions</h2>
            <div className='bg-gray-50 rounded-lg p-8 mb-6'>
              <div className='grid grid-cols-3 gap-8 text-center'>
                {Object.entries(dimensions).map(([key, value]) => (
                  <div key={key}>
                    <p className='text-gray-600 text-sm mb-2'>{key}</p>
                    <p className='text-2xl font-bold text-amber-700'>{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className='text-gray-600 text-sm italic'>
              Please measure your space before ordering to ensure proper fit.
            </p>
          </div>
        )}

        {activeTab === 'care' && (
          <div className='max-w-3xl'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>Care Instructions</h2>
            <div className='bg-amber-50 border border-amber-200 rounded-lg p-6'>
              <ul className='space-y-4'>
                {careInstructions.map((instruction, idx) => (
                  <li key={idx} className='flex gap-3'>
                    <span className='text-amber-700 font-bold flex-shrink-0'>•</span>
                    <span className='text-gray-700'>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}