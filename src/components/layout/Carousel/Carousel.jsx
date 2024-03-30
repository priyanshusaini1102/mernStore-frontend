import React from 'react';
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';

const Carousel = ({images}) => {
    const [currentImage, setCurrentImage] = useState(0);

    const onNextImageHandler = () => {
        if(currentImage<images.length-1){
            setCurrentImage(currentImage+1);
        }
    }

    const onPreviousImageHandler = () => {
        if(currentImage>0){
            setCurrentImage(currentImage-1);
        }

    }

    return (
        <div className='flex flex-col'>
        <div className=' flex flex-row items-center justify-center w-96 mx-auto'>
            <button onClick={onPreviousImageHandler} className=' relative left-4'><FontAwesomeIcon icon={faAngleLeft} /></button>
            <img className="m-auto p-5 w-96 h-96 object-cover" src={images[currentImage].url} alt="product" />
            <button onClick={onNextImageHandler} className=' relative right-4'><FontAwesomeIcon icon={faAngleRight} /></button>
        </div>
        <div className='flex flex-row justify-evenly my-2 w-96 mx-auto'>
           

            {images.map((item,index) => ( <button onClick={()=> setCurrentImage(index)}><img className={'w-10 '+((index===currentImage) ? ' shadow-lg rounded-md opacity-100' : ' opacity-60')} src={item.url} alt="No Preview Aailable" /></button>) )}
            

        </div>
        </div>
    )
}

export default Carousel
