"use client";
import React, { useRef, useEffect } from "react";

import "./styles.css";
import useMagnetoButton from "@/hooks/useMagnetoButton";

const MagnetoButton: React.FC = () => {
  const { magnetoRef, magnetoTextRef } = useMagnetoButton();

  return (
    <div className="container">
      <a href="https://youtu.be/Ea3Mgpfgaiw?t=21">
        <button className="magneto" ref={magnetoRef}>
          <span className="overlay"></span>
          <span className="" ref={magnetoTextRef}>
            Click Me
          </span>
        </button>
      </a>
    </div>
  );
};

export default MagnetoButton;
