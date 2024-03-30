import React from "react";
import { faArrowRight, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckIcon } from "@heroicons/react/solid";
import {  CreditCardIcon } from "@heroicons/react/outline";

const CheckoutStepper = ({ activeStep }) => {
  const activeSteps= activeStep;

  const steps = [
    {
      label: <span className={"text-black font-bold" + (activeSteps >= 1 ? " opacity-100" : " opacity-75")}>Shipping Details</span> ,
      icon: (
        <FontAwesomeIcon
          icon={faShippingFast}
          className={"w-4" + (activeSteps >= 1 ? " opacity-100" : " opacity-75")}
        />
      ),
    },
    {
      label: <span className={"text-black font-bold"}></span> ,
      icon: (
        <FontAwesomeIcon
          icon={faArrowRight}
          className={"w-4 "}
        />
      ),
    },
    {
        label: <span className={"text-black font-bold" + (activeSteps >= 2 ? " opacity-100" : " opacity-75")}>Confirm Order</span> ,
      icon: (
        <CheckIcon
          className={"w-4" + (activeSteps >= 2 ? " opacity-100" : " opacity-75")}
        />
      ),
    },
    {
        label: <span className={"text-black font-bold"}></span> ,
        icon: (
          <FontAwesomeIcon
            icon={faArrowRight}
            className={"w-4 "}
          />
        ),
      },
    {
        label: <span className={"text-black font-bold" + (activeSteps >= 3 ? " opacity-100" : " opacity-75")}>Payment</span> ,
      icon: (
        <CreditCardIcon
          className={"ml-1 w-4" + (activeSteps >= 3 ? " opacity-100" : " opacity-75")}
        />
      ),
    },
  ];

  return (
    <div>
        <div className=" flex flex-row text-xs pt-6 pb-5">

      {steps && steps.map((item, index)=> <div className="flex flex-row" key={index}>
          
          {item.icon}
          <p className="mr-2">{item.label}</p>
      </div>)}
        </div>
     
    </div>
  );
};

export default CheckoutStepper;
