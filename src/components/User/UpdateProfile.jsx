import React, { Fragment, useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { updateProfile, loadUser, clearErrors } from '../../actions/userAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import Loader from '../layout/loader/Loader';

const UpdateProfile = ({edit,setEdit}) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { user} = useSelector((state)=> state.userState);
    const {error, isUpdated, loading } = useSelector((state) => state.profileState);

    const [userData, setUserData] = useState({name: user.name,email:user.email, avatar:""});
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
    const [avatarButtonLoad, setAvatarButtonLoad] = useState(false);

    const updateSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();

        myForm.set("name", userData.name);
        myForm.set("email", userData.email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
        

    }

    const updateDataChangeHandler = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onloadstart = () => {

                if(reader.readyState === 1){
                     setAvatarButtonLoad(true);
                 } 
            }
            reader.onloadend = () => {
              if (reader.readyState === 2) {
                  setAvatarButtonLoad(false);
                setAvatar(reader.result);
                setAvatarPreview(reader.result);
              }
            };
      
            reader.readAsDataURL(e.target.files[0]);
          } else {
            setUserData({ ...userData, [e.target.name]: e.target.value });
          }
    }

    useEffect(()=>{
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
        setEdit(!edit);
  
        dispatch({
          type: UPDATE_PROFILE_RESET,
        });
      }
    },[dispatch,error,alert,isUpdated,setEdit,edit])

  return <Fragment>{loading ? <Loader /> : (<div className="rounded-3xl mx-auto overflow-hidden shadow-lg drop-shadow-md max-w-xs bg-purple-500">
  <img src="https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt='img' className="w-full h-32" />
  <form encType="multipart/form-data" onSubmit={updateSubmitHandler}>
    <div className="flex justify-center -mt-8">
        <img src={avatarPreview} alt='img' className="w-24 h-24 object-cover rounded-full border-solid border-white border-2 -mt-3"/>		
    
        <label className="p-1 px-2   items-center bg-white rounded-full shadow-lg cursor-pointer z-2 absolute right-24 top-36">
        {avatarButtonLoad ? <div className=' animate-spin duration-1000'><FontAwesomeIcon icon={faSpinner} /></div> : <FontAwesomeIcon icon={faPen} />}
            <input type='file' name='avatar' accept="image/*" className=" hidden " onChange={updateDataChangeHandler} />
        </label>
    </div>
    <p className='text-xs text-gray-800 italic text-center '>Image should be less than 750kb.</p>
    <div className="text-center px-3 pb-6 pt-2">
        <input name='name' type="text" className='bg-purple-800 rounded-2xl py-1 text-white text-sm text-center font-sans shadow px-3' value={userData.name} onChange={updateDataChangeHandler} /> 
        <input name='email' type="text" className='bg-purple-800 rounded-2xl py-1  mt-2 text-center font-sans font-light text-white px-3 w-full' value={userData.email} onChange={updateDataChangeHandler} /> 
    </div>
    <div className="flex justify-center pb-3 text-white">
      <div className="text-center mr-3 border-r pr-3">
        <h2 className='text-black'>Role</h2>
        <span className='capitalize text-sm '>{user.role}</span>
      </div>
      <div className="text-center">
        <h2 className='text-black'>Joined On</h2>
        <span className='text-sm'>{String(user.createdAt).substr(0, 10)}</span>
      </div>
  	</div>
    <div className='flex flex-row justify-center my-3'>
    <button type='submit' className=' px-4 py-2 m-1 whitespace-nowrap border text-sm border-purple-700  text-white rounded-3xl shadow hover:bg-purple-700 hover:shadow-inner' >Submit</button>
    <button className='px-4 py-2 m-1 whitespace-nowrap border text-sm border-purple-700 text-white rounded-3xl shadow hover:bg-purple-700 hover:shadow-inner' onClick={()=>setEdit(!edit)}>Don't Save</button>
    </div>
  </form>
  </div>)}</Fragment>;
};

export default UpdateProfile;
