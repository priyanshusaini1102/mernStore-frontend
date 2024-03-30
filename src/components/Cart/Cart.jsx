import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart,removeItemFromCart } from '../../actions/cartActions';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
    const dispatch = useDispatch();
    const alert = useAlert();  
    const navigate = useNavigate(); 
    const {cartItems} = useSelector((state)=> state.cartState);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if(stock <= quantity){
            return;
        }
        dispatch(addItemToCart(id,newQty));
    }
    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if(1>= quantity){

            return;
        }
        dispatch(addItemToCart(id,newQty));
    }
    const removeFromCartHandler = (id) => {
        dispatch(removeItemFromCart(id));
        alert.success("Item remove from cart successfully.");
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    }



  return <div className='flex flex-col bg-indigo-50 '>
      <div className='flex-grow'>
      <h1 className=' text-3xl font-sans  mt-5 mb-3 ml-5'>Shopping Cart</h1>
      </div>
      <div className='flex flex-row flex-wrap '>
        {/* Cart Items List */}
        <div className='flex flex-col flex-1 border-t mt-0 m-5 bg-white rounded-xl  '>
            {cartItems.length===0 ? <p className='text-xl font-sans m-auto my-44'>No product in cart to show.</p> : (cartItems.map((item) => (
            //Single Product
            
            <div className='flex flex-row sm:flex-nowrap lg:px-8 p-2 py-5 sm:p-6 border-b' key={item.product}>
                <div className=' sm:w-40 w-20 mx-auto rounded-lg'>
                    <img className='sm:w-40 sm:h-40 w-20 h-20 rounded-md object-cover' src={item.image} alt="" />
                </div>
                <div className='flex flex-row flex-wrap justify-between flex-grow px-4'>
                    <div className='h-fit'>
                        <h1 className='sm:text-2xl text-xl font-sans sm:font-semibold'>{item.name}</h1>
                        <div className='whitespace-nowrap text-sm'>Sienna | Large</div>
                        <h2 className='font-bold sm:text-xl'>${item.price}</h2>
                    </div>
                    <div className='sm:pr-8 pr-3'>
                            <p className='text-center text-xs sm:text-md font-sans font-semibold pb-2' >Qty</p>
                        <div className='mx-auto  border flex flex-row justify-center  border-black rounded w-fit '>
                            <button className="flex-none sm:px-3 sm:py-1 px-2 py-0  rounded-sm  hover:shadow-black" onClick={()=>decreaseQuantity(item.product,item.quantity)} >-</button>
                                <p  name="qty"  className="flex-none sm:w-12 sm:p-2 p-1 sm:text-md text-sm  text-center bg-gray-100 outline-none">{item.quantity}</p>
                            <button className="flex-none sm:px-3 sm:py-1 px-2 py-0 mr-0 rounded-sm " onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button className='sm:text-xl font-sans flex-1' onClick={()=>removeFromCartHandler(item.product)}><FontAwesomeIcon icon={faTimes} /></button>
                </div>
            </div>)
            ))}
        </div>
        {/* Checkout Summary */}
        {cartItems.length !==0 && (<div className='w-full md:w-96 sm:w-full md:mr-12 px-6  '>
            <div className='w-full md:w-96 lg:sticky top-28  bg-white shadow-md border rounded-xl p-4 mr-8'>

            
            <h1 className=' text-xl font-sans py-4'>Order Summary</h1> 

            <div className='flex flex-row justify-between py-4 border-b border-black'>
                <h2 className='text-gray-500 font-bold'>Subtotal</h2>
                <p className='font-bold'>${cartItems.reduce((acc,item) => acc + item.quantity * item.price,0)}</p>
            </div>
            <div className='flex flex-row justify-between py-4 border-b border-black'>
                <h2 className='text-gray-500 font-bold'>Shipping Estimate</h2>
                <p className='font-bold'>$99.00</p>
            </div>
            <div className='flex flex-row justify-between py-4 border-b border-black'>
                <h2 className='text-gray-500 font-bold'>Tax Estimate</h2>
                <p className='font-bold'>$99.00</p>
            </div>
            <div className='flex flex-row justify-between py-4 '>
                <h2 className='text-black  text-lg font-sans'>Order Total</h2>
                <p className='font-bold font-sans'>$199.00</p>
            </div>
            <button className='bg-purple-600 hover:bg-purple-700 text-white font-bold w-full p-2 mt-3 rounded-md' onClick={checkoutHandler}>Checkout</button>
            </div>
        </div>)}
      </div>
  </div>;
};

export default Cart;
