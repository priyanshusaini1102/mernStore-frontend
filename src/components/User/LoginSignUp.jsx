import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { clearErrors, login, register } from '../../actions/userAction';
import {useAlert} from 'react-alert';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';


const LoginSignUp = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const [toggle,setToggle] = useState(true);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({name: "",email: "",password: ""});
  const [avatar, setAvatar] = useState("https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg");
  const [avatarPreview, setAvatarPreview] = useState("https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg");

  
  const { name, email, password } = user;

  const {loading,error,isAuthenticated} = useSelector((state)=>state.userState);

  const toggleHandler = () => {
    return setToggle(!toggle);
  }

  //Login Handler
  const loginSubmitHandler = (e) => {
    e.preventDefault();
    console.log(`Email : ${loginEmail} and Password : ${loginPassword} has login successfully.`);
    dispatch(login(loginEmail, loginPassword));
  }

  const registerDataChangeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  //Sign Up Handler
  const registerSubmitHandler = (e) => {
    e.preventDefault();
    
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  }

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
      if(isAuthenticated){
        navigate(redirect);
      }
    
    
  },[alert,dispatch,error,isAuthenticated,navigate,redirect]);
  
  return <Fragment>
    <MetaData title={`My Store | Login`} />
    {loading ? <Loader/> : ( toggle ? (<div className="w-fit lg:w-full md:w-full sm:w-full my-8 lg:shadow-none min-h-full  bg-white  rounded-lg shadow-lg mx-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Welcome.</h2>
        <form onSubmit={loginSubmitHandler}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email-Address</label>
            <input id="email" type="text" name="email" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" onChange={(e)=> setLoginEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Password</label>
            <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" onChange={(e)=> setLoginPassword(e.target.value)} />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" type="checkbox" className="border border-gray-300 bg-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50" />
              <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900"> Remember me </label>
            </div>
          </div>
          <div className='my-1'>
            <Link to="/password/forgot" className="text-sm underline font-sans font-semibold "> Forgot your password? </Link>
          </div>
          <div className="mt-6">
            <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-purple-700 active:bg-purple-700 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 disabled:opacity-25 transition">Sign In</button>
          </div>
          <div className="mt-6 ">
            Don't have an account?<Link to="#" className="underline p-1" onClick={toggleHandler}>Create an Account.</Link>
          </div>
        </form>
      </div>
    </div>) : (
      <div className="w-fit lg:w-full md:w-full sm:w-full my-5 lg:shadow-none min-h-full  bg-white shadow-lg mx-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Register. </h2>
        <form encType="multipart/form-data" onSubmit={registerSubmitHandler}>
          <div className="signUpName mb-4 bg-gray-50 p-2 rounded">
            <label className="block mb-1 text-center text-xs font-bold " htmlFor="email">Your Profile</label>
            <img alt="..." src={avatarPreview} className=" rounded-full object-cover hover:shadow-lg mx-auto h-20 w-20"/>
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Name</label>
            <input id="name" type="text" name="name" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" onChange={registerDataChangeHandler} />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email-Address</label>
            <input id="email" type="text" name="email" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" onChange={registerDataChangeHandler} />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Password</label>
            <input id="password" type="password" name="password" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" onChange={registerDataChangeHandler} />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Confirm Password</label>
            <input id="confirmPassword" type="password" name="confirmPassword" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" />
          </div>
            <div className="mb-4 ">
            <label className="block mb-1" htmlFor="password">Upload Profile</label>
            <label className='block w-full px-3 py-3 text-sm   font-normal text-gray-700 bg-white bg-clip-padding shadow-sm border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ' >
              <FontAwesomeIcon icon={faUpload} />
              <span className='p-1 font-sans font-semibold'> Select Image</span>
              <input className="hidden " id="formFileSm" name='avatar' type="file" accept="image/*" onChange={registerDataChangeHandler}/>
              </label>
            </div>
          <div className=" mb-4">
            <button className="w-full inline-flex items-center  justify-center px-4 py-2  bg-purple-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-purple-700 active:bg-purple-700 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 disabled:opacity-25 transition">Sign Up</button>
          </div>
          <div className="mt-6 text-center">
            Already have an account?<Link to="#" className="underline p-1" onClick={toggleHandler}>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
))}
</Fragment> 
};

export default LoginSignUp;
