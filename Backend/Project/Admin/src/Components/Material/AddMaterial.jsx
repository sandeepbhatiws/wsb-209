import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import iziToast from "izitoast";

export default function AddMaterial() {

  let [errors, setErrors] = useState([]);
  const [materialId, setMaterialId] = useState('');
  const [materialDetails, setMaterialDetails] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if(params.id){
      setMaterialId(params.id)

      axios.post(`${import.meta.env.VITE_API_URL}/materials/details/${params.id}`)
      .then((result) => {
        if (result.data._status) {
          setMaterialDetails(result.data._data);
        } else {
          setMaterialDetails('');
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
      setMaterialId('')
    }
  }, [params]);

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

      var dataSave = {
        name : event.target.material_name.value,
        order : event.target.order.value,
      };

      if(materialId){
        var apiUrl = axios.put(`${import.meta.env.VITE_API_URL}/materials/update/${materialId}`, dataSave)
      } else {
        var apiUrl = axios.post(`${import.meta.env.VITE_API_URL}/materials/create`, dataSave)
      }
      
      apiUrl.then((result) => {
        if (result.data._status) {
          iziToast.success({
            title: "Success",
            message: result.data._message,
            position: "topRight",
          });

          navigate('/material/view/')
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

      // event.target.reset()
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
              <a href="/material/view" className="text-md font-medium hover:text-indigo-600">
                Material
              </a>
            </li>
            <li>/</li>

            <li aria-current="page">
              <span className="text-md font-semibold text-gray-900">
                { materialId ? 'Update Material' : 'Add Material' }
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
              { materialId ? 'Update Material' : 'Add Material' }
            </h3>

            <form onSubmit={formhandler} className="border border-slate-200 border-t-0 bg-white p-6 rounded-b-lg shadow-sm">

              {/* Material Name */}
              <div className="mb-6">
                <label className="block mb-2 text-md font-medium text-gray-700">
                  Material Name
                </label>

                <input
                  type="text"
                  name="material_name"
                  defaultValue={materialDetails.name}
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
                  defaultValue={materialDetails.order}
                  min={1}
                  autoComplete='off'
                  onKeyUp={ErrorHandler}
                  className="text-[17px] border border-slate-300 text-gray-900 rounded-lg 
                  focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 
                  block w-full py-2.5 px-3"
                  placeholder="Enter order number"
                />

                {errors.includes("order") && (
                  <p className="text-red-600 text-sm mt-1">
                    Order is required
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-3 cursor-pointer text-white 
                bg-indigo-600 hover:bg-indigo-700
                focus:ring-4 focus:ring-indigo-300
                font-medium rounded-lg text-md px-6 py-2.5 shadow-sm transition-all"
              >
                { materialId ? 'Update' : 'Submit' }
              </button>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}