import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Card from '../components/Card';
import menimg1 from '../assets/Images/Card-images/Men/1.webp';
import menimg2 from '../assets/Images/Card-images/Men/2.jpg';
import menimg3 from '../assets/Images/Card-images/Men/3.jpg';
import menimg4 from '../assets/Images/Card-images/Men/4.webp';
import menimg5 from '../assets/Images/Card-images/Men/5.webp';
import womenimg1 from '../assets/Images/Card-images/Women/1.jpg'
import womenimg2 from '../assets/Images/Card-images/Women/2.webp'
import womenimg3 from '../assets/Images/Card-images/Women/3.webp'
import womenimg4 from '../assets/Images/Card-images/Women/4.webp'
import womenimg5 from '../assets/Images/Card-images/Women/5.webp'
import Testimonials from '../components/Common/Testimonials';
import Accordion from '../components/Common/Accordien';
import ProductSection from '../components/ProductSection';
import axios from 'axios';

function Home() {
  
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Customer",
      image: "https://i.pravatar.cc/100?img=1",
      review: "Amazing quality and perfect fit. StyleHub is now my go-to store!"
    },
    {
      name: "Rohan Verma",
      role: "Customer",
      image: "https://i.pravatar.cc/100?img=2",
      review: "Love the collection and fast delivery. Highly recommended!"
    },
    {
      name: "Ananya Iyer",
      role: "Customer",
      image: "https://i.pravatar.cc/100?img=3",
      review: "Stylish, comfortable and worth every penny."
    },
    {
      name: "Amit Singh",
      role: "Customer",
      image: "https://i.pravatar.cc/100?img=4",
      review: "Excellent experience from ordering to delivery."
    },
    {
      name: "Priya Sharma",
      role: "Customer",
      image: "https://i.pravatar.cc/100?img=1",
      review: "Amazing quality and perfect fit. StyleHub is now my go-to store!"
    },
    {
      name: "Rohan Verma",
      role: "Customer",
      image: "https://i.pravatar.cc/100?img=2",
      review: "Love the collection and fast delivery. Highly recommended!"
    },
    {
      name: "Ananya Iyer",
      role: "Customer",
      image: "https://i.pravatar.cc/100?img=3",
      review: "Stylish, comfortable and worth every penny."
    },
    {
      name: "Amit Singh",
      role: "Customer",
      image: "https://i.pravatar.cc/100?img=4",
      review: "Excellent experience from ordering to delivery."
    }
  ];
  const accordionData = [
    {
      id: 1,
      question: "What is your return policy?",
      answer:
        "We offer 30-day returns on all items. Products must be unused and in original packaging.",
    },
    {
      id: 2,
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email.",
    },
    {
      id: 3,
      question: "How long does delivery take?",
      answer:
        "Standard delivery takes 5-7 business days. Express shipping is available.",
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI, net banking, and wallets.",
    },
  ];

  const [womenProducts, setWomenProducts] = useState([]);
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    axios.get('https://wscubetech.co/ecommerce-api/products.php?limit=5&categories=tops')
    .then((result) => {
      setWomenProducts(result.data.data)
    })
    .catch(() => {

    })

    axios.get(`https://wscubetech.co/ecommerce-api/products.php?limit=5&categories=mens-shirts`)
    .then((result) => {
      setMenProducts(result.data.data)
    })
    .catch(() => {

    })
  }, [])

  return (
    <>
      <Banner />
      <div>
        {/* Women's Section */}
        <ProductSection type='1' productData={womenProducts} title="Women's Picks" tagline="Handpicked styles for the modern women."/>

        <ProductSection type='2' productData={menProducts} title="Men's Picks" tagline="Handpicked styles for the modern men."/>
      </div>
      <Testimonials testimonials={testimonials}/>
      <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
          
          <Accordion accordionData={accordionData} />
        
      </div>
    </>
  )
}

export default Home