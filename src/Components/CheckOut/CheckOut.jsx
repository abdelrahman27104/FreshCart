import { useFormik } from 'formik';
import * as Yup from 'yup';
import Scroll from '../Scroll/Scroll';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';




function CheckOut() {

    const {checkOut,isLoading}=useContext(CartContext)


    Scroll();



    const validationSchema = Yup.object().shape({
    street: Yup.string().required('Street is Required'),
    city:Yup.string().required('City is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid Phone Number").required("Phone is required"),
  });
  let formik = useFormik({
    initialValues:{
      street:'',
      city:'',
      phone:''
    },
    validationSchema: validationSchema,
    onSubmit:checkOut
    
  })
    
    
    return (
        <div className="w-full sm:w-3/4 lg:w-1/3 rounded-md mx-auto px-10 mt-10 ">
          <h1 className='text-center text-3xl text-emerald-500 font-semibold my-5'>CheckOut Now</h1>

        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="my-7">
          <input type="text" name="street" placeholder='Enter Your Street Name'  className="w-full border-b-2 border-emerald-500 py-2 outline-none"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.street}
          />
          {formik.errors.street &&formik.touched.street&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{formik.errors.street}</div>}

          </div>
          <div className="mt-7">
          <input type="text" name="city" placeholder='Enter Your City Name'  className="w-full border-b-2 border-emerald-500 py-2 outline-none"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            value={formik.values.city}
          />
            {formik.errors.city &&formik.touched.city&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{formik.errors.city}</div>}
            </div>

            <div className="mt-7">
                <input type="text" name="phone" placeholder='Enter Your Phone'  className="w-full border-b-2 border-emerald-500 py-2 outline-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone} 
                />
                {formik.errors.phone &&formik.touched.phone?<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{formik.errors.phone}</div>:""}
                </div>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-300 w-full cursor-pointer p-2 mt-4 rounded-md text-white">{isLoading?<i className='fa fa-spinner fa-spin'></i>:'CheckOut'}</button>
            </form>

        

    </div>
    )
}


export default CheckOut
