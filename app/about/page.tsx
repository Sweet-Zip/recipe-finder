"use client";
import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
export default function page() {
  const targetRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isVisible, setIsVisible] = useState<Array<boolean>>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      targetRefs.current.forEach((ref, index) => {
        if (ref) {
          const elementPosition = ref.getBoundingClientRect().top;

          if (elementPosition - windowHeight <= 0) {
            setIsVisible((prevState) => {
              const updatedState = [...prevState];
              updatedState[index] = true;
              return updatedState;
            });
          }
        }
      });
    };

    handleScroll(); // Call handleScroll initially to check visibility on page load

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsVisible(Array(targetRefs.current.length).fill(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="px-5 lg:px-0">
        <div className="flex items-center">
          <h1 className="text-start font-bold text-2xl mb-10">About</h1>
        </div>
        <div className="flex-grow border-solid bg-gray-700 h-[1px]" />
        <h1 className="text-4xl font-bold my-10">
          We're a group of foodies who love cooking and the internet
        </h1>
        <img
          ref={(el) => (targetRefs.current[0] = el)}
          src="images/about-img1.webp"
          alt="About Image 1"
          className={`jump ${isVisible[0] ? "show" : ""}`}
        />
        <p className="my-5 text-lg">
          Food qualities braise chicken cuts bowl through slices butternut
          snack. Tender meat juicy dinners. One-pot low heat plenty of time
          adobo fat raw soften fruit. sweet renders bone-in marrow richness
          kitchen, fricassee basted pork shoulder. Delicious butternut squash
          hunk.
        </p>
        <div className="my-10 block gap-5 lg:flex">
          <div
            ref={(el) => (targetRefs.current[1] = el)}
            className={`slide-in-left ${isVisible[1] ? "show" : ""}`}
          >
            <h1 className="text-4xl font-bold mb-5">
              Simple, Easy Recipes for all
            </h1>
            <p className="text-lg">
              Juicy meatballs brisket baked shoulder. Juicy smoker soy sauce
              burgers brisket. polenta mustard hunk greens. Wine technique snack
              skewers chuck excess. Oil heat slowly. slices natural delicious,
              set aside magic tbsp skillet, bay leaves brown centerpiece.
            </p>
          </div>
          <img
            src="images/about-img2.ashx"
            alt=""
            ref={(el) => (targetRefs.current[2] = el)}
            className={`object-cover w-full lg:w-[50%] slide-in-right ${
              isVisible[2] ? "show" : ""
            }`}
          />
        </div>
        <h1 className="text-4xl font-bold mt-10 mb-5">Our Developer</h1>
        <div className="flex gap-10 justify-center items-center">
          <div
            ref={(el) => (targetRefs.current[3] = el)}
            className={`target-element ${isVisible[3] ? "show" : ""}`}
          >
            <a href="https://github.com/Sweet-Zip">
              <img
                src="https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"
                alt=""
                className="dev-pf"
              />
            </a>
            <p className="mt-3 text">Sreng Kuong</p>
          </div>
          <div
            ref={(el) => (targetRefs.current[4] = el)}
            className={`target-element ${isVisible[4] ? "show" : ""}`}
          >
            <a>
              <img
                src="https://media.wired.co.uk/photos/607d91994d40fbb952b6ad64/4:3/w_2664,h_1998,c_limit/wired-meme-nft-brian.jpg"
                alt=""
                className="dev-pf"
              />
            </a>
            <p className="mt-5">Net Vannara</p>
          </div>
        </div>
      </div>
    </div>
  );
}
