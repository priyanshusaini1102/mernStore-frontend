import React, {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProductState);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className='flex flex-row'>
    <MetaData title="My Store | Dashboard" />
    {/* Sidebar */}
    <div>
      <div className='h-fit  top-16 sm:pt-0 pt-4  sm:w-fit w-full  sm:mt-4 fixed'>

        <Sidebar active={3} />
      </div>
    </div>
    {/* Display Window */}
    <div className='flex-1 flex flex-col w-fit sm:ml-16 sm:mt-0 mt-16'>
    <div className="w-fit sm:w-full my-5 lg:shadow-none min-h-full  bg-white shadow-lg mx-auto flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md p-5 mx-auto">
        <h2 className="mb-12 text-center text-5xl font-extrabold">Create Product. </h2>
        <form encType="multipart/form-data" onSubmit={createProductSubmitHandler} className="" >
          
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Name</label>
            <input id="name" type="text" name="name" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Price</label>
            <input id="email" type="number" name="email" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" required onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">Product Description</label>
            <textarea id="password" type="password" name="password" className="py-2 px-3 h-20 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" value={description} onChange={(e) => setDescription(e.target.value)} cols="30" rows="1" ></textarea>
          </div>
          <div className="mb-4">
          <label className="block mb-1" htmlFor="password">Choose Category</label>
              <select className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select a Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Stock</label>
            <input id="email" type="number" name="email" className="py-2 px-3 border border-gray-300 focus:border-purple-300 focus:outline-none focus:ring focus:ring-purple-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full" required onChange={(e) => setStock(e.target.value)} />
          </div>
            <div className="mb-4 ">
            <label className="block mb-1" htmlFor="password">Upload Images</label>
            <label className='block w-full px-3 py-3 text-sm   font-normal text-gray-700 bg-white bg-clip-padding shadow-sm border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ' >
              <FontAwesomeIcon icon={faUpload} />
              <span className='p-1 font-sans font-semibold'> Select Images</span>
              <input className="hidden " id="formFileSm" name='avatar' type="file" accept="image/*" multiple onChange={createProductImagesChange} />
              </label>
            </div>
          <div id="mb-4 h-20 bg-gray-100 overflow-x-auto ">
              {imagesPreview.map((image, index) => (
                <img className="h-20 w-20 object-cover inline m-2" key={index} src={image} alt="Product Preview" />
              ))}  
          </div>
          <div className=" mb-4">
            <button type="submit" className={"w-full inline-flex items-center  justify-center px-4 py-2  bg-purple-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-purple-700 active:bg-purple-700 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 disabled:opacity-25 transition"+(loading && " bg-purple-300 hover:bg-purple-300")} disabled={loading ? true : false}>Add Product</button>
          </div>
          <div className="mt-6 text-center">
            Already have an account?<Button type="reset" to="#" className="underline p-1" >Sign in</Button>
          </div>
        </form>
      </div>
    </div>
    
    </div>
        
  </div>
  )
}

export default NewProduct;