"use client"
import React, { useEffect, useState } from 'react'
import ProductSection from './ProductSection'
import axios from 'axios';

export default function Home({womenProducts, menProducts}) {

  return (
    <>
      <ProductSection type='1' productData={womenProducts} title="Women's Picks" tagline="Handpicked styles for the modern women."/>
      <ProductSection type='2' productData={menProducts} title="Men's Picks" tagline="Handpicked styles for the modern men."/>
    </>
  )
}
