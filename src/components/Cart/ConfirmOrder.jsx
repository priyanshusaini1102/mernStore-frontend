import React, {  useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import CheckoutStepper from "./CheckoutStepper";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";


const ConfirmOrder = () => {
  const navigate = useNavigate();

  const {isAuthenticated,user} = useSelector((state)=>state.userState);
  
  const { shippingInfo,cartItems } = useSelector((state) => state.cartState);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}. `;

  const subtotal = cartItems.reduce(
      (acc,item) => acc + item.quantity * item.price,0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const processToPayment = () => {
      const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
      };

      sessionStorage.setItem("orderInfo", JSON.stringify(data));

      navigate("/process/payment");
  }; 
  
  useEffect(()=>{
    
    if(!isAuthenticated){
      navigate('/login');
    }
  },[isAuthenticated,navigate])

  return (<Fragment>
      <MetaData title={"My Store | Confirm Order"} />
      <div class="h-full ">
      
  <div class=" bg-indigo-50 space-y-8 py-4 pb-10 px-3  ">
    <div className="w-full max-w-4xl mx-auto ">
          <CheckoutStepper activeStep={2} />

      <div class="rounded-md ">
              <section>
                  <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping Information</h2>
                  <div class="mb-3 p-2 px-3 bg-white shadow-lg rounded text-gray-600 ">
                      <p><span className="font-bold">Name: </span>
                      <span>{user.name}</span></p>
                      <p><span className="font-bold">Phone: </span>
                      <span>{shippingInfo.phoneNo}</span></p>
                      <p><span className="font-bold">Address: </span>
                      <span>{address}</span></p>
                  </div>
              </section>
      <div class="rounded-md">
        {/* Order Summary */}
        <div class="col-span-1 bg-white block rounded">
            <h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
            <div className="">

            <ul class="py-6 border-b space-y-6 sm:px-8 px-4">
                {cartItems && cartItems.map((item)=> <li class="grid grid-cols-6 pb-2 border-b" key={item.product}>
                    <div class="sm:col-span-1 col-span-2 self-center w-20">
                        <img src={item.image} alt="Product" class="rounded w-20 h-20 object-cover"/>
                    </div>
                    <div class="flex flex-col sm:col-span-3 col-span-2 pt-2 whitespace-nowrap">
                        <span class="text-gray-600 text-md font-semi-bold capitalize">{item.name}</span>
                        <span class="text-gray-400 text-sm inline-block pt-2">Red Headphone</span>
                    </div>
                
                    <div class="sm:col-span-2 col-span-2 pt-3 mx-1">
                        <div class="flex  items-center space-x-2 text-sm  justify-between">
                            <span class="text-gray-400 sm:text-md text-sm">{item.quantity} x ${item.price}</span>
                            <span class="text-purple-400 font-semibold inline-block">${item.quantity * item.price}</span>
                        </div>
                    </div>
                </li> ) }
                
            </ul>
            </div>
            <div class="px-8 border-b">
                <div class="flex justify-between py-4 text-gray-600">
                    <span>Subtotal</span>
                    <span class="font-semibold text-purple-500">${subtotal}</span>
                </div>
                <div class="flex justify-between py-4 text-gray-600">
                    <span>Shipping</span>
                    <span class="font-semibold text-purple-500">{shippingCharges}</span>
                </div>
                <div class="flex justify-between py-4 text-gray-600">
                    <span>Tax</span>
                    <span class="font-semibold text-purple-500">{tax}</span>
                </div>
            </div>
            <div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                <span>Total</span>
                <span>€{totalPrice}</span>
            </div>
        </div>
      </div>
      <button onClick={processToPayment} class="submit-button px-4 py-3 my-5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
        Proceed to Payment
      </button>
         
      </div>
    </div>
  </div>
</div>
</Fragment>
  );
};

export default ConfirmOrder;
