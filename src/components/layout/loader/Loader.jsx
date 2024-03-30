import React from 'react'

const Loader = () => {
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
            <span className="flex h-1/4 w-3">
                <span className="animate-ping absolute  inline-flex h-6 w-6 rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
        </div>
    )
}

export default Loader;
