import React, { Fragment, useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {useAlert} from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import { clearErrors, updatePassword } from '../../actions/userAction';
import Loader from '../layout/loader/Loader';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {isAuthenticated} = useSelector((state)=>state.userState);
    const { error, isUpdated, loading } = useSelector((state)=>state.profileState);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
    
        dispatch(updatePassword(myForm));
    };

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
      
        if (isUpdated) {
            alert.success("Password Updated Successfully");
      
            navigate("/account");
      
            dispatch({
              type: UPDATE_PASSWORD_RESET,
            });
        }

        if(!isAuthenticated){
            navigate("/login");
        }
    },[isAuthenticated,navigate,dispatch, error, alert, isUpdated]);

  return <Fragment>{loading ? <Loader/> :<div className="w-fit lg:w-full md:w-full sm:w-full my-8 lg:shadow-none min-h-full  bg-white  rounded-lg shadow-lg mx-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
  <div className="w-full sm:max-w-md p-5 mx-auto">
    <h2 className="mb-12 text-center text-5xl font-extrabold">Change Password.</h2>
    <form onSubmit={updatePasswordSubmit} >
      <div className="mb-4">
        <label className="block mb-1" htmlFor="email">Current Password</label>
        <input id="email" type="text" name="email" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="password">New Password</label>
        <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
      </div>
      <div className="mb-4">
        <label className="block mb-1" htmlFor="password">Confirm New Password</label>
        <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
      </div>
      <div className="mt-6">
        <button type='submit' className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-purple-700 active:bg-purple-700 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 disabled:opacity-25 transition">Submit</button>
      </div>
      <div className='text-sm font-sans  my-2 cursor-default'>Don't want to change password? <Link to="/account" className='underline font-sans cursor-pointer p-1'>Go to your account.</Link></div>
    </form>
  </div>
</div>}</Fragment>;
};

export default UpdatePassword;
