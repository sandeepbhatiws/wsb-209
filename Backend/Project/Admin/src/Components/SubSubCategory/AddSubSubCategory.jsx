import React, { useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md";

export default function AddSubSubCategory() {

    let [errors, setErrors] = useState([]);
    let [SelectedImage, setSelectedImage] = useState("");

    let handleimagechange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    let ErrorHandler = (event) => {

        let fieldName = event.target.name;
        let value = event.target.value;

        if (!value || value.trim() === "") {

            if (!errors.includes(fieldName)) {
                setErrors([...errors, fieldName]);
            }

        } else {

            let updated = errors.filter((v) => v !== fieldName);
            setErrors(updated);

        }
    };

    let formhandler = (event) => {
        event.preventDefault();

        let form = event.target;
        let fields = form.querySelectorAll('input , textarea , select')

        let newErrors = [];

        fields.forEach((field) => {
            if (!field.value.trim()) {
                newErrors.push(field.name);
            }
        });

        if (!SelectedImage) {
            newErrors.push("image");
        }

        newErrors = [...new Set(newErrors)];
        setErrors(newErrors);

        if (newErrors.length === 0) {
            event.target.reset()
        }
    };


    return (
        <>
            <section className="w-full">

                {/* Breadcrumb */}
                <nav className="flex border-b bg-white px-6 py-3 shadow-sm">
                    <ol className="inline-flex items-center space-x-2 text-gray-600">
                        <li><a className="text-md font-medium hover:text-indigo-600">Home</a></li>
                        <li>/</li>
                        <li><a className="text-md font-medium hover:text-indigo-600">Sub Sub Category</a></li>
                        <li>/</li>
                        <li className="font-semibold text-gray-900">Add Sub Sub Category</li>
                    </ol>
                </nav>

                {/* Body */}
                <div className="w-full min-h-[680px] px-5 bg-slate-50 py-10">
                    <div className="mx-auto">

                        <h3 className="text-[24px] font-semibold 
                        bg-gradient-to-r from-indigo-600 to-indigo-500
                        py-3 px-5 rounded-t-lg text-white border border-indigo-500">
                            Add New Sub Sub Category
                        </h3>

                        <form
                            onSubmit={formhandler}
                            className="border border-slate-200 border-t-0 gap-6 flex bg-white p-6 rounded-b-lg shadow-sm"
                        >
                            {/* IMAGE AREA */}
                            <div className='flex flex-col'>
                                <label className="block mb-2 text-md font-medium text-gray-700">
                                    Image
                                </label>

                                <div className="relative w-60 h-60 border border-slate-200 rounded-lg overflow-hidden shadow bg-slate-100">

                                    {!SelectedImage && (
                                        <div className="relative w-full h-full overflow-hidden bg-slate-200 rounded-lg flex flex-col items-center justify-center gap-4">

                                            <div className="absolute inset-0 bg-slate-300 animate-pulse"></div>

                                            <div className="absolute inset-0 bg-gradient-to-r 
                                                                                                            from-transparent via-white/40 to-transparent
                                                                                                            animate-[shimmer_1.8s_linear_infinite]">
                                            </div>

                                            <div className="relative z-10 flex flex-col items-center gap-3">
                                                <MdOutlineDriveFolderUpload className="text-slate-600" size={55} />
                                                <div className="w-28 h-3 bg-slate-400 rounded-full"></div>
                                                <div className="w-20 h-3 bg-slate-400 rounded-full"></div>
                                            </div>
                                        </div>
                                    )}

                                    {SelectedImage && (
                                        <img
                                            src={SelectedImage}
                                            alt="Selected"
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleimagechange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>

                                {errors.includes("image") && (
                                    <p className="text-red-600 text-sm mt-1">image is required</p>
                                )}
                            </div>

                            {/* FORM FIELDS */}
                            <div className='w-full'>

                                {/* Select Parent Category */}
                                <div className="mb-6">
                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Select Parent Category
                                    </label>

                                    <select
                                        onChange={ErrorHandler}
                                        name="parent_id"
                                        defaultValue=""
                                        className="text-[17px] border cursor-pointer border-slate-300 text-gray-900 rounded-lg 
                                                    focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                                                    block w-full py-2.5 px-3"
                                    >
                                        <option value="">Select Parent Category</option>
                                        <option value="1">Electronics</option>
                                        <option value="2">Clothes</option>
                                    </select>

                                    {errors.includes("parent_id") && (
                                        <p className="text-red-600 text-sm mt-1">parent-category is required</p>
                                    )}
                                </div>


                                {/* Select Sub Category */}
                                <div className="mb-6">
                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Select Sub Category
                                    </label>

                                    <select
                                        onChange={ErrorHandler}
                                        name="sub_category_id"
                                        defaultValue=""
                                        className="text-[17px] border cursor-pointer border-slate-300 text-gray-900 rounded-lg 
                                        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                                        block w-full py-2.5 px-3"
                                    >
                                        <option value="">Select Sub Category</option>
                                        <option value="1">Mobile</option>
                                        <option value="2">Laptop</option>
                                    </select>

                                    {errors.includes("sub_category_id") && (
                                        <p className="text-red-600 text-sm mt-1">sub-category is required</p>
                                    )}
                                </div>


                                {/* Name */}
                                <div className="mb-6">
                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Sub Sub Category Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        autoComplete="off"
                                        onKeyUp={ErrorHandler}
                                        className="text-[17px] border border-slate-300 text-gray-900 rounded-lg 
                                        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
                                        block w-full py-2.5 px-3"
                                        placeholder="Enter category name"
                                    />

                                    {errors.includes("name") && (
                                        <p className="text-red-600 text-sm mt-1">Name is required</p>
                                    )}
                                </div>


                                {/* Order */}
                                <div className="mb-6">
                                    <label className="block mb-2 text-md font-medium text-gray-700">
                                        Order
                                    </label>

                                    <input
                                        type="number"
                                        name="order"
                                        min={1}
                                        autoComplete="off"
                                        className="text-[17px] border border-slate-300 text-gray-900 rounded-lg 
                                        focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500
                                        block w-full py-2.5 px-3"
                                        placeholder="Enter order number"
                                    />
                                </div>

                                <div className='flex justify-end'>
                                    <button
                                        type="submit"
                                        className="mt-3 cursor-pointer text-white 
                                        bg-indigo-600 hover:bg-indigo-700
                                        focus:ring-4 focus:ring-indigo-300
                                        font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
                                    >
                                        Submit
                                    </button>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}