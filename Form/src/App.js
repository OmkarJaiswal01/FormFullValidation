import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import { Link } from 'react-router-dom';


function App() {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(2,"min").max(20,"max"),
    phone: yup.string()
    .required('Phone is required')
    .matches(/^[6-9]\d{9}$/, 'Invalid phone number'),
    address: yup.string().required('Address is required'),
    dob: yup.string()
    .required('DOB is required')
    .test('is-date', 'Invalid date format', (value) => {
      // Check if the value is a valid date using JavaScript Date object
      return !isNaN(Date.parse(value));
    }),
  
    pass: yup.string().required('Password is required'),
    conPass: yup.string().required('Password  is required').oneOf([yup.ref('pass'), null], 'Passwords must match'),
    gender: yup.string().required('Gender is required'),
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema)
  });

  // Define onSubmit function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Send a POST request to the API endpoint with form data
      const response = await fetch('http://127.0.0.1:7000/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // If the response is OK (status code 200), show a success message
     if (response.ok) {
      toast.success('Registraction Successful!', {
      position:"top-center"
      });
}

       else {
        // If there is an error response, show a failure message
        window.alert('Failed to save data.');
      }
    } catch (error) {
      // If an error occurs during the fetch request, log the error and show a failure message
      console.error('Error:', error);
      window.alert('Failed to save data.');
    }
  };

  // Watch for changes in password and confirm password fields
  const pass = watch("pass", "");
  const conPass = watch("conPass", "");

  return (
    <>
   <ToastContainer/>

      <div className='max-w-[1320] mx-auto justify-center'>
        <div className='grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 '>
          <div className="mt-5 max-w-[700] mx-auto shadow-sm rounded-md border-2 px-20 py-5 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Form title */}
              <h1 className='text-center text-bolt text-2xl font-bold font-serif '>Form</h1>

              {/* Input fields */}
              <span className='font-serif'>Full Name</span>
              <input type='text' placeholder='First Name' className={ errors.name ? "form-control  border-red-500 " : "form-control  "} {...register('name')} />
              <p className='text-red-500'>{errors.name?.message}</p>
              <br />

              <span className='font-serif'>Phone</span>
              <input type='text' placeholder='Phone' className='form-control' {...register('phone')} />
           {errors.phone &&   (<p className='text-red-500'>{errors.phone?.message}</p>)}
              <br />

              <span className='font-serif'>Address</span>
              <input type='text' placeholder='Address' className='form-control' {...register('address')} />
              <p className='text-red-500'>{errors.address?.message}</p>
              <br />

              <span className='font-serif'>Dob:</span>
              <input type='text' placeholder='Dob' className='form-control' {...register('dob')} />
              <p className='text-red-500'>{errors.dob?.message}</p>
              <br />

              <span className='font-serif'>Password:</span>
              <input type='password' placeholder='Password' className='form-control' {...register('pass')} />
              <p className='text-red-500'>{errors.pass?.message}</p>
              <br />
              <span className='font-serif'>Confirm Password:</span>
              <input type='password' placeholder='Confirm Password' className={pass === conPass ? "form-control" : "form-control border-red-500"} {...register('conPass')} />
              <p className='text-red-500'>{errors.conPass?.message}</p>
              <br />
              
              <span className='font-serif'>Gender:</span>
              <div className="flex">
                 <label><input type="radio" value="male" {...register("gender")} />
                  Male
                </label>
                <label>
                  <input type="radio" value="female" {...register("gender")} />
                  Female
                </label>
              </div>
              <p className='text-red-500'>{errors.gender?.message}</p>
              <br />

              {/* Submit button */}
              <div className='w-auto mx-2 flex'>
                <button type="submit" className="btn btn-primary mx-2">Save Data</button>
              </div>
              <p className='mt-2 text-center'><Link to="/Login" className='text-info'>Login Here </Link>I have an account? </p>


            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
