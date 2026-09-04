import React, { useEffect, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import iziToast from "izitoast";
import axios from 'axios';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

export default function ViewCategory() {

  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({})
  const [categories, setCategories] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState([])
  const [apiStatus, setApiStatus] = useState(true);
  const [imagePath, setImagePath] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/categories/view`, {
      name : filterData.name,
      page : currentPage,
    })
      .then((result) => {
        if (result.data._status) {
          setImagePath(result.data._image_path)
          setCategories(result.data._data);
          setTotalPages(result.data._paginate.total_pages)
        } else {
          setCategories([]);
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

  const applyFilter = (e) => {
    e.preventDefault();

    let obj = {
      name: e.target.name.value,
    };

    setFilterData(obj);
    setCurrentPage(1)
  };

  const changeStatus = () => {
    if (selectedRecord.length > 0) {

      axios.put(`${import.meta.env.VITE_API_URL}/categories/change-status`, {
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
        message: "Please select at least one category to change status.",
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
        message: "Do you really want to delete selected categories? This action cannot be undone.",
        position: "center",
        buttons: [
          [
            "<button><b>YES, Delete</b></button>",
            function (instance, toast) {

              axios.put(`${import.meta.env.VITE_API_URL}/categories/delete`, {
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
                message: "Category delete action cancelled.",
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
        message: "Please select at least one category to delete.",
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

    if (selectedRecord.length == categories.length) {
      setSelectedRecord([]);
    } else {
      setSelectedRecord([]);

      var newselectedRecords = [];
      categories.forEach((v, i) => {
        newselectedRecords.push(v._id)
      })

      var data = [...newselectedRecords];
      setSelectedRecord(data)
    }

  }

  return (
    <>
      <section className="w-full">

        {/* Breadcrumb */}

        <nav className="flex border-b bg-white px-6 py-3 shadow-sm">

          <ol className="inline-flex items-center space-x-2 text-gray-600">

            <li>
              <a className="text-md font-medium hover:text-indigo-600">Home</a>
            </li>

            <li>/</li>

            <li>
              <a className="text-md font-medium hover:text-indigo-600">Category</a>
            </li>

            <li>/</li>

            <li className="text-md font-medium text-gray-900">
              View Category
            </li>

          </ol>

        </nav>


        {/* FILTER */}

        <div
          className={`p-4 overflow-hidden transition-all duration-300 ease-out 
          ${openFilter ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >

          <form
            onSubmit={applyFilter}
            className="py-4 relative px-6 my-3 rounded-lg border border-slate-200 w-full bg-white shadow-sm">

            <button
              type="button"
              onClick={() => setOpenFilter(false)}
              className="absolute right-4 top-4 text-[28px] text-gray-600 hover:text-black cursor-pointer"
            >
              <MdOutlineClose />
            </button>

            <p className="font-semibold py-2 text-[20px]">
              Filter
            </p>

            <div className="flex items-center gap-6">
              <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">
                  Category Name
                </label>

                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  placeholder="Enter Category Name"
                  className="text-[17px] border border-slate-300 rounded-lg 
                  focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                  block w-full py-2.5 px-3"
                />

              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">

              <button
                type="reset"
                onClick={() => setFilterData({})}
                className="text-white cursor-pointer bg-slate-500 hover:bg-slate-600 px-6 py-2.5 rounded-lg transition-all"
              >
                Clear
              </button>

              <button
                type="submit"
                className="text-white cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 rounded-lg shadow-sm transition-all focus:ring-4 focus:ring-indigo-300"
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

            <div className="text-[26px] font-semibold">
              View Category
            </div>

            <div className="flex gap-3 items-center">

              <button
                onClick={() => setOpenFilter(!openFilter)}
                className="flex cursor-pointer items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm border border-slate-300 transition-all"
              >
                <FaFilter /> Filter
              </button>


              <button
                onClick={deleteRecords}
                disabled={selectedRecord.length === 0}
                className="text-white disabled:bg-slate-400 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Delete All
              </button>


              <button
                onClick={changeStatus}
                disabled={selectedRecord.length === 0}
                className="text-white disabled:bg-slate-400 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all"
              >
                Change Status
              </button>

            </div>

          </div>



          {/* TABLE */}

          <div className="border border-t-0 rounded-b-md border-slate-300 mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-700">
                <thead className="text-sm uppercase bg-gray-50 border-b">

                  <tr>

                    <th className="px-2 w-[130px] py-3">
                      <input
                        type="checkbox"
                        checked={selectedRecord.length == categories.length ? true : false}
                        onClick={multipleChecked}
                        className="mr-2 w-4 h-4 cursor-pointer text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      Select
                    </th>

                    <th className="px-2 w-[100px] py-3">S. No.</th>
                    <th className="px-2 py-3">Category Name</th>
                    <th className="px-2 w-[100px] py-3">Image</th>
                    <th className="px-2 w-[100px] py-3">Order</th>
                    <th className="px-2 w-[130px] py-3">Status</th>
                    <th className="px-2 w-[130px] py-3">Action</th>

                  </tr>
                </thead>
                <tbody>

                  {
                    categories.map((v, i) => {
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
                            <td className="px-2 py-4">
                              {
                                v.image
                                ?
                                <img
                                  className="w-[50px] rounded"
                                  src={ imagePath+v.image }
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
                              <Link to={`/category/update/${v._id}`}>
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
  )
}