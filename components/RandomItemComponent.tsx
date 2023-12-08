'use client'
import { DataModel } from '@/models/DataModel';
import { LoadDataService } from '@/services/LoadDataService';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

export default function RandomItemComponent() {
    const [loaded, setLoaded] = useState(false);
    const [items, setItems] = useState<DataModel[]>([]);

    const loadDataService = new LoadDataService();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoaded(true);
                const data = await loadDataService.loadCSV();
                const randomItems = data.sort(() => 0.5 - Math.random()).slice(0, 3);
                setItems(randomItems);
            } catch (error) {
                console.log('Error:', error);
            } finally {
                setLoaded(false);
            }
        };

        fetchData();
    }, []);

    if (loaded) {
        return (
            <div className='grid grid-cols-3 gap-5 mt-5'>
                <div className=' justify-center items-center mx-auto'>
                    <l-ripples size="150" speed="2" color="#314361" />
                </div>
                <div className=' justify-center items-center mx-auto'>
                    <l-ripples size="150" speed="2" color="#314361" />
                </div>
                <div className=' justify-center items-center mx-auto'>
                    <l-ripples size="150" speed="2" color="#314361" />
                </div>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-3 gap-5 mt-5">
            {items.map((item) => (
                <div key={item.title}>
                    <Link href={`/recipe/${item.id}`} className='item'>
                        <img
                            className="item-image h-[300px] w-[500px] object-cover rounded-md"
                            src={`food-images/${item.imageName}.jpg`}
                            alt={item.title}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "images/image-not-found.jpg";
                            }}
                        />
                        <p className="text-2xl font-bold mt-2">{item.title}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}

