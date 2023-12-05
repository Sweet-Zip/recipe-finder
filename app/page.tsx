'use client'
import ImageCarousel from "@/components/ImageCarousel";
import { FaSearch } from "react-icons/fa";

import { useEffect, useState } from "react";
import { DataModel } from "@/models/DataModel";
import { LoadDataService } from "@/services/LoadDataService";



export default function Home() {
  const [data, setData] = useState<DataModel[]>([])
  const [image, setImage] = useState<string[]>([])
  const loadDataService = new LoadDataService

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await loadDataService.loadCSV();
        setData(res)
      } catch (error) {
        console.log('Error:', error);
      }
    }; fetchData()
  }, []);

  const items = [
    {
      title: 'Chesses Cake',
      src: 'https://www.allrecipes.com/thmb/sonioQduCuYhKFzfBGuarKOTPno=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/17410_BestNo-BakeCheesecake_4x3_CD_556161-4x3-74185af73481413986a2d5ff3eec071b.jpg',
    },
    {
      title: 'Simple Chesses Cake',
      src: 'https://hips.hearstapps.com/hmg-prod/images/classic-cheesecake-index-642c57b4450c9.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
    },
    {
      title: "F&W's Ultimate Burger Recipes",
      src: 'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
    },
  ];

  return (
    <main className="max-w-7xl justify-center items-center mx-auto">
      <ImageCarousel />
      <div className="h-[50px] bg-slate-200 flex justify-center items-center mt-5 rounded-lg">
        <FaSearch size={24} color='grey' className="mx-5" />
        <input
          className="w-full h-full outline-none bg-transparent"
          type="text"
          placeholder="input your incredient you have" />
      </div>
      <section>
        <h1 className="text-3xl mt-5 font-bold">
          Super Delicious
        </h1>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {items.map((item) => (
            <div key={item.title}>
              <img
                className="h-[300px] w-[500px] object-cover rounded-md"
                src={item.src}
                alt={item.title}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "images/image-not-found.jpg"
                }}
              />
              <p className="text-2xl font-bold mt-2">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
