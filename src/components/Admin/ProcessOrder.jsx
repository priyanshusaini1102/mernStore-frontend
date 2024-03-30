import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import {  useParams } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import Sidebar from "./Sidebar";
import Loader from "../layout/loader/Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ProcessOrder = () => {
    const {id} = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetailsState);
    const { error: updateError, isUpdated } = useSelector((state) => state.orderState);

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(id, myForm));
    };

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("");

    useEffect(() => {
        if (error) {
        alert.error(error);
        dispatch(clearErrors());
        }
        if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
        }
        if (isUpdated) {
        alert.success("Order Updated Successfully");
        dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (<Fragment>
        <MetaData title={"My Store | Confirm Order"} />
        <div className='flex flex-row'>
            <MetaData title={`ALL PRODUCTS - Admin`} />
        {/* Sidebar */}
        <div>
          <div className='h-fit  top-16 sm:pt-0 pt-4  sm:w-fit w-full  sm:mt-4 fixed'>
    
            <Sidebar active={4} />
          </div>
        </div>
        {/* Display Window */}
        <div className='flex-1 flex flex-col w-fit sm:ml-16 sm:mt-0 mt-16'>
        {loading ? <Loader /> : (<div className="h-full ">
        
        <div className=" bg-indigo-50 space-y-8 py-4 pb-10 px-3  ">
          <div className="w-full max-w-4xl mx-auto ">
      
            <div className="rounded-md ">
                    <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping Information</h2>
                        <div className="mb-3 p-2 px-3 bg-white shadow-lg rounded text-gray-600 ">
                            <p><span className="font-bold">Name: </span>
                            <span>{order && order.user && order.user.name}</span></p>
                            <p><span className="font-bold">Phone: </span>
                            <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span></p>
                            <p><span className="font-bold">Address: </span>
                            <span>{order && order.shippingInfo &&
                              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span></p>
                        </div>
                    </section>
            <div className="rounded-md">
              {/* Order Summary */}
              <div className="col-span-1 bg-white block rounded">
              <div className=" border-b">
                  <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Payment Information</h1>
                      <div className="px-8 flex justify-between py-4 text-gray-600">
                          <span>Subtotal</span>
                          <span className="font-semibold text-purple-500">$11</span>
                      </div>
                      <div className="px-8 flex justify-between py-4 text-gray-600">
                          <span>Shipping</span>
                          <span className="font-semibold text-purple-500">11</span>
                      </div>
                      <div className="px-8 flex justify-between py-4 text-gray-600">
                          <span>Tax</span>
                          <span className="font-semibold text-purple-500">11</span>
                      </div>
                  </div>
                  <div className="flex flex-row flex-wrap justify-items-center sm:justify-between justify-end border-b-2 sm:px-8 px-2 py-6 ">
                    <h1 className="text-xl text-gray-600 text-center w-full ">Order Summary</h1>
                    <div className="flex flex-row justify-between w-full">
                    {/* Process Form */}
                    <div className="mx-2  py-2 px-1 rounded-xl text-xs shadow border">
                      <form onSubmit={updateOrderSubmitHandler} >
                        <select onChange={(e)=>setStatus(e.target.value)} className="border sm:mx-2 text-gray-500 rounded-lg shadow-inner p-1 "   >
                          <option value="">Choose an option</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                            )}

                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                        <button type="submit" disabled={loading ? true : false || status === "" ? true : false} className={"px-2 mx-auto shadow py-1 sm:mr-2 rounded-lg "+(loading && " opacity-40")}><FontAwesomeIcon icon={faCheck} /> </button>
                      </form>
                    </div>

                    <h2 className={" shadow-inner text-sm rounded-2xl p-2 px-3 "+(order && order.orderStatus && order.orderStatus === "Delivered"? " text-green-500 bg-green-50 ": " text-red-500 bg-red-50 ")}>{order && order.orderStatus}</h2>
                    </div>
                  </div>
                  <div className="">
      
                  <ul className="py-6 border-b space-y-6 sm:px-8 px-4">
                      {order.orderItems && order.orderItems.map((item)=> <li className="grid grid-cols-6 pb-2 border-b" key={item.product}>
                          <div className="sm:col-span-1 col-span-2 self-center w-20">
                              <img src={item.image} alt="Product" className="rounded w-20 h-20 object-cover"/>
                          </div>
                          <div className="flex flex-col sm:col-span-3 col-span-2 pt-2 whitespace-nowrap">
                              <span className="text-gray-600 text-md font-semi-bold capitalize">{item.name}</span>
                              <span className="text-gray-400 text-sm inline-block pt-2">Red Headphone</span>
                          </div>
                      
                          <div className="sm:col-span-2 col-span-2 pt-3 mx-1">
                              <div className="flex  items-center space-x-2 text-sm  justify-between">
                                  <span className="text-gray-400 sm:text-md text-sm">{item.quantity} x ${item.price}</span>
                                  <span className="text-purple-400 font-semibold inline-block">${item.quantity * item.price}</span>
                              </div>
                          </div>
                      </li> ) }
                      
                  </ul>
                  </div>
                  
              </div>
            </div>
            
            </div>
          </div>
        </div>
      </div>)}
        </div>
       
        
      </div>
        
  </Fragment>
    );
}

export default ProcessOrder