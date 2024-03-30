import React, { Fragment, useState, useEffect } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import { useDispatch,useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { clearErrors,resetPassword } from '../../actions/userAction';

const ResetPassword = () => {
    const {token} = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, success, loading } = useSelector((state) => state.forgotPasswordState);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(token,myForm));
    }

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          alert.success("Password Updated Successfully");
    
          navigate("/login");
        }
    }, [dispatch, error, alert, navigate, success]);

  return <Fragment>
      <MetaData title={`MyStore | Reset Password`} />
      {loading ? <Loader/> :<div className="w-fit lg:w-full md:w-full sm:w-full my-8 lg:shadow-none min-h-full  bg-white  rounded-lg shadow-lg mx-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
  <div className="w-full sm:max-w-md p-5 mx-auto">
    <h2 className="mb-12 text-center text-5xl font-extrabold">Set Password.</h2>
    <form onSubmit={resetPasswordSubmit} >
      <div className="mb-4">
        <label className="block mb-1" htmlFor="password">New Password</label>
        <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"  onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="password">Confirm New Password</label>
        <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full"  onChange={(e)=>setConfirmPassword(e.target.value)} />
      </div>
      <div className="mt-6">
        <button type='submit' className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-purple-700 active:bg-purple-700 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 disabled:opacity-25 transition">Set New Password</button>
      </div>
    </form>
  </div>
</div>}</Fragment>;
};

export default ResetPassword;
