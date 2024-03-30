import React, { Fragment,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse } from "@fortawesome/free-solid-svg-icons";
import ProductCard from '../product/ProductCard';
import MetaData from "../layout/MetaData";
import {clearErrors, getProduct} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import './Home.css';
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";



const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading,error,products } = useSelector((state)=> state.productsState);

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }

     dispatch(getProduct());
  },[dispatch,error,alert]);

  return (
    <Fragment>
      {loading ? <Loader /> : 
      <Fragment>
        
      <MetaData title="My Store" />

      <div className="banner p-6 cursor-default bg-gradient-to-r from-violet-500 to-fuchsia-500 text-center min-h-full flex flex-col content-center justify-center items-center m-0 ">
          <div className="">
            <p className="text-center text-3xl text-black font-bold  m-5">Welcome To My Store</p>
            <h1 className="text-center text-md text-white m-3">Find Amazing Products Below </h1>
            <a href="#featuredProduct" className="text-center">
            <button className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Scroll <FontAwesomeIcon icon={faMouse} size="sm" />
            </button>
            </a>
          </div>
      </div>

      <h2 id="featuredProduct" className="text-center text-xl p-3 mx-auto mt-6   ">Featured Product</h2>
      <div className="bg-black h-0.5 w-60 mx-auto my-2"></div>

      <div className="flex basis-5 flex-row flex-wrap justify-center " >
          {products && products.map((product)=> <ProductCard mx="mx-8" product={product} key={product._id}/>)}
      </div>
    </Fragment>}
    </Fragment>
    
  );
};

export default Home;
