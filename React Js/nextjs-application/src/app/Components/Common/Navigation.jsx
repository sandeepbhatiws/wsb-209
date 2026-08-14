import Link from 'next/link';
import React from 'react'
function Navigation() {

  const menuData = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Shop",
      path: "shop",
    },
    {
      name: "Furniture",
      path: '/shop/furniture',
      categories: [
        {
          title: "Living Room",
          links: [
            "Sofa",
            "Coffee Table",
            "TV Unit",
            "Console Table",
            "Recliner",
          ],
        },
        {
          title: "Bedroom",
          links: [
            "Beds",
            "Wardrobes",
            "Night Stands",
            "Dressers",
          ],
        },
        {
          title: "Dining",
          links: [
            "Dining Table",
            "Dining Chair",
            "Bar Stool",
          ],
        },
      ],
    },
    {
      name: "Home Decoration",
      path : '/shop/home-decoration',
      categories: [
        {
          title: "Seating",
          links: [
            "Sofa Sets",
            "Sectional Sofas",
            "Loveseats",
            "Recliners",
          ],
        },
        {
          title: "Tables",
          links: [
            "Coffee Tables",
            "Side Tables",
            "Console Tables",
          ],
        },
      ],
    },
    {
      name: "Bedroom",
      categories: [
        {
          title: "Beds",
          links: [
            "King Size Bed",
            "Queen Size Bed",
            "Single Bed",
          ],
        },
        {
          title: "Storage",
          links: [
            "Wardrobes",
            "Dressers",
            "Cabinets",
          ],
        },
      ],
    },
    {
      name: "Dining",
      categories: [
        {
          title: "Dining Sets",
          links: [
            "4 Seater",
            "6 Seater",
            "8 Seater",
          ],
        },
        {
          title: "Dining Chairs",
          links: [
            "Wooden Chairs",
            "Metal Chairs",
            "Bar Chairs",
          ],
        },
      ],
    },
    {
      name: "Contact",
      path: "contact",
    },
  ];

  return (
    <div className='w-full relative bg-white'>
      <div className='flex justify-center w-full items-center px-7 py-3'>
        <div className="flex justify-center gap-10">
          {menuData.map((item, index) => (
            <div 
              key={index} 
              className="group relative"
            >
              <Link href={item.path ?? ''} 
                className='text-gray-800 hover:text-amber-700 transition font-medium py-3'
              >
                {item.name}
              </Link>

            
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navigation