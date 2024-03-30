import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';


const Product = ({product,mx}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }

    return (
        <Link className="productCard"  to={`/product/${product._id}`} >
            
            <div className={" w-60  m-4 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 duration-300 transform transition cursor-pointer "+mx}>
                <img className='h-60 w-60 object-cover' src={product.images[0].url} alt={product.images[0].url}/>
                <div className="p-5">
                    <h1 className="text-2xl font-bold capitalize">{product.name}</h1>
                    <p className=' font-serif capitalize text-black'></p>
                    <div className='flex flex-row items-center' >
                    <div><ReactStars classNames="m-0 p-0" {...options} /></div> <div className='m-2'><span className='text-sm'>({product.numOfReviews} reviews)</span></div>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                    <p className='text-black font-bold inline'>${product.price}</p>
                        <button className='text-xs mt-2 bg-black text-white rounded-lg p-2'>Add to Cart</button>
                    </div>
                </div>
            </div>

            </Link>
    )
}

export default Product
