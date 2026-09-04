import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import iziToast from "izitoast";
import Select from "react-select";

export default function AddProduct() {
  let [errors, setErrors] = useState([]);
  let [SelectedImage, setSelectedImage] = useState("");
  let [materials, setMaterials] = useState([]);
  let [colors, setColors] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [productId, setProductId] = useState('')
  const [productDetails, setProductDetails] = useState('');

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/products/materials`)
      .then((result) => {
        if (result.data._status) {

          var materialData = result.data._data.map((v) => {
            var data = {
              value: v._id,
              label: v.name
            }

            return data;
          })

          console.log(materialData);

          setMaterials(materialData);
        } else {
          setMaterials([]);
        }
      })
      .catch((error) => {
        iziToast.error({
          title: "Error",
          message: "Something went wrong.",
          position: "topRight",
        });
      })
  }, [])

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/products/colors`)
      .then((result) => {
        if (result.data._status) {
          var colorData = result.data._data.map((v) => {
            var data = {
              value: v._id,
              label: v.name
            }

            return data;
          })
          setColors(colorData);
        } else {
          setColors([]);
        }
      })
      .catch((error) => {
        iziToast.error({
          title: "Error",
          message: "Something went wrong.",
          position: "topRight",
        });
      })
  }, [])

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/products/parent-categories`)
      .then((result) => {
        if (result.data._status) {
          setParentCategories(result.data._data);
        } else {
          setParentCategories([]);
        }
      })
      .catch((error) => {
        iziToast.error({
          title: "Error",
          message: "Something went wrong.",
          position: "topRight",
        });
      })
  }, [])

  useEffect(() => {
    if (parentCategoryId) {
      axios.post(`${import.meta.env.VITE_API_URL}/products/sub-categories`, {
        parent_category_id: parentCategoryId
      })
        .then((result) => {
          if (result.data._status) {
            setSubCategories(result.data._data);
          } else {
            setSubCategories([]);
          }
        })
        .catch((error) => {
          iziToast.error({
            title: "Error",
            message: "Something went wrong.",
            position: "topRight",
          });
        })
    }
  }, [parentCategoryId])

  useEffect(() => {
    if (subCategoryId) {
      axios.post(`${import.meta.env.VITE_API_URL}/products/sub-sub-categories`, {
        parent_category_id: parentCategoryId,
        sub_category_id: subCategoryId
      })
        .then((result) => {
          if (result.data._status) {
            setSubSubCategories(result.data._data);
          } else {
            setSubSubCategories([]);
          }
        })
        .catch((error) => {
          iziToast.error({
            title: "Error",
            message: "Something went wrong.",
            position: "topRight",
          });
        })
    }
  }, [subCategoryId])

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      setProductId(params.id)

      axios.post(`${import.meta.env.VITE_API_URL}/products/details/${params.id}`)
        .then((result) => {
          if (result.data._status) {
            setProductDetails(result.data._data);
            // setParentCategoryId(result.data._data.parent_category_id._id);
            // if (result.data._data.image) {
            //   setSelectedImage(result.data._image_path + result.data._data.image)
            // }
          } else {
            setProductDetails('');
          }
        })
        .catch((error) => {
          iziToast.error({
            title: "Error",
            message: "Something went wrong.",
            position: "topRight",
          });
        })
    } else {
      setProductId('')
    }
  }, [params]);

  let handleimagechange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    ErrorHandler(event);
  };

  let ErrorHandler = (event) => {
    let fieldName = event.target.name;

    if (event.target.value === "") {
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
    let fields = form.querySelectorAll('input, select, textarea')

    let newErrors = [];

    fields.forEach((field) => {
      if (field.name != 'image') {
        if (!field.value.trim()) {
          newErrors.push(field.name);
        }
      }
    });

    newErrors = newErrors.filter((v) => {
      if (v != '') {
        return v
      }
    })

    if (!SelectedImage) {
      newErrors.push("image");
    }

    newErrors = [...new Set(newErrors)];
    setErrors(newErrors);

    console.log(newErrors);

    if (newErrors.length === 0) {
      var dataSave = event.target;

      if (productId) {
        var apiUrl = axios.put(`${import.meta.env.VITE_API_URL}/products/update/${productId}`, dataSave)
      } else {
        var apiUrl = axios.post(`${import.meta.env.VITE_API_URL}/products/create`, dataSave)
      }

      apiUrl.then((result) => {
        if (result.data._status) {
          iziToast.success({
            title: "Success",
            message: result.data._message,
            position: "topRight",
          });

          navigate('/product/view/')
        } else {
          iziToast.error({
            title: "Error",
            message: result.data._message,
            position: "topRight",
          });
        }
      })
        .catch((error) => {
          iziToast.error({
            title: "Error",
            message: "Something went wrong.",
            position: "topRight",
          });
        })
    }
  };










  let [imageBlocks, setImageBlocks] = useState([
    { image: null, file: null }
  ]);



  // const materialOptions = [
  //   { value: "cotton", label: "Cotton" },
  //   { value: "wool", label: "Wool" },
  //   { value: "leather", label: "Leather" },
  //   { value: "silk", label: "Silk" },
  // ];

  // const colorOptions = [
  //   { value: "red", label: "Red" },
  //   { value: "blue", label: "Blue" },
  //   { value: "black", label: "Black" },
  //   { value: "white", label: "White" },
  // ];

  // let handleimagechange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };



  const handleImageChange = (e, index) => {

    var count = 0;
    var updated = [];

    for (var imageFile in e.target.files) {
      if (imageFile != 'length' && imageFile != 'item') {
        const file = e.target.files[imageFile];
      
        if (!file) return;
        count++;

        const reader = new FileReader();

        var imageData = {};

        reader.onloadend = () => {
          imageData['image'] = reader.result;
          imageData['file'] = file;

          console.log(imageData)

          

          // setImageBlocks([...imageBlocks, imageData]);
          
          // updated[imageFile].image = ;
          // updated[imageFile].file = file;

          // last block pe image select hui → new block add
          // if (index === imageBlocks.length - 1) {
          //   updated.push({ image: null, file: null });
          // }
          
        };

        updated.push([...updated, imageData]);

        console.log(updated)

        reader.readAsDataURL(file);
      }
    }
    console.log(updated)

    // setImageBlocks([...updated]);
  };


  // let ErrorHandler = (event) => {

  //   let fieldName = event.target.name;
  //   let value = event.target.value;

  //   if (!value || value.trim() === "") {

  //     if (!errors.includes(fieldName)) {
  //       setErrors([...errors, fieldName]);
  //     }

  //   } else {

  //     let updated = errors.filter((v) => v !== fieldName);
  //     setErrors(updated);

  //   }

  // };

  // let handleSubmit = (e) => {

  //   e.preventDefault();

  //   let form = e.target;

  //   let fields = form.querySelectorAll(
  //     "input, textarea, select"
  //   );

  //   let newErrors = [];

  //   fields.forEach((field) => {

  //     if (
  //       field.name &&
  //       field.type !== "file" &&
  //       !field.value.trim()
  //     ) {
  //       newErrors.push(field.name);
  //     }

  //   });


  //   // single image check
  //   if (!SelectedImage) {
  //     newErrors.push("image");
  //   }


  //   // multiple image check
  //   const hasImage = imageBlocks.some(
  //     (b) => b.image !== null
  //   );

  //   if (!hasImage) {
  //     newErrors.push("multi_image");
  //   }


  //   // materials check
  //   if (materials.length === 0) {
  //     newErrors.push("materials");
  //   }


  //   // colors check
  //   if (colors.length === 0) {
  //     newErrors.push("colors");
  //   }


  //   newErrors = [...new Set(newErrors)];

  //   setErrors(newErrors);


  //   if (newErrors.length === 0) {

  //     const materialValues = materials.map(m => m.value);
  //     const colorValues = colors.map(c => c.value);

  //     console.log(materialValues);
  //     console.log(colorValues);

  //     form.reset();
  //     setSelectedImage("");
  //     setImageBlocks([{ image: null, file: null }]);
  //     setMaterials([]);
  //     setColors([]);

  //   }

  // };
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
            onSubmit={formhandler}
            className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm"
          >
            <div className='flex gap-3'>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 font-medium text-gray-700">Parent Category Name</label>
                <select
                  defaultValue={''}
                  onChange={(e) => {
                    setSubCategories([]);
                    setSubCategoryId('');

                    setSubSubCategories([]);

                    setParentCategoryId(e.target.value)

                  }}
                  name="parent_category_id"
                  className="text-[17px] border cursor-pointer border-slate-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 block w-full py-2.5 px-3">
                  <option value="">Select Category</option>
                  {
                    parentCategories.map((v, i) => {
                      return (
                        <option value={v._id}>{v.name}</option>
                      )
                    })
                  }
                </select>
                {errors.includes("parent_category_id") && <p className="text-red-600 text-sm mt-1">Parent category is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 font-medium text-gray-700">Sub Category Name</label>
                <select
                  defaultValue={''}
                  onChange={(e) => {
                    setSubCategoryId(e.target.value)
                  }}
                  name="sub_category_id"
                  className="text-[17px] border cursor-pointer border-slate-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 block w-full py-2.5 px-3">
                  <option value="">Select Sub Category</option>
                  {
                    subCategories.map((v, i) => {
                      return (
                        <option value={v._id}>{v.name}</option>
                      )
                    })
                  }
                </select>
                {errors.includes("sub_category_id") && <p className="text-red-600 text-sm mt-1">Sub category is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 font-medium text-gray-700">Sub Sub Category Name</label>
                <select
                  defaultValue={''}
                  name="sub_sub_category_id"
                  className="text-[17px] border cursor-pointer border-slate-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 block w-full py-2.5 px-3">
                  <option value="">Select Sub Sub Category</option>
                  {
                    subSubCategories.map((v, i) => {
                      return (
                        <option value={v._id}>{v.name}</option>
                      )
                    })
                  }
                </select>
                {errors.includes("sub_sub_category_id") && <p className="text-red-600 text-sm mt-1">Sub Sub category is required</p>}
              </div>

            </div>

            <div className='flex gap-3'>
              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Product Name</label>
                <input type="text" name="name" onKeyUp={ErrorHandler} placeholder="Enter product name" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("name") && <p className="text-red-600 text-sm mt-1">Product name is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Product Is Featured</label>
                <select onChange={ErrorHandler} name="is_featured" className="text-[17px] border cursor-pointer border-gray-300 rounded-lg block w-full py-2.5 px-3">
                  <option value=''>Select Product Is Featured</option>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </select>
                {errors.includes("is_featured") && <p className="text-red-600 text-sm mt-1">Product Is Featured is required</p>}
              </div>

              <div className="mb-6 basis-[25%]">
                <label className="block mb-2 text-md font-medium text-gray-700">
                  Materials
                </label>

                <Select
                  options={materials}
                  isMulti
                  name='material_ids'
                // value={materials}
                // onChange={(value) => {
                //   setMaterials(value);

                //   if (value.length > 0) {
                //     setErrors(errors.filter(e => e !== "materials"));
                //   }
                // }}
                />
                {errors.includes("material_ids") && (
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
                  options={colors}
                  isMulti
                  name='color_ids'
                // value={colors}
                // onChange={(value) => {
                //   setColors(value);

                //   if (value.length > 0) {
                //     setErrors(errors.filter(e => e !== "colors"));
                //   }
                // }}
                />

                {errors.includes("color_ids") && (
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
              <textarea name="long_description" onKeyUp={ErrorHandler} placeholder="Enter description" className="text-[17px] min-h-[150px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
              {errors.includes("long_description") && <p className="text-red-600 text-sm mt-1">Description is required</p>}
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
                    name="image"
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
                        name='images'
                        multiple
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
                <label className="block mb-2 text-md font-medium text-gray-700">Actual Price</label>
                <input type="number" name="actual_price" min={1} placeholder="Enter price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("actual_price") && <p className="text-red-600 text-sm mt-1">Price is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Sale Price</label>
                <input type="number" name="sale_price" min={1} placeholder="Enter actual price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("sale_price") && <p className="text-red-600 text-sm mt-1">Sale Price is required</p>}
              </div>

              <div className="mb-6 basis-[33%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Order</label>
                <input type="number" name="order" min={1} placeholder="Enter order" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />
                {errors.includes("order") && <p className="text-red-600 text-sm mt-1">Order is required</p>}
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
