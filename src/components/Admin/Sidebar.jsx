import React from 'react';
import { Link } from 'react-router-dom';
import { faChartLine, faListUl, faUserFriends, faBoxOpen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = ({active}) => {
  return <div className='flex sm:flex-col flex-row justify-center backdrop-blur-sm sm:relative sticky sm:-left-1  sm:top-5 -top-2 left-4 z-10 sm:py-4 border rounded-xl my-auto'>
      <Link to="/admin/dashboard" >
      <div className={'m-3 p-3 border-0.5 rounded-full flex flex-row justify-center '+ (active===1 ? ' shadow-inner' : '') + ' hover:bg-gray-100 shadow hover:shadow-inner'}>
           <FontAwesomeIcon icon={faChartLine} size="sm" className='w-4'/>
      </div>
      </Link>
      <Link to="/admin/products" >
      <div className={'m-3 p-3 border-0.5 rounded-full flex flex-row justify-center '+ (active===2 ? ' shadow-inner' : '') + '  hover:bg-gray-100 shadow hover:shadow-inner'}>
           <FontAwesomeIcon icon={faBoxOpen} size="sm" className='w-4 inline'/>
      </div>
      </Link>
      <Link to="/admin/product" >
      <div className={'m-3 p-3 border-0.5 rounded-full flex flex-row justify-center '+ (active===3 ? ' shadow-inner' : '') + '  hover:bg-gray-100 shadow hover:shadow-inner'}>
           <FontAwesomeIcon icon={faPlus} size="sm" className='w-4 inline'/>
      </div>
      </Link>
      <Link to="/admin/orders" >
      <div className={'m-3 p-3 border-0.5 rounded-full flex flex-row justify-center '+ (active===4 ? ' shadow-inner' : '') + '  hover:bg-gray-100 shadow hover:shadow-inner'}>
           <FontAwesomeIcon icon={faListUl} size="sm" className='w-4 inline'/>
      </div>
      </Link>
      <Link to="/admin/users" >
      <div className={'m-3 p-3 border-0.5 rounded-full flex flex-row justify-center '+ (active===5 ? ' shadow-inner' : '') + '  hover:bg-gray-100 shadow hover:shadow-inner'}>
           <FontAwesomeIcon icon={faUserFriends} size="sm" className='w-4 inline'/>
      </div>
      </Link>

  </div>;
};

export default Sidebar;
