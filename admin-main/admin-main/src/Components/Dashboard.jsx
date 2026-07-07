import React from 'react'

export default function Dashboard() {
    return (
        <>
            {/* Page Background Theme */}
            <section className="w-full bg-gray-50 min-h-screen">

                {/* Breadcrumb */}
                <nav className="flex border-b bg-white shadow-sm" aria-label="Breadcrumb">
                    <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <a href="#" className="text-md font-medium text-gray-700 hover:text-indigo-600">
                                Home
                            </a>
                        </li>

                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <a href="#" className="text-md font-medium text-gray-700 hover:text-indigo-600">
                                    Dashboard
                                </a>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Content Area */}
                <div className="w-full min-h-[610px]">
                    <div className=" mx-auto py-6">

                        {/* Section Title */}
                        <h2 className="text-2xl font-bold text-gray-800 px-3 mb-4">
                            Dashboard Overview
                        </h2>

                        {/* Cards Grid (UNCHANGED COLORS) */}
                        <div className="grid grid-cols-3 p-3 gap-5">

                            {/* Users */}
                            <div className="h-48 p-5 rounded-md shadow-lg bg-[rgb(89,86,211)]">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-[25px] text-white font-bold">26</h3>
                                </div>
                                <h3 className="text-[22px] font-semibold text-white">Users</h3>
                            </div>

                            {/* Products */}
                            <div className="h-48 p-5 rounded-md shadow-lg bg-[rgb(41,152,254)]">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-[25px] text-white font-bold">$6,200</h3>
                                </div>
                                <h3 className="text-[22px] font-semibold text-white">Product</h3>
                            </div>

                            {/* Category */}
                            <div className="h-48 p-5 rounded-md shadow-lg bg-[rgb(252,176,30)]">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-[25px] text-white font-bold">2.49</h3>
                                </div>
                                <h3 className="text-[22px] font-semibold text-white">Category</h3>
                            </div>

                            {/* Orders */}
                            <div className="h-48 p-5 rounded-md shadow-lg bg-[rgb(233,83,83)]">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-[25px] text-white font-bold">44</h3>
                                </div>
                                <h3 className="text-[22px] font-semibold text-white">Orders</h3>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
    
}
