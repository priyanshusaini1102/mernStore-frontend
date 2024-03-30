import React, { Fragment, useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import Loader from '../layout/loader/Loader';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, message, loading } = useSelector((state)=> state.forgotPasswordState);
    const { isAuthenticated } = useSelector((state)=> state.userState);


    const [email,setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
        if(isAuthenticated){
            navigate("/account");
        }
        if (message) {
          alert.success(message);
        }
    }, [dispatch, error, alert, message,isAuthenticated, navigate]);

  return <Fragment>
    <MetaData title={`My Store | Forgot Password`} />
      {loading ? <Loader /> : <div className="w-fit h-full sm:w-full my-8 lg:shadow-none min-h-full  bg-white  rounded-lg shadow-lg mx-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
          
        <h2 className="mb-12 text-center text-5xl font-extrabold">Forgot Password.</h2>
        <form onSubmit={forgotPasswordSubmit} >
          <div className="mb-4 ">
            <label className="block mb-1" htmlFor="email">Email-Address</label>
            <input id="email" type="email" name="email" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" onChange={(e)=> setEmail(e.target.value)} />
          </div>
          
          <div className="mt-6">
            <button type='submit' className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-purple-700 active:bg-purple-700 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 disabled:opacity-25 transition" >Send Email</button>
          </div>
          <div className="mt-6 text-center">
            Go to login page?<Link to="/login" className="underline p-1" >Click Here.</Link>
          </div>
        </form>
        
      </div>
    </div>}
  </Fragment>;
};

export default ForgotPassword;
