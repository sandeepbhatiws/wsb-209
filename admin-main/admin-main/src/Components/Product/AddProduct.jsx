import React, { useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { useParams } from 'react-router-dom';
import Select from "react-select";
import iziToast from "izitoast";
export default function AddProduct() {
  let [errors, setErrors] = useState([]);
  let [SelectedImage, setSelectedImage] = useState("");
  let [materials, setMaterials] = useState([]);
  let [colors, setColors] = useState([]);
  let [imageBlocks, setImageBlocks] = useState([
    { image: null, file: null }
  ]);



  const materialOptions = [
    { value: "cotton", label: "Cotton" },
    { value: "wool", label: "Wool" },
    { value: "leather", label: "Leather" },
    { value: "silk", label: "Silk" },
  ];

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
  ];

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



  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const updated = [...imageBlocks];

      updated[index].image = reader.result;
      updated[index].file = file;

      // last block pe image select hui → new block add
      if (index === imageBlocks.length - 1) {
        updated.push({ image: null, file: null });
      }

      setImageBlocks(updated);
    };

    reader.readAsDataURL(file);
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
  let handleSubmit = (e) => {

    e.preventDefault();

    let form = e.target;

    let fields = form.querySelectorAll(
      "input, textarea, select"
    );

    let newErrors = [];

    fields.forEach((field) => {

      if (
        field.name &&
        field.type !== "file" &&
        !field.value.trim()
      ) {
        newErrors.push(field.name);
      }

    });


    // single image check
    if (!SelectedImage) {
      newErrors.push("image");
    }


    // multiple image check
    const hasImage = imageBlocks.some(
      (b) => b.image !== null
    );

    if (!hasImage) {
      newErrors.push("multi_image");
    }


    // materials check
    if (materials.length === 0) {
      newErrors.push("materials");
    }


    // colors check
    if (colors.length === 0) {
      newErrors.push("colors");
    }


    newErrors = [...new Set(newErrors)];

    setErrors(newErrors);


    if (newErrors.length === 0) {

      const materialValues = materials.map(m => m.value);
      const colorValues = colors.map(c => c.value);

      console.log(materialValues);
      console.log(colorValues);

      form.reset();
      setSelectedImage("");
      setImageBlocks([{ image: null, file: null }]);
      setMaterials([]);
      setColors([]);

    }

  };


  const handleRemoveBlock = (index) => {
    const updated = imageBlocks.filter((_, i) => i !== index);

    // kam se kam 1 block rehna chahiye
    if (updated.length === 0) {
      setImageBlocks([{ image: null, file: null }]);
    } else {
      setImageBlocks(updated);
    }
  };

  return (
    <section className="w-full">

      {/* Breadcrumb */}
      <nav className="flex border-b sticky top-0 z-[9999] bg-white px-6 py-3 shadow-sm">
        <ol className="inline-flex items-center space-x-2 text-gray-600">

          <li>
            <a href="#" className="text-md font-medium hover:text-indigo-600">
              Home
            </a>
          </li>

          <li>/</li>

          <li>
            <a href="#" className="text-md font-medium hover:text-indigo-600">
              Product
            </a>
          </li>

          <li>/</li>

          <li>
            <span className="text-md font-semibold text-gray-900">
              Add Product
            </span>
          </li>

        </ol>
      </nav>


      {/* BODY */}
      <div className="w-full min-h-[680px] px-5 bg-slate-50 py-10">

        <div className="mx-auto">

          <h3
            className="text-[24px] font-semibold
        bg-gradient-to-r from-indigo-600 to-indigo-500
        py-3 px-5 rounded-t-lg text-white border border-indigo-500"
          >
            Add New Product
          </h3>


          <form
            onSubmit={handleSubmit}
            className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm"
          >
            <div className='flex gap-3'>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Parent Category</label>
                <select onChange={ErrorHandler} name="parent_category" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Parent Category</option>
                </select>
                {errors.includes("parent_category") && <p className="text-red-600 text-sm mt-1">Parent category is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Sub Category</label>
                <select onChange={ErrorHandler} name="sub_category" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Sub Category</option>
                </select>
                {errors.includes("sub_category") && <p className="text-red-600 text-sm mt-1">Sub category is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Sub Sub Category</label>
                <select onChange={ErrorHandler} name="sub_sub_category" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Sub Sub Category</option>
                </select>
                {errors.includes("sub_sub_category") && <p className="text-red-600 text-sm mt-1">Sub Sub category is required</p>}
              </div>

            </div>

            <div className='flex gap-3'>
              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Product Name</label>
                <input type="text" name="product_name" onKeyUp={ErrorHandler} placeholder="Enter product name" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("product_name") && <p className="text-red-600 text-sm mt-1">Product name is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Product Type</label>
                <select onChange={ErrorHandler} name="type" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Product Type</option>
                </select>
                {errors.includes("type") && <p className="text-red-600 text-sm mt-1">Product Typey is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">
                  Materials
                </label>

                <Select
                  options={materialOptions}
                  isMulti
                  value={materials}
                  onChange={(value) => {
                    setMaterials(value);

                    if (value.length > 0) {
                      setErrors(errors.filter(e => e !== "materials"));
                    }
                  }}
                />
                {errors.includes("materials") && (
                  <p className="text-red-600 text-sm mt-1">
                    Materials required
                  </p>
                )}
              </div>



              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">
                  Colors
                </label>

                <Select
                  options={colorOptions}
                  isMulti
                  value={colors}
                  onChange={(value) => {
                    setColors(value);

                    if (value.length > 0) {
                      setErrors(errors.filter(e => e !== "colors"));
                    }
                  }}
                />

                {errors.includes("colors") && (
                  <p className="text-red-600 text-sm mt-1">
                    Colors required
                  </p>
                )}

              </div>
            </div>

            <div className='mb-6'>
              <label className="block mb-2 text-md font-medium text-gray-700">Short Description</label>
              <textarea name="short_description" onKeyUp={ErrorHandler} placeholder="Enter short description" className="  text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("short_description") && <p className="text-red-600 text-sm mt-1">Short description is required</p>}
            </div>

            <div className='mb-6'>
              <label className="block mb-2 text-md font-medium text-gray-700">Description</label>
              <textarea name="description" onKeyUp={ErrorHandler} placeholder="Enter description" className="text-[17px] min-h-[150px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("description") && <p className="text-red-600 text-sm mt-1">Description is required</p>}
            </div>

            <div className='flex mb-6 flex-col'>
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

            <div className="flex  mb-6 flex-col">
              <label className="block mb-2 text-md font-medium text-gray-700">
                Multiple Images
              </label>

              <div className="flex flex-wrap gap-5">

                {imageBlocks.map((block, index) => (

                  <div key={index} className="relative">

                    {/* remove button */}
                    {block.image && (
                      <button
                        type="button"
                        onClick={() => handleRemoveBlock(index)}
                        className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                      >
                        ✕
                      </button>
                    )}

                    <div className="relative w-60 h-60 border border-slate-200 rounded-lg overflow-hidden shadow bg-slate-100">

                      {!block.image && (
                        <div className="relative w-full h-full overflow-hidden bg-slate-200 rounded-lg flex flex-col items-center justify-center gap-4">

                          <div className="absolute inset-0 bg-slate-300 animate-pulse"></div>

                          <div className="absolute inset-0 bg-gradient-to-r 
                from-transparent via-white/40 to-transparent
                animate-[shimmer_1.8s_linear_infinite]">
                          </div>

                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <MdOutlineDriveFolderUpload
                              className="text-slate-600"
                              size={55}
                            />
                            <div className="w-28 h-3 bg-slate-400 rounded-full"></div>
                            <div className="w-20 h-3 bg-slate-400 rounded-full"></div>
                          </div>

                        </div>
                      )}

                      {block.image && (
                        <img
                          src={block.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />

                    </div>

                  </div>

                ))}

              </div>

              {errors.includes("multi_image") && (
                <p className="text-red-600 text-sm mt-1">
                  At least one image required
                </p>
              )}
            </div>

            <div className='flex gap-3'>
              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Price</label>
                <input type="number" name="price" min={1} placeholder="Enter price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("price") && <p className="text-red-600 text-sm mt-1">Price is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Actual Price</label>
                <input type="number" name="actual_price" min={1} placeholder="Enter actual price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("actual_price") && <p className="text-red-600 text-sm mt-1">Actual Price is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Order</label>
                <input type="number" name="order" min={1} placeholder="Enter order" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              </div>
            </div>

            <div className='flex justify-end'>
              <button type="submit" className="mt-3 text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all">Submit</button>
            </div>

          </form>
        </div>
      </div>
    </section>
  )
}
 