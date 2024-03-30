import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Success = () => {
  
  return (<div>
  <div className='bg-green-300 h-96 flex flex-row justify-center items-center  '>
      <div className='sm:mx-auto mx-2 w-fit border bg-green-50  shadow-xl rounded-xl max-w-2xl  p-4'>
        <label className='w-20' ></label>
      <p className='mx-auto mb-6 text-3xl font-sans font-semibold my-auto text-green-900'><CheckCircleIcon className='w-16 mx-auto ' /> Your Order has been placed successfully.</p>
      <Link to="/orders" className='p-2 mt-6 px-3 mx-auto border text-white font-bold border-green-400 bg-green-600 shadow hover:bg-green-700 hover:shadow-inner rounded-lg my-6 w-full hover:text-white'>View Orders</Link>
      </div>
  </div>
  <div className='h-40 bg-green-300'>

  </div>
  </div>);
};

export default Success;