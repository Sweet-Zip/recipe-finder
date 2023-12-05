import React from 'react'
import { IoArrowForward } from "react-icons/io5";
export default function ImageCarousel() {
    return (
        <div className='h-[500px] bg-[#e3f1ff]  rounded-lg mt-5'>
            <div className='flex relative'>
                <img
                    src="https://img.taste.com.au/hbNtzI2Q/taste/2021/08/clinkers-cake-173208-2.jpg"
                    alt="Cake"
                    className='h-[500px] object-contain rounded-l-lg' />
                <div className='flex flex-col justify-center mx-auto px-10'>
                    <h1 className='text-start text-5xl mb-7 font-bold'>
                        Mighty Super Cheesecake
                    </h1>
                    <p className='text-start text-2xl'>
                        Look no further for a creamy and ultra-smooth cheesecake recipe! No one can deny its simple decadence.
                    </p>

                </div>
                <div className="absolute bottom-5 right-5 cursor-pointer">
                    <IoArrowForward size={40} />
                </div>
            </div>
        </div>
    )
}
