import { Mail, Phone, Truck } from 'lucide-react'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'

function TopBar() {
  return (
    <>

      <div className='w-full bg-[#f7f2ed] py-3 grid xl:grid-cols-4 md:grid-cols-2 gap-4 items-center justify-items-center px-5'>
        <div className='flex gap-1.5'>
          <div><Truck/></div>
          <div className='flex gap-1.5'><h3 className='uppercase font-bold'>Free Shipping</h3> <span>on all Products</span></div>
        </div>
        <div className='flex gap-1.5'>
          <div><Phone/></div>
          <div className='flex gap-1.5'><h3 className='uppercase '>Call Us: </h3> <span>+91 1234567891</span></div>
        </div>
        <div className='flex gap-1.5'>
          <div><Mail/></div>
          <div className='flex gap-1.5'><h3 className='capitalize'>Email: </h3> <span>support@furnihome.com</span></div>
        </div>
        <div className='flex gap-5 '>
          <FaFacebook size={25} className='cursor-pointer'/>
          <FaInstagram size={25} className='cursor-pointer'/>
          <FaLinkedin size={25} className='cursor-pointer' />
          <FaYoutube size={25}  className='cursor-pointer'/>
        </div>
      </div>

    </>
  )
}

export default TopBar