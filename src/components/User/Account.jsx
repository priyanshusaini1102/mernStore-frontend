import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";
import UpdateProfile from "./UpdateProfile";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.userState);

  const [edit, setEdit] = useState(false);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    alert.success("successfully logout ");
  };

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className=" bg-purple-300 py-10">
      <MetaData title={`My Store | Account`} />
      <div>
        <p className=" text-purple-200 mb-6 capitalize text-center text-7xl font-extrabold mx-auto">
          Profile.
        </p>
        {user ? (
          edit ? (
            <UpdateProfile edit={edit} setEdit={setEdit} />
          ) : (
            <div className="rounded-3xl mx-auto  overflow-hidden shadow-lg drop-shadow-lg max-w-xs  bg-purple-500">
              <img
                src="https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="img"
                className="w-full h-32"
              />

              <div className="flex justify-center -mt-8">
                <img
                  src={
                    user.name
                      ? user.avatar.url
                      : `https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg`
                  }
                  alt="img"
                  className="w-24 h-24 object-cover rounded-full border-solid border-white border-2 -mt-3"
                />
              </div>

              <div className="text-center px-3 pb-6 pt-2">
                <h3 className="text-white text-sm bold font-sans">
                  {user.name}
                </h3>
                <p className="mt-2 font-sans font-light text-white">
                  {user.email}
                </p>
              </div>
              <div className="flex justify-center pb-3 text-white">
                <div className="text-center mr-3 border-r pr-3">
                  <h2 className="text-black">Role</h2>
                  <span className="capitalize text-sm ">{user.role}</span>
                </div>
                <div className="text-center">
                  <h2 className="text-black">Joined On</h2>
                  <span className="text-sm">
                    {String(user.createdAt).substr(0, 10)}
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-center flex-wrap my-3">
                <button
                  className="px-4 py-2 m-1 whitespace-nowrap border text-sm border-purple-700 text-white rounded-3xl shadow hover:bg-purple-700 hover:shadow-inner"
                  onClick={() => setEdit(!edit)}
                >
                  Edit
                </button>
                <Link
                  to="/orders"
                  className="px-4 py-2 m-1 whitespace-nowrap border text-sm border-purple-700 text-white rounded-3xl shadow hover:bg-purple-700 hover:shadow-inner"
                >
                  My Orders
                </Link>
                <button
                  className="px-4 py-2 m-1 whitespace-nowrap border text-sm border-purple-700 text-white rounded-3xl shadow hover:bg-purple-700 hover:shadow-inner"
                  onClick={logoutHandler}
                >
                  Log out
                </button>
              </div>
              {user.role === "admin" && <div className=" mx-4 flex flex-row ">
                <Link
                    to="/admin/dashboard"
                    className=" text-center py-2 mx-2 w-full whitespace-nowrap border text-sm border-purple-700 text-white rounded-3xl shadow hover:bg-purple-700 hover:shadow-inner"
                  >
                    Dashboard
                </Link>
              </div>}
              <p className="underline text-sm font-serif cursor-pointer text-center m-3 bold text-white py-1 rounded-full w-48 mx-auto px-3 hover:bg-purple-700">
                <Link to="/password/update">Update/Change Password</Link>
              </p>
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Account;
