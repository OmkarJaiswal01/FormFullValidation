import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Axios() {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2, 'Minimum length is 2').max(20, 'Maximum length is 20'),
    pass: yup.string().required('Password is required')
  });

  const [cookies, setCookie] = useCookies(['mycookie']);
  const jump = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      // Send a POST request to the API endpoint with form data
      const response = await fetch('http://127.0.0.1:7000/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // If the response is OK (status code 200), show a success message
      if (response.ok) {
        setCookie("mycookie", data.name); // Setting cookie with the 'name' from form data
        jump("/Dasboard");
      } else {
        // If there is an error response, show a failure message
        window.alert('Failed to save data.');
      }
    } catch (error) {
      // If an error occurs during the fetch request, log the error and show a failure message
      console.error('Error:', error);
      window.alert('Failed to save data.');
    }
  }

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='max-w-[1320] mx-auto  justify-center'>
          <div className=' grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 '>
            <div className="mt-5 max-w-[700] mx-auto shadow-sm rounded-md border-2 p-10  ">
              <h1 className='text-center text-bolt text-2xl font-bold font-serif '>Form</h1>
              <span className=' font-serif'>Full Name</span>
              <input type='text' placeholder='First Name' className='form-control' {...register('name')} /><br />
              <p className='text-red-500'>{errors.name?.message}</p>

              <span className=' font-serif'>Password:</span>
              <input type='password' placeholder='Password' className='form-control' {...register('pass')} /><br />
              <p className='text-red-500'>{errors.pass?.message}</p>

              <div className='w-auto mx-2 flex'>
                <button type="submit" className="btn btn-primary mx-2"  >Save Data</button>
                <button type="button" className="btn btn-primary mx-2" >Show</button>
                {/* <button type="button" className="btn btn-primary mx-2">Clear</button> */}
                <p className='mt-2 text-center'><Link to="/Reg" className='text-info'>Register </Link>Don't have an account? </p>

              </div>
            </div>


          </div>
        </div>
      </form>
    </div>
  )
}

export default Axios;
