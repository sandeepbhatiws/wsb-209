import React, { useEffect, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import iziToast from "izitoast";
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';
import { TbListDetails } from "react-icons/tb";
import Select from "react-select";

export default function ViewProducts() {
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({})
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState([])
  const [apiStatus, setApiStatus] = useState(true);
  const [imagePath, setImagePath] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [products, setProducts] = useState([]);
  // const [parentCategoryId, setParentCategoryId] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const clearFilter = () => {
    setFilterData({});
    setCurrentPage(1);
  };

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
  }, [parentCategoryId])

  useEffect(() => {
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
  }, [subCategoryId])

  const applyFilter = (e) => {
    e.preventDefault();

    let obj = {
      name: e.target.name.value,
      parent_category_id: e.target.parent_category_id.value,
      sub_category_id: e.target.sub_category_id.value,
    };

    setFilterData(obj);
    setCurrentPage(1)
  };

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/products/view`, {
      name: filterData.name,
      parent_category_id: filterData.parent_category_id,
      page: currentPage,
    })
      .then((result) => {
        if (result.data._status) {
          setImagePath(result.data._image_path)
          setProducts(result.data._data);
          setTotalPages(result.data._paginate.total_pages)
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        iziToast.error({
          title: "Error",
          message: "Something went wrong.",
          position: "topRight",
        });
      })
  }, [filterData, apiStatus, currentPage])

  const changeStatus = () => {
    if (selectedRecord.length > 0) {

      axios.put(`${import.meta.env.VITE_API_URL}/products/change-status`, {
        ids: selectedRecord
      })
        .then((result) => {
          if (result.data._status) {
            iziToast.success({
              title: "Status Updated",
              message: result.data._message,
              position: "topRight",
            });
            setSelectedRecord([])
            setApiStatus(!apiStatus)
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
    } else {
      iziToast.error({
        title: "No Selection",
        message: "Please select at least one products to change status.",
        position: "topRight",
      });
    }
  }

  const deleteRecords = () => {

    if (selectedRecord.length > 0) {

      iziToast.question({
        timeout: 20000,
        close: true,
        overlay: true,
        displayMode: "once",
        id: "delete-confirm",
        zindex: 999999,
        title: "Confirm Delete",
        message: "Do you really want to delete selected products? This action cannot be undone.",
        position: "center",
        buttons: [
          [
            "<button><b>YES, Delete</b></button>",
            function (instance, toast) {

              axios.put(`${import.meta.env.VITE_API_URL}/products/delete`, {
                ids: selectedRecord
              })
                .then((result) => {
                  if (result.data._status) {
                    iziToast.success({
                      title: "Status Updated",
                      message: result.data._message,
                      position: "topRight",
                    });
                    setSelectedRecord([])
                    setApiStatus(!apiStatus)
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

              instance.hide({ transitionOut: "fadeOut" }, toast);

            },
            true
          ],
          [
            "<button>Cancel</button>",
            function (instance, toast) {

              iziToast.info({
                title: "Cancelled",
                message: "Product delete action cancelled.",
                position: "topRight",
              });

              instance.hide({ transitionOut: "fadeOut" }, toast);

            }
          ]
        ]
      })

    } else {

      iziToast.error({
        title: "No Selection",
        message: "Please select at least one product to delete.",
        position: "topRight",
      });

    }

  }

  const SingleCheckSelect = (id) => {
    if (selectedRecord.includes(id)) {
      let finalData = selectedRecord.filter((v) => v !== id)
      setSelectedRecord(finalData)
    } else {
      let finalData = [...selectedRecord, id]
      setSelectedRecord(finalData)
    }
  }

  const multipleChecked = () => {
    if (selectedRecord.length == products.length) {
      setSelectedRecord([]);
    } else {
      setSelectedRecord([]);

      var newselectedRecords = [];
      products.forEach((v, i) => {
        newselectedRecords.push(v._id)
      })

      var data = [...newselectedRecords];
      setSelectedRecord(data)
    }

  }








  let [deatailpopup, setdeatailpopup] = useState(false)
  let [materials, setMaterials] = useState([]);
  let [colors, setColors] = useState([]);

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

  return (
    <>
      <DetailPopUp deatailpopup={deatailpopup} setdeatailpopup={setdeatailpopup} />
      <section className="w-full">

        {/* Breadcrumb */}
        <nav className="flex border-b bg-white px-6 py-3 shadow-sm">
          <ol className="inline-flex items-center space-x-2 text-gray-600">
            <li><a className="text-md font-medium hover:text-indigo-600">Home</a></li>
            <li>/</li>
            <li><a className="text-md font-medium hover:text-indigo-600">Product</a></li>
            <li>/</li>
            <li className="text-md font-medium text-gray-900">View Product</li>
          </ol>
        </nav>

        {/* FILTER */}
        <div
          className={`p-4 overflow-hidden transition-all duration-300 ease-out 
          ${openFilter ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <form
            onSubmit={applyFilter}
            className="py-4 relative px-6 my-3 rounded-lg border border-slate-200 w-full bg-white shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenFilter(false)}
              className="absolute right-4 top-4 text-[28px] text-gray-600 hover:text-black cursor-pointer"
            >
              <MdOutlineClose />
            </button>

            <p className="font-semibold py-2 text-[20px]">Filter</p>

            <div className="flex flex-wrap items-center gap-6">

              {/* Name */}
              <div className="mb-5  basis-full  ">
                <label className="block mb-2 font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="Enter Sub Sub Category Name"
                  className="text-[17px] border border-slate-300 rounded-lg 
                  focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                  block w-full py-2.5 px-3"
                />
              </div>

              {/* Parent Category Name */}
              <div className="mb-5 basis-[32%]">
                <label className="block mb-2 font-medium text-gray-700">Parent Category Name</label>
                <select
                  defaultValue={filterData.parent_category_id}
                  onChange={(e) => {
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
              </div>

              <div className="mb-5 basis-[32%]">
                <label className="block mb-2 font-medium text-gray-700">Sub Category Name</label>
                <select
                  defaultValue={filterData.sub_category_id}
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
              </div>

              <div className="mb-5 basis-[32%]">
                <label className="block mb-2 font-medium text-gray-700">Sub Sub Category Name</label>
                <select
                  defaultValue={filterData.sub_sub_category_id}
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



              </div>
              <div className="mb-6 basis-[20%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Price from</label>
                <input type="number" name="price-from" placeholder="Enter price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />

              </div>
              <div className="mb-6 basis-[20%]">
                <label className="block mb-2 text-md font-medium text-gray-700">Price to</label>
                <input type="number" name="price-to" placeholder="Enter price" className="text-[17px] border border-gray-300 rounded-lg block w-full py-2.5 px-3" />

              </div>

            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={clearFilter}
                className="text-white bg-slate-500 hover:bg-slate-600 px-6 py-2.5 rounded-lg transition-all"
              >
                Clear
              </button>

              <button
                type="submit"
                className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-lg 
                shadow-sm transition-all focus:ring-4 focus:ring-indigo-300"
              >
                Apply
              </button>
            </div>
          </form>
        </div>

        {/* MAIN */}
        <div className="p-4">

          {/* Header */}
          <div className="bg-slate-100 flex justify-between items-center py-3 px-4 rounded-t-md border border-slate-300">
            <div className="text-[26px] font-semibold">View Product</div>

            <div className="flex gap-3 items-center">

              {/* Filter */}
              <button
                onClick={() => setOpenFilter(true)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 
                text-slate-700 px-4 py-2 rounded-lg text-sm border border-slate-300 transition-all"
              >
                <FaFilter /> Filter
              </button>

              {/* Delete */}
              <button
                onClick={deleteRecords}
                disabled={selectedRecord.length === 0}
                className="text-white disabled:bg-slate-400 disabled:cursor-not-allowed 
                bg-indigo-600 hover:bg-indigo-700 text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Delete All
              </button>

              {/* Status */}
              <button
                onClick={changeStatus}
                disabled={selectedRecord.length === 0}
                className="text-white disabled:bg-slate-400 disabled:cursor-not-allowed 
                bg-indigo-600 hover:bg-indigo-700 text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Change Status
              </button>

            </div>
          </div>

          {/* TABLE */}
          <div className="border border-t-0 rounded-b-md border-slate-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-700">

                <thead className="text-sm uppercase bg-gray-50 border-b">
                  <tr>
                    <th className="px-2 w-[130px] py-3">
                      <input
                        type="checkbox"
                        checked={selectedRecord.length == products.length ? true : false}
                        onClick={multipleChecked}
                        className="mr-2 w-4 h-4 cursor-pointer text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      Select
                    </th>
                    <th className="px-2 w-[60px] py-3">S. No.</th>
                    <th className="px-2 py-3">Name</th>
                    <th className="px-2 py-3">Parent Category</th>
                    <th className="px-2 py-3">Sub Category</th>
                    <th className="px-2 py-3">Sub Sub Category</th>
                    <th className="px-2 w-[100px] py-3">Thumbnail</th>
                    <th className="px-2 w-[100px] py-3">Price</th>
                    <th className="px-2 w-[50px] py-3">Order</th>
                    <th className="px-2 w-[100px] py-3">Status</th>
                    <th className="px-2 w-[100px] py-3">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {
                    products.map((v, i) => {
                      return (
                        <>
                          <tr className="bg-white border-b">
                            <td className="px-2 py-4">
                              <input
                                type="checkbox"
                                checked={selectedRecord.includes(v._id) ? true : false}
                                className="w-4 h-4 text-indigo-600 cursor-pointer"
                                onClick={() => SingleCheckSelect(v._id)}
                              />
                            </td>

                            <td className="px-2 py-4">{i + 1}</td>
                            <td className="px-2 py-4">{v.name}</td>
                            <td className="px-2 py-4">{v.parent_category_id?.name}</td>
                            <td className="px-2 py-4">{v.sub_category_id?.name}</td>
                            <td className="px-2 py-4">{v.sub_sub_category_id?.name}</td>
                            
                            
                            <td className="px-2 py-4">
                              {
                                v.image
                                  ?
                                  <img
                                    className="w-[50px] rounded"
                                    src={imagePath + v.image}
                                    alt=""
                                  />
                                  :
                                  <img
                                    className="w-[50px] rounded"
                                    src="https://www.wscubetech.com/_next/image?url=https%3A%2F%2Fdeen3evddmddt.cloudfront.net%2Fimages%2Fhome-images%2Fjaipur-center.png&w=256&q=75"
                                    alt=""
                                  />
                              }

                            </td>
                            <td className="px-2 py-4">{v.actual_price}</td>
                            <td className="px-2 py-4">{v.order}</td>
                            {
                              v.status == 1
                                ?
                                <td className="px-2 py-4 text-green-600 font-semibold">
                                  Active
                                </td>
                                :
                                <td className="px-2 py-4 text-red-600 font-semibold">
                                  Inactive
                                </td>
                            }

                            <td className="px-2 py-4">
                              <Link to={`/product/update/${v._id}`}>
                                <svg fill="gold" className="w-5 h-5" viewBox="0 0 512 512">
                                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7z"></path>
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        </>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>

          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />

        </div>
      </section>
    </>
  );
}


function DetailPopUp({ deatailpopup, setdeatailpopup }) {
  return (

    <>
      <div
        className={`${deatailpopup ? "" : "hidden"
          } fixed inset-0 z-50 flex items-center justify-center bg-black/40`}
      >
        <div className="w-[90%] max-w-6xl bg-white rounded-lg shadow-lg">

          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b bg-slate-100 rounded-t-lg">
            <h2 className="text-[22px] font-semibold text-gray-800">
              Product Details
            </h2>

            <button
              onClick={() => setdeatailpopup(false)}
              className="text-gray-600 hover:text-black text-2xl"
            >
              ×
            </button>
          </div>

          {/* BODY */}
          <div className="p-6 grid grid-cols-3 gap-6">

            {/* MAIN IMAGE */}
            <div className="border border-slate-200 rounded-lg p-4 shadow-sm">
              <img
                className="w-full h-[250px] object-cover rounded"
                src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd53"
                alt="product"
              />
            </div>

            {/* MULTIPLE IMAGES */}
            <div className="border border-slate-200 rounded-lg p-4 shadow-sm flex flex-wrap gap-3">
              <img className="w-24 h-24 object-cover rounded" src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f" />
              <img className="w-24 h-24 object-cover rounded" src="https://images.unsplash.com/photo-1491553895911-0055eca6402d" />
              <img className="w-24 h-24 object-cover rounded" src="https://images.unsplash.com/photo-1520975922324-8b456906c813" />
              <img className="w-24 h-24 object-cover rounded" src="https://images.unsplash.com/photo-1483985988355-763728e1935b" />
            </div>

            {/* DETAILS */}
            <div className="border border-slate-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-center text-[20px] font-semibold text-gray-800 mb-4">
                Product Info
              </h3>

              <ul className="space-y-3 text-[16px]">

                <li>
                  <span className="font-semibold">Price:</span>
                  <span className="ml-2 text-gray-700">₹ 999</span>
                </li>

                <li>
                  <span className="font-semibold">MRP:</span>
                  <span className="ml-2 text-gray-700 line-through">₹ 1499</span>
                </li>

                <li>
                  <span className="font-semibold">Stock:</span>
                  <span className="ml-2 text-green-600 font-medium">In Stock</span>
                </li>

                <li>
                  <span className="font-semibold">Brand:</span>
                  <span className="ml-2 text-gray-700">Levi's</span>
                </li>

                <li>
                  <span className="font-semibold">Size:</span>
                  <span className="ml-2 text-gray-700">S, M, L, XL</span>
                </li>

                <li>
                  <span className="font-semibold">Color:</span>
                  <span className="ml-2 text-blue-600 font-medium">Blue</span>,
                  <span className="ml-2 text-red-500 font-medium">Red</span>
                </li>

              </ul>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t bg-slate-50 rounded-b-lg">
            <button
              onClick={() => setdeatailpopup(false)}
              className="px-5 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg"
            >
              Close
            </button>

            <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow">
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </>
  )
}