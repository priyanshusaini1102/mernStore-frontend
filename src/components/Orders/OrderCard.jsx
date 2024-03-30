import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({order}) => {

    const statusColor = order.orderStatus==="Processing" ? "text-red-600" : "text-green-600";
    

  return <Fragment>
      <Link to={`/account/order/${order._id}`}>
      <div className='my-2 border rounded-lg shadow flex flex-row  p-3'>
        <div className='mr-4 h-fit '>
            <div className='flex flex-row'>
            <img className='w-24 h-24 my-auto rounded-md object-cover' src={order.orderItems[0].image} alt="order" />
            <span className='h-fit  px-2 border rounded-full shadow relative right-8 top-1 bg-gray-50'>{order.orderItems.length>1 && `${order.orderItems.length}`}</span>
            </div>
        </div>
        <div className='flex flex-row flex-wrap justify-between w-full'>
        <div className='flex-1 flex flex-col justify-between'>
            <div className='flex flex-col justify-start'>
            <h2 className='font-bold capitalize'>{order.orderItems.length>1 ? `${order.orderItems[0].name} ` : order.orderItems[0].name }</h2>
            <span className='sm:text-sm text-xs font-thin'>{order.orderItems.length>1 ? `with more ${order.orderItems.length-1} items` : ""}</span>
            </div>
            <h2> <span className='sm:inline hidden'> Status: </span><span className={statusColor}>{order.orderStatus}</span></h2>
        </div>
        <div className='flex-1 flex flex-col justify-between pr-2 '>
                <h1 className='whitespace-nowrap'>Id: <span className='sm:text-md text-xs'>{order._id}</span></h1>
                <p ><span className='font-semibold'>Total:</span> ${order.totalPrice} </p>
                <p ><span className='font-semibold'>Date:</span> {String(order.createdAt).substr(0, 10)}</p>

        </div>

        </div>
        </div>
        </Link>
  </Fragment>;
};

export default OrderCard;
