import React from 'react'
import ReactStars from 'react-rating-stars-component';

const ReviewCard = ({review}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true
    }
    const profilePng = "https://cdn.pixabay.com/photo/2017/08/01/09/55/people-2564130_960_720.jpg";
    return (
        <div>
            <div className="flex flex-row items-center ">
            <img className="w-10 h-10 object-cover rounded-full ml-0 " src={profilePng} alt="User" />
            <span className="mx-2 text-md font-bold ">{review.name}</span>
            <ReactStars  {...options} />
            </div>
            <span className="mx-2 ml-12 text-sm font-thin ">{review.comment}</span>
        </div>
    )
}

export default ReviewCard
