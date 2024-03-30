import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { UPDATE_USER_RESET } from "../../constants/userConstant";
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router";

import { Link } from "react-router-dom";
import Loader from "../layout/loader/Loader";

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {id} = useParams();
    const navigate = useNavigate();
  
    const { loading, error, user } = useSelector((state) => state.userDetailsState);
  
    const {
      loading: updateLoading,
      error: updateError,
      isUpdated,
    } = useSelector((state) => state.profileState);
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
  
    
  
    useEffect(() => {
      if (user && user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
      }
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (updateError) {
        alert.error(updateError);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("User Updated Successfully");
        navigate("/admin/users");
        dispatch({ type: UPDATE_USER_RESET });
      }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id]);
  
    const updateUserSubmitHandler = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("role", role);
  
      dispatch(updateUser(id, myForm));
    };
    const categories = [
        "admin",
        "user"
    ]


  return (
    <div className='flex flex-row'>
    <MetaData title={`ALL PRODUCTS - Admin`} />
{/* Sidebar */}
<div>
  <div className='h-fit  top-16 sm:pt-0 pt-4  sm:w-fit w-full  sm:mt-4 fixed'>

    <Sidebar active={2} />
  </div>
</div>
{/* Display Window */}


    <div className="w-fit lg:w-full md:w-full sm:w-full my-8 lg:shadow-none min-h-full  bg-white  rounded-lg shadow-lg mx-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      {loading ? <Loader /> : (<div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Update User.</h2>
        <form onSubmit={updateUserSubmitHandler} >
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Name</label>
            <input readOnly id="email" type="text" name="email" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full cursor-default" value={name}  />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email-Address</label>
            <input readOnly id="email" type="email" name="email" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full cursor-default" value={email}  />
          </div>

          <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Choose Category</label>
              <select className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-inner disabled:bg-gray-100 mt-1 block w-full" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
          </div>
          
          <div className="mt-6">
            <button type="submit" className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-purple-700 active:bg-purple-700 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 disabled:opacity-25 transition" disabled={updateLoading ? true : false || role === "" ? true : false}>Update </button>
          </div>
          <div className="mt-6 ">
            Don't have an account?<Link to="#" className="underline p-1" >Create an Account.</Link>
          </div>
        </form>
      </div>)}
    </div>
</div>
  )
}

export default UpdateUser;