import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faShoppingBag, faUser, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {NavLink} from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchOpen,setSearchOpen] = useState(false);
  const [searchNull,setSearchNull] = useState(true);
  const [search,setSearch] = useState("");


  const menuOptions = [
    {
      name:"Home",
      to:"/",
    },
    {
      name:"Products",
      to:"/products",
    },
    {
      name:"Contact",
      to:"/contact",
    },
    {
      name:"About Us",
      to:"/aboutus",
    },
]

  const crossClickHandler = (e)=>{
    e.preventDefault();
    setSearchOpen(!searchOpen);
  }

  const searchChangeHandler = (e)=> {
    var value = e.target.value.trim();
    if(value.length === 0){
      setSearchNull(true);
    }else{
      setSearchNull(false);
      setSearch(value);
    }
  }

  const searchHandler = (e) => {
    e.preventDefault();
      navigate(`/products/${search}`);

  }
  

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-2 py-1 bg-white sticky top-0 z-10 border-b w-full">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink
              className="text-lg  leading-relaxed inline-block mr-4 py-0 whitespace-nowrap uppercase text-black"
              to="/" 
            >
             <img src="/MyStoreLogo.png" className="w-20 invert"  alt="" />
            </NavLink>
            <button
              className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center " +
              (navbarOpen ? " flex " : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:m-auto ">
              {menuOptions.map((menuOption)=>(

              <li className="nav-item" key={menuOption.name}>
                <NavLink
                  className={"px-3 py-2 flex items-center text-md capitaliize  leading-snug text-black opacity-75 hover:opacity-100 "}
                  to={menuOption.to}
                >
                  <span className="mx-auto">{menuOption.name}</span>
                </NavLink>
              </li>))}
            </ul>
          </div>
          <div
            className={
              "lg:flex  items-center  " +
              (navbarOpen ? " flex " : " hidden ")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto mr-0 ">
              <form className={"flex flow-row " + (searchOpen ? "  " : " hidden ")} >
                <input type="text" onChange={searchChangeHandler} className={`border-gray-200 rounded-full border pr-4 text-right `} />
              <li className="nav-item">
                {searchNull ? <button
                  onClick={crossClickHandler}
                  className="px-3 py-2 flex items-center text-md capitaliize  leading-snug text-black hover:opacity-75"
                  to="/search"
                >
                  <FontAwesomeIcon icon={faWindowClose} size="lg"  />
                </button> : <button
                  onClick={searchHandler}
                  className="px-3 py-2 flex items-center text-md capitaliize  leading-snug text-black hover:opacity-75"
                  to="/search"
                >
                  <FontAwesomeIcon icon={faSearch} size="lg"  />
                </button>}
              </li>
                </form>
                {!searchOpen && <li className="nav-item">
                <button 
                  onClick={()=>setSearchOpen(!searchOpen)}
                  className="px-3 py-2 flex items-center text-md capitaliize  leading-snug text-black hover:opacity-75"
                >
                  <FontAwesomeIcon icon={faSearch} size="lg" /><span className={"ml-2 lg:hidden"}>Search</span>
                </button>
              </li>}
                
              <li className="nav-item">
                <NavLink
                  className="px-3 py-2 flex items-center text-md capitaliize  leading-snug text-black hover:opacity-75"
                  to="/login"
                >
                  <FontAwesomeIcon icon={ faUser } size="lg" /><span className={"ml-2 lg:hidden"}>Profile</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="px-3 py-2 flex items-center text-md capitaliize  leading-snug text-black hover:opacity-75"
                  to="/cart"
                >
                  <FontAwesomeIcon icon={faShoppingBag } size="lg"/><span className={"ml-2 lg:hidden"}>Shopping Bag</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}