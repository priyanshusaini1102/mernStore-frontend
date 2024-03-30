import { ArrowRightIcon } from '@heroicons/react/outline';
import React from 'react';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {   useNavigate, useParams } from 'react-router';
import { getOrderDetails } from '../../actions/orderActions';
import Loader from '../layout/loader/Loader';
import OrderItemCard from './OrderItemCard';

const OrderDetails = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {loading,order,error} = useSelector((state)=>state.orderDetailsState);
  const { isAuthenticated } = useSelector((state)=> state.userState);
  const orderItems = order && order.orderItems;
  const shippingInfo = order && order.shippingInfo;

  useEffect(()=>{
    if(error){
      alert.error(error);
      navigate("/orders");
    }
    if(isAuthenticated === false){
      navigate("/login");
    }
    dispatch(getOrderDetails(id));
  },[dispatch,id,alert,error,navigate,isAuthenticated]);

  return <div>{loading? <Loader/> : <div className='px-8 mx-auto'>
      {/* Header Details */}
      {typeof order === "object" && <div className='py-4'>
        <h1 className='text-3xl font-bold my-3'>Order Details</h1>
        <div className='flex flex-row justify-between '>
          <p className='text-sm font-sans'>Order id: <span className='font-bold'>{order._id} <b className=' font-extrabold'>|</b>  {String(order.createdAt).substring(0,10)}</span> </p>
          <span className='text-sm text-purple-600 cursor-pointer hover:'>View Invoice <ArrowRightIcon className='w-3 h-4 inline' /> </span>
        </div>
        <div className='bg-black my-2 h-0.5 w-full'></div>
        {/* {Array.isArray(orderItems) &&  orderItems.map((orderItem,index)=> <div key={index}><OrderItemCard orderItem={orderItem} /></div> )} */}
      </div>}
      <div>
        { Array.isArray(orderItems) && orderItems.map((orderItem,index)=><div key={index}><OrderItemCard orderItem={orderItem} /></div>)}
      </div>
      <div>
        {(typeof shippingInfo === "object") && (
            <div className='bg-gray-100 p-4 rounded-lg mx-auto my-4 max-w-3xl'>
              <div className='flex flex-row flex-wrap justify-between'>
                <div >
                  <h1 className='text-xl font-bold mb-2'>Billing Address</h1>
                  <p>{`${shippingInfo.address && shippingInfo.address},${shippingInfo.city && shippingInfo.city},`}</p>
                  <p>{`${shippingInfo.state && shippingInfo.state},${shippingInfo.pinCode && shippingInfo.pinCode},${shippingInfo.country && shippingInfo.country}`}</p>
                </div>
                <div>
                 <h1 className='text-xl font-bold mb-2 sm:my-0 my-3'>Payment Info</h1>
                 <p>ID: {order.paymentInfo.id}</p>
                 <p className=' capitalize'>Status: {order.paymentInfo.status}</p>
                </div>
              </div>
              <div className='border-b pt-4 pb-2 flex flex-row justify-between'>
                <h2 className='font-bold'>Subtotal</h2>
                <p className='font-bold'>${order.itemsPrice}</p>
              </div>
              <div className='border-b pt-4 pb-2 flex flex-row justify-between'>
                <h2 className='font-bold'>Shipping Price</h2>
                <p className='font-bold'>${order.shippingPrice}</p>
              </div>
              <div className='border-b pt-4 pb-2 flex flex-row justify-between'>
                <h2 className='font-bold'>Tax Price</h2>
                <p className='font-bold'>${order.taxPrice}</p>
              </div>
              <div className='border-b pt-4 pb-2 flex flex-row justify-between'>
                <h2 className='font-bold'>Total</h2>
                <p className='font-bold'>${order.totalPrice}</p>
              </div>
            </div>
        )}
      </div>

    </div>
  }</div>;
};

export default OrderDetails;
