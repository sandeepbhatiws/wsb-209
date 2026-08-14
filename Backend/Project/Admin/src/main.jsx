
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Common from './Components/CommonRoute/Common'
import Dashboard from './Components/Dashboard'
import AddColor from './Components/Color/AddColor'
import ViewColor from './Components/Color/ViewColor'
import AddMaterial from './Components/Material/AddMaterial'
import ViewMaterial from './Components/Material/ViewMaterial'
import "izitoast/dist/css/iziToast.min.css";
import AddCategory from './Components/Category/AddCategory'
import ViewCategory from './Components/Category/ViewCategory'
import AddSubCategory from './Components/SubCategory/AddSubCategory'
import ViewSubCattegory from './Components/SubCategory/ViewSubCattegory'
import AddSubSubCategory from './Components/SubSubCategory/AddSubSubCategory'
import ViewSubSubCategory from './Components/SubSubCategory/ViewSubSubCategory'
import AddProduct from './Components/Product/AddProduct'
import ViewProducts from './Components/Product/ViewProducts'
import AddTestimonial from './Components/Testimonial/AddTestimonial'
import ViewTestimonial from './Components/Testimonial/ViewTestimonial'
import AddWhyChooseUs from './Components/WhyChooseUs/AddWhyChooseUs'
import ViewWhyChooseUs from './Components/WhyChooseUs/ViewWhyChooseUs'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} > </Route>

      <Route path='/' element={<Common />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='color'>
          <Route path='add' element={<AddColor />} />
          <Route path='view' element={<ViewColor />} />
        </Route>
        <Route path='material'>
          <Route path='add' element={<AddMaterial />} />
          <Route path='update/:id' element={<AddMaterial />} />
          <Route path='view' element={<ViewMaterial />} />
        </Route>
        <Route path='category'>
          <Route path='add' element={<AddCategory />} />
          <Route path='view' element={<ViewCategory />} />
        </Route>
        <Route path='sub-category'>
          <Route path='add' element={<AddSubCategory />} />
          <Route path='view' element={<ViewSubCattegory />} />
        </Route>
        <Route path='sub-sub-category'>
          <Route path='add' element={<AddSubSubCategory />} />
          <Route path='view' element={<ViewSubSubCategory />} />
        </Route>
        <Route path='product'>
          <Route path='add' element={<AddProduct />} />
          <Route path='view' element={<ViewProducts />} />
        </Route>
        <Route path='testimonial'>
          <Route path='add' element={<AddTestimonial />} />
          <Route path='view' element={<ViewTestimonial />} />
        </Route>
        <Route path='why-choose-us'>
          <Route path='add' element={<AddWhyChooseUs />} />
          <Route path='view' element={<ViewWhyChooseUs />} />
        </Route>

      </Route>

    </Routes>

  </BrowserRouter>

)
