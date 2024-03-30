import React from 'react';

const OrderItemCard = ({orderItem,key}) => {

  return <div className='my-4 pb-4 border-b flex flex-row'>
      <div>
          <img className='w-40 h-40 rounded-lg object-cover' src={orderItem.image} alt="" />
      </div>
      <div className='px-4'>
        <h1 className='text-xl font-bold capitalize'>{orderItem.name} <span className=' font-sans text-sm text-purple-600'> x{orderItem.quantity}</span></h1>
        <p className=' font-bold text-md mt-2 text-gray-700'>${orderItem.price} x {orderItem.quantity} = ${orderItem.price*orderItem.quantity}</p>
        
      </div>
  </div>;
};

export default OrderItemCard;
