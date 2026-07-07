import React, { useState } from 'react'

export default function AddMaterial() {

  let [errors, setErrors] = useState([]);

  let formhandler = (event) => {
    event.preventDefault();

    let form = event.target;
    let fields = form.querySelectorAll('input')

    let newErrors = [];

    fields.forEach((field) => {
      if (!field.value.trim()) {
        newErrors.push(field.name);
      }
    });

    newErrors = [...new Set(newErrors)];
    setErrors(newErrors);

    if (newErrors.length === 0) {
      event.target.reset()
    }
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


  return (
    <>
      <section className="w-full">

        {/* Breadcrumb */}
        <nav
          className="flex border-b bg-white px-6 py-3 shadow-sm"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-2 text-gray-600">
            <li>
              <a href="#" className="text-md font-medium hover:text-indigo-600">
                Home
              </a>
            </li>
            <li>/</li>

            <li>
              <a href="#" className="text-md font-medium hover:text-indigo-600">
                Material
              </a>
            </li>
            <li>/</li>

            <li aria-current="page">
              <span className="text-md font-semibold text-gray-900">
                Add Material
              </span>
            </li>
          </ol>
        </nav>

        {/* BODY */}
        <div className="w-full min-h-[680px] px-4 bg-slate-50 py-10">
          <div className="mx-auto">

            <h3 className="text-[24px] font-semibold 
            bg-gradient-to-r from-indigo-600 to-indigo-500
            py-3 px-5 rounded-t-lg text-white border border-indigo-500">
              Add New Material
            </h3>

            <form onSubmit={formhandler} className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm">

              {/* Material Name */}
              <div className="mb-6">
                <label className="block mb-2 text-md font-medium text-gray-700">
                  Material Name
                </label>

                <input
                  type="text"
                  name="name"
                  autoComplete="off"
                  onKeyUp={ErrorHandler}
                  className="text-[17px] border border-slate-300 text-gray-900 rounded-lg 
                  focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                  block w-full py-2.5 px-3"
                  placeholder="Enter Material name"
                />

                {errors.includes("name") && (
                  <p className="text-red-600 text-sm mt-1">
                    Name is required
                  </p>
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
                  autoComplete='off'
                  className="text-[17px] border border-slate-300 text-gray-900 rounded-lg 
                  focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                  block w-full py-2.5 px-3"
                  placeholder="Enter order number"
                />
              </div>

              <button
                type="submit"
                className="mt-3 cursor-pointer text-white 
                bg-indigo-600 hover:bg-indigo-700
                focus:ring-4 focus:ring-indigo-300
                font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
              >
                Submit
              </button>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}