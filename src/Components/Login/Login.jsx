import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import Scroll from '../Scroll/Scroll';


    



function Login() {

  const [isLoading,setLoading]=useState(false);
  const [errorApi,setApiError]=useState(null);
  const {setUserData}=useContext(UserContext);
  const navigate=useNavigate();

  Scroll();
  
  

  async function login(values) {
    try{
        setLoading(true)
        const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values);
        setApiError(null);
        localStorage.setItem('userData',data.token);      


        setUserData(data.token)
        navigate('/');
        setLoading(false)
        console.log(data);


    }

    catch(err){
      setApiError(err.response.data.message)
      setLoading(false)
    }

  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required('email is Required'),
    password:Yup.string().required('Password is required'),
  });
  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },
    validationSchema: validationSchema,
    onSubmit:login
  })
    
    
    return (
        <div className="w-full sm:w-3/4 lg:w-1/3 rounded-md mx-auto px-10 mt-10 ">
          <h1 className='text-center text-3xl text-emerald-500 font-semibold my-5'>Login</h1>
          {errorApi&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{errorApi}</div>}

        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="my-7">
          <input type="text" name="email" placeholder='Enter Your Email'  className="w-full border-b-2 border-emerald-500 py-2 outline-none"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email &&formik.touched.email&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{formik.errors.email}</div>}

          </div>
          <div className="mt-7">
          <input type="password" name="password" placeholder='Enter Your Password'  className="w-full border-b-2 border-emerald-500 py-2 outline-none"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            value={formik.values.password}
          />
            {formik.errors.password &&formik.touched.password&&<div className='p-2 bg-red-100 text-red-800 rounded-md my-2'>{formik.errors.password}</div>}
            </div>
            <div className='text-emerald-500 hover:underline flex justify-end py-4'><Link to='/forgetpassword'>Forget Passowrd?</Link></div>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-300 w-full cursor-pointer p-2 mt-4 rounded-md text-white">{isLoading?<i className='fa fa-spinner fa-spin'></i>:'Login'}</button>
            </form>

        <div className='flex justify-center items-center'>
          <hr className="border-gray-300 border-2 w-1/3" />
          <p className='font-semibold p-3 text-lg text-gray-500'>or</p>
          <hr className="border-gray-300 border-2 w-1/3" />
        </div>
        <div className='flex justify-center items-center'>
          <p className='font-semibold p-3 text-sm text-gray-500'>Do not have an account?</p>
          <p className='text-emerald-500 hover:underline flex justify-end py-4'><Link to='/register'>Sign up here</Link></p>
        </div>

    </div>
    )
}


export default Login
