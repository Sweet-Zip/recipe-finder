import { useRef, useEffect } from "react";
import gsap from "gsap";

const useMagnetoButton = () => {
  const magnetoRef = useRef<HTMLButtonElement>(null);
  const magnetoTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const magneto = magnetoRef.current;
    const magnetoText = magnetoTextRef.current;

    const activateMagneto = (event: MouseEvent) => {
      if (magneto && magnetoText) {
        const boundBox = magneto.getBoundingClientRect();
        const magnetoStrength = 50;
        const menetoTextStrength = 80;
        const newX =
          (event.clientX - boundBox.left) / magneto.offsetWidth - 0.5;
        const newY =
          (event.clientY - boundBox.top) / magneto.offsetHeight - 0.5;

        gsap.to(magneto, {
          duration: 1,
          x: newX * magnetoStrength,
          y: newY * magnetoStrength,
          ease: "Power4.easeOut",
        });

        gsap.to(magnetoText, {
          duration: 1,
          x: newX * menetoTextStrength,
          y: newY * menetoTextStrength,
          ease: "Power4.easeOut",
        });
      }
    };

    const resetMagneto = () => {
      if (magneto && magnetoText) {
        gsap.to(magneto, {
          duration: 1,
          x: 0,
          y: 0,
          ease: "Elastic.easeOut",
        });

        gsap.to(magnetoText, {
          duration: 1,
          x: 0,
          y: 0,
          ease: "Elastic.easeOut",
        });
      }
    };

    const handleButtonClick = () => {
      if (magneto) {
        const overlay = magneto.querySelector(".overlay");
        if (overlay) {
          overlay.classList.toggle("active");
        }
      }
    };

    if (magneto) {
      magneto.addEventListener("mousemove", activateMagneto);
      magneto.addEventListener("mouseleave", resetMagneto);
      magneto.addEventListener("click", handleButtonClick);
    }

    return () => {
      if (magneto) {
        magneto.removeEventListener("mousemove", activateMagneto);
        magneto.removeEventListener("mouseleave", resetMagneto);
        magneto.removeEventListener("click", handleButtonClick);
      }
    };
  }, []);
  return { magnetoRef, magnetoTextRef };
};

export default useMagnetoButton;
