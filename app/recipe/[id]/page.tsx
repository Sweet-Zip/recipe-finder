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
    const sentences = instructions ? splitIntoSentences(instructions) : [];
    const ingredients = data?.ingredients;
    const incre = ingredients ? ingredients.map(ingredient => ingredient.split("''")) : [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoaded(true);
                const res = await loadDataService.loadCSVById(id);
                if (res) {
                    setData(res);
                    setIsLoaded(false);
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

    if (isLoaded) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <LoadingComponent />
            </div>)
    }

    return (
        <div className='max-w-7xl justify-center mx-auto'>
            <div className='flex'>
                <div>
                    <img
                        className="w-[90%] object-contain rounded-lg"
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
                    <p className='text-lg font-bold mt-10'>Instruction</p>
                    <ul className='list-disc mt-3 ml-5'>
                        {sentences.map((i, index) => (
                            <li key={index} className='my-3'>
                                <p>{i}</p>
                            </li>

                        ))}
                    </ul>
                </div>
                <div className='w-[30%] mx-5'>
                    <h1 className='text-black text-2xl font-bold'>Incredients</h1>
                    <ul className='list-disc'>
                        {incre.map((i, index) => (
                            <li key={index} className='my-3'>
                                <p>{i}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function splitIntoSentences(text: string): string[] {
    const continuationKeywords = ['(', 'and', 'but', 'meanwhile', 'however', 'moreover', 'therefore', 'thus', 'nonetheless'];
    const sentenceEndPattern = /(?<=[.!?])\s+/;

    const sentenceArray = text.split(sentenceEndPattern);
    const joinedSentences = [];

    let currentSentence = '';

    for (let i = 0; i < sentenceArray.length; i++) {
        const sentence = sentenceArray[i].trim();

        if (sentence.endsWith('(')) {
            currentSentence = sentence;
        } else if (currentSentence) {
            currentSentence += ' ' + sentence;
            if (sentence.endsWith('.)')) { // Modified condition to handle the specific pattern
                joinedSentences.push(currentSentence);
                currentSentence = '';
            }
        } else {
            joinedSentences.push(sentence);
        }
    }

    return joinedSentences;
}
