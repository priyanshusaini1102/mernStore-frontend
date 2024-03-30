import React, { useEffect } from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from './Payment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const PrePayment = ( {stripeApiKey}) => {
    const {isAuthenticated} = useSelector((state)=>state.userState);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/login");
        }
    },[navigate,isAuthenticated]);

  return <React.Fragment>{stripeApiKey && (
    <Elements stripe={loadStripe(stripeApiKey)}>
      {isAuthenticated && <Payment />}
    </Elements>
    )}</React.Fragment>;
};

export default PrePayment;
