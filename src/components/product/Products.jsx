import React,{ Fragment, useEffect, useState} from 'react';
import Loader from '../layout/loader/Loader';
import ProductCard from '../product/ProductCard';
import MetaData from "../layout/MetaData";
import { getProduct} from '../../actions/productAction';
import {useSelector,useDispatch} from 'react-redux';
import {useAlert} from 'react-alert';
import {useParams} from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider } from '@material-ui/core';
import Categories from '../layout/Categories/Categories';

const categories = [
    "All",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
    "Mobile",
]

const Products = () => {
    

    const alert = useAlert();
    const dispatch = useDispatch();
    const {keyword} = useParams();
    const {products,error,loading,productsCount,resultPerPage,filteredProductsCount} = useSelector((state)=> state.productsState);
    const [currentPage,setCurrentPage] = useState(1);
    const [price,setPrice] = useState([0,2500000]);
    const [category,setCategory] = useState(categories[0]);
    const [ratings,setRatings] = useState(0);

    const priceHandler = (e,newPrice)=>{
        e.preventDefault();
        setPrice(newPrice);
    }
    const ratingHandler = (e,newRatings)=>{
        e.preventDefault();
        setRatings(newRatings);
    }

    const setCurrentPageNumber = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        if(error) {
            alert.error(error);
        }
        dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,alert,error,keyword,currentPage,price,category,ratings]);

    return <Fragment>
            
            <Fragment>
            <MetaData title="My Store | Products" />
            <div className='flex flex-row flex-wrap  '>
                <div className='mx-auto sm:mx-4 lg:border-r-2  my-4 sm:sticky top-28 shadow-md text-center border rounded-lg  h-fit '>
                    <h1 className='text-xl  my-3 p-3'>Filters</h1><div className="bg-black h-0.5 w-60 m-2"></div>
                    <div className='filter-box m-6 w-40 mx-auto '>
                        <h2 className='block text-sm font-medium text-gray-700'>Price</h2>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay='auto'
                            aria-labelledby='range-slider'
                            min={0}
                            max={1000}
                            color='secondary'
                            />
                    </div>
                    <div className='filter-box m-6 w-40 mx-auto '>
                        <h2 className='block text-sm font-medium text-gray-700'>Categories</h2>
                        <Categories category={category} setCategory={setCategory} categories={categories}/>
                    </div>
                    <fieldset className='filter-box m-6 w-40 mx-auto border border-gray-300 rounded-md px-3 shadow '>
                        <legend className='block text-sm font-medium text-gray-700'>Rating Above</legend>
                        <Slider
                            value={ratings}
                            onChange={ratingHandler}
                            aria-labelledby='continuous-slider'
                            min={0}
                            max={5}
                            valueLabelDisplay='auto'
                            color='secondary'
                            />
                    </fieldset>
                </div>
                <div className='flex-1 my-4 lg:border-l w-fit '>
                    <h2 id="featuredProduct" className="text-center text-xl p-3 mx-auto mt-0 ">Products</h2>
                    <div className="bg-black h-0.5 w-60 mx-auto my-2"></div>
                    {loading ? <Loader /> : <div className="flex flex-1 ml-0 basis-5 flex-row flex-wrap justify-center" >

                        {products && products.map((product)=> <ProductCard product={product} key={product._id}/>)}
                    </div>}
                </div>
            </div>

                

            {(filteredProductsCount > resultPerPage) && <div className="text-center m-3">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNumber}
                    nextPageText="Next"
                    prevPageText="Prev" 
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass=" page-item p-2 text-center inline border-y-2 px-3 hover:bg-black hover:text-white border-black "
                    linkClass="page-link"
                    activeClass="bg-black p-2 text-white cursor:default "
                    activeLinkClass="font-bold  "
                />
            </div>}
            <p className="text-center font-bold text-black mb-5">{filteredProductsCount>0 ? filteredProductsCount : `No`} products are available.</p>
            </Fragment>
            

        </Fragment>
    
};

export default Products;
