import React, { useEffect, useState } from 'react'
import ProductCard from '../components/Common/Productcard'
import axios from 'axios';
import Card from '../components/Card';
import { useParams } from 'react-router';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { ChevronDown, ChevronUp } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function Shop() {
  const [products, setProducts] = useState([]);

  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sorting, setSorting] = useState();
  const [rating, setRating] = useState();
  const [filterCategory, setFilterCategory] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [priceId, setPriceId] = useState('');

  useEffect(() => {
    setCurrentPage(1)
  }, [params,sorting, rating, filterCategory, priceFrom])

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php', {
      params : {
        limit : 16,
        page : currentPage,
        categories : filterCategory.toString(),
        sorting : sorting,
        rating : rating,
        price_from : priceFrom,
        price_to : priceTo
      }
    })
    .then((result) => {
      setProducts(result.data.data)
      setTotalPages(result.data.total_pages)
    })
    .catch(() => {
      
    })
  }, [currentPage, params, sorting, rating, filterCategory, priceFrom])
  
  return (
    <div className='flex'>
      <FilterSidebar setRating={setRating} rating={rating} filterCategory={filterCategory} setFilterCategory={setFilterCategory} setPriceFrom={setPriceFrom} setPriceTo={setPriceTo} priceId={priceId} setPriceId={setPriceId} />
    
      <div className='max-w-7xl mx-auto px-6 py-12 ps-0' >
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>Featured Products</h2>
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
            Options
            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a onClick={ () => {
                  setSorting(1)
                }} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                  Name ASC (A-Z)
                </a>
              </MenuItem>
              <MenuItem>
                <a onClick={ () => {
                  setSorting(2)
                }} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                  Name Desc (Z-A)
                </a>
              </MenuItem>
              <MenuItem>
                <a onClick={ () => {
                  setSorting(3)
                }} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                  Price Low to High 
                </a>
              </MenuItem>
              <MenuItem>
                <a onClick={ () => {
                  setSorting(4)
                }} className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                  Price High to Low
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 '>
          {/* {products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              originalPrice={product.originalPrice}
              discountedPrice={product.discountedPrice}
              discountPercent={product.discountPercent}
              badge={product.badge}
              extraOffer={product.extraOffer}
              prepaidOffer={product.prepaidOffer}
            
            />
          ))} */}

  
          <Card Data={products}/>
        </div>

        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default Shop