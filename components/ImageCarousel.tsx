import React from "react";
import "./styles/image.css";
import { IoArrowForward } from "react-icons/io5";
import { useFetchById } from "@/hooks/useFetchById";
import { LoadingComponent } from "./LoadingComponent";
import Link from "next/link";

export default function ImageCarousel() {
  const randomNumber = Math.floor(Math.random() * 100);
  const { data, isLoaded } = useFetchById(randomNumber.toString());
  return (
    <div className="h-fit xl:h-[500px] bg-[#e3f1ff]  rounded-lg mt-5 xl:mx-0 mx-10">
      <div className="block xl:flex xl:relative">
        {!isLoaded ? (
          <img
            src={`food-images/${data?.imageName}.jpg`}
            alt="Cake"
            className="w-full object-contain rounded-lg con-image xl:h-[500px] xl:rounded-l-lg "
          />
        ) : (
          <div className="flex justify-center items-center h-full absolute">
            <LoadingComponent />
          </div>
        )}
        <div className="con-title flex flex-col justify-center mx-auto px-5 mt-5">
          <h1 className="text-start xl:text-5xl md:text-2xl sm:text-lg xl:mb-7 mb-3 font-bold ">
            Mighty Super Cheesecake
          </h1>
          <p className="text-start xl:text-2xl lg:text-xl md:text-lg text-md">
            Look no further for a creamy and ultra-smooth cheesecake recipe! No
            one can deny its simple decadence.
          </p>
        </div>
        <Link href={`/recipe/${data?.id}`}>
          <div className="xl:absolute xl:bottom-5 xl:right-5 cursor-pointer flex justify-end items-end mr-2 pb-5 lg:mt-5">
            <IoArrowForward className="text-2xl lg:text-4xl xl:text-5xl" />
          </div>
        </Link>
      </div>
    </div>
  );
}
