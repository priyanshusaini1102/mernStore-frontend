import React, {  useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { Country, State } from "country-state-city";
import CheckoutStepper from "./CheckoutStepper";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartActions";
import { useAlert } from "react-alert";


const Shipping = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const {isAuthenticated} = useSelector((state)=>state.userState);
  
  const { shippingInfo,cartItems } = useSelector((state) => state.cartState);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmitHandler = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  }

  useEffect(()=>{
      if(isAuthenticated === false){
        navigate('/login');
      }
    
  },[isAuthenticated,navigate])

  return (<div class="h-full grid grid-cols-3 ">
  <div class="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 py-4 px-4  pb-10">

      <div className="mx-auto">
          <CheckoutStepper activeStep={1} />

      <div class="rounded-md max-w-4xl mx-auto">
          <form id="payment-form" onSubmit={shippingSubmitHandler}>
              <section>
                  <h2 class="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Shipping Information</h2>
                  <fieldset class="mb-3 bg-white shadow-lg rounded text-gray-600">
                      
                      <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                          <span class="text-right px-2">Address</span>
                          <input name="address" class="focus:outline-none px-3 w-full" placeholder="10 Street XYZ 654" value={address} onChange={(e) => setAddress(e.target.value)}/>
                      </label>
                      <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                          <span class="text-right px-2">City</span>
                          <input name="city" class="focus:outline-none px-3 w-full" placeholder="San Francisco" value={city} onChange={(e) => setCity(e.target.value)}/>
                      </label>
                      <label class="flex border-b border-gray-200 h-12 py-3 items-center">
                          <span class="text-right px-2 whitespace-nowrap">Mobile Number</span>
                          <input name="city" class="focus:outline-none px-3 w-full" placeholder="San Francisco" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
                      </label>
                      <label class="inline-flex w-2/4 border-gray-200 py-3">
                          <span class="text-right px-2">State</span>
                          {country && <select class="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                          >
                            <option value="">State</option>
                            {State &&
                              State.getStatesOfCountry(country).map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>}
                      </label>
                      <label class="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 ">
                          <span class="text-right px-2 xl:px-0 xl:text-none">ZIP</span>
                          <input name="postal_code" class="focus:outline-none px-3" placeholder="98603" value={pinCode} onChange={(e) => setPinCode(e.target.value)}/>
                      </label>
                      <label class="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                          <span class="text-right px-2">Country</span>
                          <div id="country" class="focus:outline-none px-3 w-full flex items-center">
                              
                            <select class="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                              required
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            >
                              <option value="">Country</option>
                              {Country &&
                                Country.getAllCountries().map((item) => (
                                  <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>    
                              
                          </div>
                      </label>
                  </fieldset>
              </section>
      <div class="rounded-md">
      </div>
      <button type="submit" class="submit-button px-4 py-3 my-5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
          Continue
      </button>
          </form>
      </div>
      </div>
  </div>
  {/* Order Summary */}
  <div class="col-span-1 bg-white lg:block hidden">
      <h1 class="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
      <div className="h-64 overflow-y-auto">

      <ul class="py-6 border-b space-y-6 px-8">
          {cartItems && cartItems.map((item)=> <li class="grid grid-cols-6 gap-2 border-b-1" key={item.product}>
              <div class="col-span-1 self-center">
                  <img src={item.image} alt="Product" class="rounded w-16 h-16 object-cover"/>
              </div>
              <div class="flex flex-col col-span-3 pt-2">
                  <span class="text-gray-600 text-md font-semi-bold">{item.name}</span>
                  <span class="text-gray-400 text-sm inline-block pt-2">Red Headphone</span>
              </div>
              <div class="col-span-2 pt-3">
                  <div class="flex whitespace-nowrap items-center space-x-2 text-sm justify-between">
                      <span class="text-gray-400">{item.quantity} x ${item.price}</span>
                      <span class="text-purple-400 font-semibold inline-block">${item.quantity * item.price}</span>
                  </div>
              </div>
          </li> ) }
          
      </ul>
      </div>
      <div class="px-8 border-b">
          <div class="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span class="font-semibold text-purple-500">${cartItems.reduce((acc,item) => acc + item.quantity * item.price,0)}</span>
          </div>
          <div class="flex justify-between py-4 text-gray-600">
              <span>Shipping</span>
              <span class="font-semibold text-purple-500">Free</span>
          </div>
      </div>
      <div class="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
          <span>Total</span>
          <span>€846.98</span>
      </div>
  </div>
</div>
  );
};

export default Shipping;
