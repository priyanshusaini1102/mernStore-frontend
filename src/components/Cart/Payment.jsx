import React, { Fragment, useState, useEffect } from 'react';
import CheckoutStepper from './CheckoutStepper';
import { useSelector, useDispatch } from "react-redux";
import MetaData from '../layout/MetaData';
import { useAlert } from "react-alert";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { createOrder, clearErrors } from "../../actions/orderActions";
import { useNavigate } from 'react-router';

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();

    const { shippingInfo, cartItems } = useSelector((state) => state.cartState);
    const { user } = useSelector((state) => state.userState);
    const { error } = useSelector((state) => state.newOrderState);
    const [disable, setDisable] = useState(false);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
      };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
      };


    const submitHandler = async (e) => {
        e.preventDefault();
    
        setDisable(true);
    
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const { data } = await axios.post(
            "/api/v1/payment/process",
            paymentData,
            config
          );
    
          const client_secret = data.client_secret;
    
          if (!stripe || !elements) return;
    
          const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pinCode,
                  country: shippingInfo.country,
                },
              },
            },
          });
    
          if (result.error) {
            setDisable(false);
    
            alert.error(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              order.paymentInfo = {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              };
    
              dispatch(createOrder(order));
    
              navigate("/success");
            } else {
              alert.error("There's some issue while processing payment ");
            }
          }
        } catch (error) {
          setDisable(false);
          alert.error(error.response.data.message);
        }
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
      }, [dispatch, error, alert]);
  return <Fragment>
      <MetaData title={"My Store | Payment"} />
      <div className="h-full  grid grid-cols-3 ">
      <div className="col-span-3 bg-indigo-50 space-y-8 py-4 sm:pb-16 px-4  pb-10">

        <div className="mx-auto">
            <CheckoutStepper activeStep={3} />

        <div className="rounded-md max-w-4xl mx-auto">
            <form id="payment-form"  onSubmit={(e) => submitHandler(e)}>
                <section>
                    <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Card Information</h2>
                    <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                        
                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                            <span className="text-right px-2 whitespace-nowrap">Card Number</span>
                            <CardNumberElement className="paymentInput px-3 w-full" />
                        </label>
                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                            <span className="text-right px-2">Expiry</span>
                            <CardExpiryElement className="paymentInput px-3 w-full" />
                        </label>
                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                            <span className="text-right px-2 whitespace-nowrap">CVC</span>
                            <CardCvcElement className="paymentInput px-3 w-full" />
                        </label>
                        
                    </fieldset>
                </section>
        <div className="rounded-md">
        </div>
        <button disabled={disable? true : false} type="submit" id='payBtn' name='payBtn' className={"submit-button px-4 py-3 my-5 rounded-lg   text-white focus:ring  focus:outline-none w-full text-xl font-semibold transition-colors "+(disable? "bg-purple-300 hover:bg-purple-300 border":"bg-purple-600 hover:bg-purple-700")}>
            Continue
        </button>
            </form>
        </div>
        </div>
        </div>
      </div>
  </Fragment>;
};

export default Payment;
