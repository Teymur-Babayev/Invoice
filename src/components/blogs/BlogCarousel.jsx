import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { BlogCard } from "../CardBlog";

const BlogCarousel = ({ array, isPopular }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(null); // Estado para almacenar el intervalo
  const [maxScroll, setmaxScroll] = useState(0);

  const CarouselRef = useRef(null);
  const ContentRef = useRef(null);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Función para actualizar el ancho de la pantalla cuando cambie el tamaño de la ventana
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // Agregar un event listener para el evento de cambio de tamaño de la ventana
    window.addEventListener("resize", updateScreenWidth);

    // Limpia el event listener cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  useEffect(() => {
    const CarouselElement = CarouselRef.current;
    const ContentElement = ContentRef.current;

    if (CarouselElement && ContentElement) {
      const divWidth = CarouselElement.getBoundingClientRect().width;
      const contentWidth = ContentElement.getBoundingClientRect().width;

      // Calcular el ancho máximo basado en el contenido y el div
      setmaxScroll(-(contentWidth - divWidth));
    }
  }, [screenWidth]);

  const startScroll = (direction) => {
    if (scrollInterval !== null) {
      clearInterval(scrollInterval); // Detener el intervalo anterior si existe
    }

    const scrollAmount = 15; // Ajusta la cantidad de desplazamiento según tus necesidades

    setScrollInterval(
      setInterval(() => {
        if (
          (direction === "left" && scrollPosition < 0) || // Evitar desplazarse más allá del inicio
          (direction === "right" && scrollPosition > maxScroll) // Evitar desplazarse más allá del tope
        ) {
          setScrollPosition((prevPosition) => {
            const newPosition =
              direction === "left"
                ? prevPosition + scrollAmount
                : prevPosition - scrollAmount;

            // Ajustar la posición si se supera el tope o el inicio
            if (newPosition > 0) {
              return 0;
            } else if (newPosition < maxScroll) {
              return maxScroll;
            }

            return newPosition;
          });
        }
      }, 100)
    );
  };

  const stopScroll = () => {
    if (scrollInterval !== null) {
      clearInterval(scrollInterval); // Detener el intervalo actual si existe
      setScrollInterval(null); // Establecer el intervalo en null para indicar que no hay ninguno en curso
    }
  };

  useEffect(() => {
    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      if (scrollInterval !== null) {
        clearInterval(scrollInterval);
      }
    };
  }, []);

  return (
    <div
      ref={CarouselRef}
      className="w-full relative  h-fit  px-[3%] py-2"
    >
      {!screenWidth < 750 && (
        <div className="h-full w-fit absolute flex justify-center items-center -left-[4%] lg:-left-[3%] z-10 top-0  p-4">
          <div className="w-fit h-fit flex shadow-md justify-center items-center   bg-white rounded-full">
            <ChevronLeft
              className=" text-black hidden sm:flex  cursor-pointer w-10 h-10 "
              onMouseEnter={() => startScroll("left")}
              onMouseLeave={stopScroll}
            />
          </div>
        </div>
      )}

      <div
        className="w-[95%] relative overflow-auto sm:overflow-hidden flex h-full transition-all"
      >
        <div 
        ref={ContentRef}
        className="w-fit flex transition-all"
        style={{ transform: `translateX(${scrollPosition}px)` }}
        
        >
          {/* CARD BLOG */}
          <AnimatePresence>
            {array.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      {!screenWidth < 750 && (
        <div className="h-full w-fit absolute flex z-10 justify-center items-center -right-[1%] lg:right-[1%] top-0  p-4">
          <div className="w-fit h-fit flex shadow-md justify-center items-center   bg-white rounded-full">
            <ChevronRight
              className=" text-black hidden sm:flex  cursor-pointer w-10 h-10 "
              onMouseEnter={() => startScroll("right")}
              onMouseLeave={stopScroll}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCarousel;
