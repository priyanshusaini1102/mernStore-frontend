import React, { Fragment, useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from '../layout/loader/Loader';
import Carousel from '../layout/Carousel/Carousel';
import ReviewCard from './ReviewCard';
import MetaData from '../layout/MetaData';
import { addItemToCart } from '../../actions/cartActions';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
  } from "@material-ui/core";
  import { Rating } from "@material-ui/lab";
  import { NEW_REVIEW_RESET } from "../../constants/productConstant";


const ProductDetails = () => {

    const alert = useAlert();
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const { product,loading,error } = useSelector((state) => state.productDetailsState);
    const { success, error: reviewError } = useSelector((state)=>state.newReviewState);


    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if(quantity < product.stock){
            setQuantity(quantity+1);
        }
    };

    const decreaseQuantity = () => {
        if(quantity >1){
            setQuantity(quantity-1);

        }
    };

    const addToCartHandler = () => {
        dispatch(addItemToCart(id, quantity));
        alert.success("Item added to cart.");
    };

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
      };
    
      const reviewSubmitHandler = () => {
        const myForm = new FormData();
    
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId",id);
    
        dispatch(newReview(myForm));
    
        setOpen(false);
      };

    

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review Submitted Successfully");
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(id));
    }, [dispatch,id,error,alert, reviewError, success]);
    
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <Fragment>

        {loading ? <Loader /> : 
            <Fragment>
                <MetaData title={`My Store | ${product.name}`} />
                <div className='flex flex-row  flex-wrap '>

                    <div className='lg:flex-1 flex-none m-auto my-2  '>
                        {product.name && <Carousel images={product.images}/>}
                    </div>
                    {/* Product Heading Section */}
                    <div className="flex-1 p-4 border-l-4 my-2 border-black ">
                    <h1 className="text-3xl font-bold mb-3 capitalize">{product && product.name}</h1>
                    <div className="flex flex-row flex-nowrap" >
                        <Rating classNames="m-0 p-0" {...options} /> <span className='whitespace-nowrap ml-4 justify-center items-center'>({product.numOfReviews} ratings)</span>
                    </div>
                    <h2 className="font-semibold text-lg text-white p-2 inline-block bg-black rounded-md m-3  ml-0 ">Price : <span className='text-sm'>₹</span>{product.price}</h2>
                    {/* Product Buy Section */}
                    <div className="flex flex-row ">
                    <div className='mx-3 ml-0 border flex flex-row  border-black rounded w-fit '>
                        <button className="flex-none px-3 py-1 rounded-sm  hover:shadow-black " onClick={decreaseQuantity}>-</button>
                            <p  name="qty"  className="flex-none w-12 p-2  text-center bg-gray-100 outline-none">{quantity}</p>
                        <button className="flex-none px-3 py-1 mr-0 rounded-sm " onClick={increaseQuantity}>+</button>
                    </div>
                        <button disabled={product.stock<1?true:false} type="button" className="whitespace-nowrap lg:ml-2 ml-0 px-3 py-2 mx-1 text-yellow-800 border border-yellow-800 rounded-md  hover:bg-yellow-800 hover:text-white" onClick={addToCartHandler}>
                        Add To Bag
                    </button>
                    </div>
                    <p className="text-xs  font-serif font-thin text-gray-500">Status:<span className={"text-xs ml-1 font-serif font-thin pt-1 "+(product.stock<1 ? "text-red-500"  : " text-green-500")}>{product.stock<1 ? "Out Of Stock" : "In Stock"}</span></p>
                    
                    {/* Product Description Section */}
                    <p className="text-lg font-semibold mt-6 ">About this item</p>
                    <p className="text-gray-500 text-sm">{product.description}</p>
                    <button onClick={submitReviewToggle} type="button" className="whitespace-nowrap px-6 py-2 ml-0 m-1 mt-5 text-gray-800 border border-gray-800 rounded-md  hover:bg-gray-900 hover:text-white">
                        Submit Review
                    </button>
                    </div>
                </div>
                {/* Reviews Scetion */}
                <div className=" border-black border-t-2 border-b-2 rounded-lg shadow-lg my-6  m-3">
                <h3 className="text-2xl font-bold text-black mx-4">Reviews</h3>

                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog">
                     <div className='flex flex-col'>
                         <div className=' mx-auto shadow-md rounded-lg p-3'>
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                        />
                        </div>

                    <textarea
                        className="border-2 border-black rounded-lg m-4 p-2"
                        cols="30"
                        rows="3"
                        value={comment}
                        placeholder="Write your review about this product here..."
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    </div>
                    </DialogContent>
                    <DialogActions>
                    <button className='text-red-600 uppercase mx-3 p-2 rounded-lg  hover:shadow-inner' onClick={submitReviewToggle}>
                        Cancel
                    </button>
                    <button className='text-green-600 uppercase m-2 p-2 rounded-lg  hover:shadow-inner' onClick={reviewSubmitHandler} >
                        Submit
                    </button>
                    </DialogActions>
                </Dialog>

                {product.reviews && product.reviews[0] ? (
                    <div className=" m-4 shadow-md rounded-xl p-2 ">
                        {product.reviews && product.reviews.map((review)=> <ReviewCard review={review} key={review._id}/>)}
                    </div>
                ) : (
                    <p className="text-sm mx-4 font-bold underline p-2 pl-0 ">No Reviews Yet</p>
                    )}
                    </div>
            </Fragment>
        }
        
        </Fragment>
    )
}

export default ProductDetails;
