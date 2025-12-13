import React, { useState, useEffect } from "react";

const BackToTopButton: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [borderPosition, setBorderPosition] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowButton(true);

      setBorderPosition((window.scrollY - 100) * 2);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${
        showButton ? "opacity-100" : "opacity-0"
      } fixed z-40 left-10 bottom-2 border-4 p-2 rounded-full  border-[white] bg-[#00BC96] h-[40px] text-[#191D3B] w-[40px]`}
      style={{
        transform: `translateX(-50%) translateY(-50%) rotate(${borderPosition}deg)`,
      }}
      onClick={scrollToTop}
    >
      ▲
    </button>
  );
};

export default BackToTopButton;
