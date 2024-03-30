import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faSortAmountUp, faListUl, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import { LineChart, PieChart } from '@rsuite/charts';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderActions.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";


const Dashboard = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productsState);

  const { orders } = useSelector((state) => state.allOrdersState);

  const { users } = useSelector((state) => state.allUsersState);
  
  const {user} = useSelector((state)=>state.userState);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

    let totalAmount = 0;
    orders &&
      orders.forEach((item) => {
        totalAmount += item.totalPrice;
      });


    // Sample data
    const sampleData = [
      [0,0],
      [1, totalAmount]
    ];
    const data = [
        ['outOfStock', outOfStock],
        ['Remaining', products.length - outOfStock],
      ];
  
  

  useEffect(()=>{
    if(user.role !== "admin"){
      navigate("/account");
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  },[user,navigate,dispatch]);

  return <div className='flex flex-row'>
    <MetaData title="My Store | Dashboard" />
    {/* Sidebar */}
    <div>
      <div className='h-fit  top-16 sm:pt-0 pt-4  sm:w-fit w-full  sm:mt-4 fixed'>

        <Sidebar active={1} />
      </div>
    </div>
    {/* Display Window */}
    <div className='flex-1 flex flex-col w-fit sm:ml-16 sm:mt-0 mt-16'>
      {/* Readings square boxes */}
    <div className='flex flex-row flex-wrap border shadow rounded-xl sm:m-4 m-2 flex-1 justify-center p-2 py-4'>
      <div className=' shadow-inner rounded-xl m-2 lg:w-80 w-40 p-5 px-7 bg-green-200  h-fit '>
        <div className=' w-fit px-3 py-2 mx-auto shadow rounded-full bg-gradient-to-r from-green-300 to-green-500'><FontAwesomeIcon icon={faSortAmountUp} color="green" /></div>
        <p className='text-2xl text-green-700 text-center font-bold mt-3 font-sans'>${totalAmount}</p>
        <p className='text-center text-green-700 text-xs font-semibold font-sans'>Total Amount</p>
      </div>
      <div className='shadow-inner rounded-xl m-2 lg:w-80 w-40 p-5 px-7 bg-blue-200  h-fit '>
        <div className=' w-fit px-3 py-2 mx-auto shadow rounded-full bg-gradient-to-r from-blue-300 to-blue-500'><FontAwesomeIcon icon={faBoxOpen} color="blue" /></div>
        <p className='text-2xl text-blue-700 text-center font-bold mt-3 font-sans'>{products && products.length}</p>
        <p className='text-center text-blue-700 text-xs font-semibold font-sans'>Products</p>
      </div>
      <div className='shadow-inner rounded-xl m-2 lg:w-80 w-40 p-5 px-7 bg-red-200  h-fit '>
        <div className=' w-fit px-3 py-2 mx-auto shadow rounded-full bg-gradient-to-r from-red-300 to-red-500'><FontAwesomeIcon icon={faListUl} color="red" /></div>
        <p className='text-2xl text-red-700 text-center font-bold mt-3 font-sans'>{orders && orders.length}</p>
        <p className='text-center text-red-700 text-xs font-semibold font-sans'>Orders</p>
      </div>
      <div className='shadow-inner rounded-xl m-2 lg:w-80 w-40 p-5 px-7 bg-purple-200  h-fit '>
        <div className=' w-fit px-3 py-2 mx-auto shadow rounded-full bg-gradient-to-r from-purple-300 to-purple-500'><FontAwesomeIcon icon={faUserFriends} color="purple" /></div>
        <p className='text-2xl text-purple-700 text-center font-bold mt-3 font-sans'>{users && users.length}</p>
        <p className='text-center text-purple-700 text-xs font-semibold font-sans'>Users</p>
      </div>
     
    </div>
    {/* Graphs */}
    <div className="flex flex-row flex-wrap rounded-lg justify-center p-4 w-fit  mx-auto">
      <div className='sm:w-96 w-80 border m-4 shadow-inner -z-1  rounded-xl'>
      <LineChart name="Supply" data={sampleData} />
      </div>
      <div className='w-80 border m-4 shadow-inner h-fit rounded-xl'>
      <PieChart name="" data={data} legend={false} startAngle={210} />
      </div>
    </div>
    
    </div>
  </div>;
};

export default Dashboard;
