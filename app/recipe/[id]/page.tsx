'use client'
import { LoadingComponent } from '@/components/LoadingComponent'
import { DataModel } from '@/models/DataModel'
import { LoadDataService } from '@/services/LoadDataService'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const { id } = useParams()
    const loadDataService = new LoadDataService
    const [data, setData] = useState<DataModel[] | null>()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoaded(true)
                const res = await loadDataService.loadCSVById(id.toString());
                setData(res)
                setIsLoaded(false)
                console.log(res)
                console.log(id)
            } catch (error) {
                console.log('Error:', error);
                setIsLoaded(false)
            }
        };
        fetchData();
    }, []);

    if (isLoaded) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingComponent />
            </div>)
    }

    return (
        <div>
            <h1 className='text-black'>
                {data?.map((d) => (
                    <>{d.title}</>
                ))}
            </h1>
        </div>
    )
}
