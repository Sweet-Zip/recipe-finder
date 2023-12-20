"use client";
import ImageCarousel from "@/components/ImageCarousel";
import { FaSearch } from "react-icons/fa";
import "@/components/styles/image.css";
import RandomItemComponent from "@/components/RandomItemComponent";

export default function Home() {
  return (
    <main className="max-w-7xl justify-center items-center mx-auto ">
      <ImageCarousel />
      <div className="con-search h-[50px] bg-slate-200 flex justify-center items-center mt-5 rounded-lg xl:mx-0 mx-10">
        <FaSearch size={24} color="grey" className="mx-5" />
        <input
          className="w-full h-full outline-none bg-transparent"
          type="text"
          placeholder="input your incredient you have"
        />
      </div>
      <section className="xl:mx-0 mx-10">
        <h1 className="xl:text-3xl my-10 font-bold md:text-2xl text-xl">
          Recommendation
        </h1>
        <RandomItemComponent />
      </section>
    </main>
  );
}
