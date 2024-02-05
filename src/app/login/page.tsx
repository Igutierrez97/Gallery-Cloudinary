'use client';
import { IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSUbmit = async (e: any) => {
    e.preventDefault();
    const data = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    console.log(await data.json());
  };

  return (
    <div className=' flex h-screen w-full items-center justify-center'>
      <div className='flex h-80 w-96 flex-col gap-10 bg-white'>
        <div className='flex h-16  items-center bg-orange-500 '>
          <span className='ml-6 text-3xl font-semibold'>Login</span>
        </div>
        <form className='mx-6 flex flex-col gap-8' onSubmit={handleSUbmit}>
          <input
            type='text'
            placeholder='Email'
            className='h-12 w-full rounded-md border border-gray-800  pl-3 text-gray-800'
            name='email'
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            className='h-12 w-full rounded-md border border-gray-800 pl-3 text-gray-800'
            name='password'
            value={credentials.password}
            onChange={handleChange}
          />
        </form>

        {/** Boton*/}
        <div className='group relative' onClick={handleSUbmit}>
          <div className=' absolute bottom--5 left-44 ml-4 flex h-20 w-20 -translate-x-1/2 transform items-center justify-center rounded-full border bg-white'>
            <div className='flex h-[65px] w-[65px] items-center justify-center rounded-full bg-orange-500'>
              <div className='flex h-[60px]  w-[60px] items-center justify-center rounded-full bg-white  transition duration-300 group-hover:bg-orange-500 '>
                <IconArrowRight
                  size={45}
                  className='font-semibold text-orange-500 transition duration-300  group-hover:text-white'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
