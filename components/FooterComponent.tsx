import React from 'react'
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import './styles/footer.css'
export default function FooterComponent() {
    return (
        <footer className='w-full bg-slate-700 h-fit mt-10'>
            <div className='mx-auto max-w-max text-center pt-5'>
                <div className='grid grid-cols-3 gap-5'>
                    <a
                        className='facebook social-icon'
                        href='https://www.facebook.com/sk.kimkuong/'
                        target='blink' >
                        <FaFacebook size={30} />
                    </a>
                    <a
                        className='ig social-icon'
                        href='https://www.instagram.com/sk.kimkuong/'
                        target='blink'>
                        <FaInstagramSquare size={30} />
                    </a>
                    <a className='gmail social-icon'>
                        <SiGmail color='white' size={30} />
                    </a>
                </div>
            </div>
            <div className='h-[1px] border-solid bg-gray-600 mt-5 mx-auto' />
            <div className='mx-auto max-w-max text-center py-2'>
                <p className='text-white'>
                    &copy; 2023 Your Company Name. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}
