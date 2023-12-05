'use client'
import { LoadingComponent } from '@/components/LoadingComponent'
import { DataModel } from '@/models/DataModel'
import { LoadDataService } from '@/services/LoadDataService'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const { id } = useParams()
    const loadDataService = new LoadDataService
    const [data, setData] = useState<DataModel>()
    const [isLoaded, setIsLoaded] = useState(false)
    const instructions = data?.instructions;
    const sentences = instructions ? instructions.split('. ') : [];
    const ingredients = data?.ingredients;
    const incre = ingredients ? ingredients.map(ingredient => ingredient.split(', ')) : [];
    useEffect(() => {
        console.log(data?.ingredients)
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoaded(true);
                const res = await loadDataService.loadCSVById(id);
                if (res) {
                    setData(res);
                    setIsLoaded(false);
                    console.log(res);
                    console.log(id);
                } else {
                    console.log('Item not found');
                }
            } catch (error) {
                console.log('Error:', error);
                setIsLoaded(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data?.imageName)
    })

    if (isLoaded) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingComponent />
            </div>)
    }

    return (
        <div className='max-w-7xl justify-center mx-auto'>
            <img
                className="w-full object-contain rounded-md justify-center mx-auto"
                src={`/food-images/${data?.imageName}.jpg`}
                alt={data?.title}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/images/image-not-found.jpg"
                }}
            />
            <h1 className='text-black text-2xl font-bold'>
                {data?.title}
            </h1>

            <ul className='list-disc'>
                {incre.map((i, index) => (
                    <li key={index} className='my-3'>
                        <p>{i}</p>
                    </li>
                ))}
            </ul>
            <p>{data?.ingredients}</p>
            <ul className='list-disc mt-10'>
                {sentences.map((i, index) => (
                    <li key={index} className='my-3'>
                        <p>{i}</p>
                    </li>

                ))}
            </ul>

        </div>
    )
}
