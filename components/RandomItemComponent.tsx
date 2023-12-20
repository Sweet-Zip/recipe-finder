"use client";
import { DataModel } from "@/models/DataModel";
import { LoadDataService } from "@/services/LoadDataService";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingComponent } from "./LoadingComponent";

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
        console.log("Error:", error);
      } finally {
        setLoaded(false);
      }
    };

    fetchData();
  }, []);

  if (loaded) {
    return (
      <div className="grid grid-cols-3 gap-5 mt-5">
        <div className="flex justify-center items-center">
          <span className="flex justify-center items-center">
            <LoadingComponent />
          </span>
        </div>
        <div className="flex justify-center items-center">
          <span className="flex justify-center items-center">
            <LoadingComponent />
          </span>
        </div>
        <div className="flex justify-center items-center">
          <span className="flex justify-center items-center">
            <LoadingComponent />
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 gap-5 mt-5 ">
      {items.map((item) => (
        <div key={item.title}>
          <Link href={`/recipe/${item.id}`} className="item">
            <img
              className="item-image xl:h-[300px] xl:w-[500px] object-cover rounded-md md:h-[200px] md:w-[333px] xs:h-[150px] xs:w-[250px] h-[75px] w-[125px]"
              src={`food-images/${item.imageName}.jpg`}
              alt={item.title}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "images/image-not-found.jpg";
              }}
            />
            <p className="xl:text-xl lg:text-lg md:text-sm text-xs font-bold mt-2 line-clamp-2">
              {item.title}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
