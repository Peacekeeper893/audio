import React, { Fragment } from "react";
import { motion } from "framer-motion";
// import { slideIn } from "../motion";
// import { SectionWrapper } from "../hoc";

const Modal = ({ openModalHandler, closeModalHandler, book }) => {


    let burl;

    if (window.innerWidth > 1024) {
        burl = book[0]["bookimg"];
    } else{
        burl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ8NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrOi4uFx8/OD8tNygtLisBCgoKDQ0NDg0NDysZHxkrKysrKy0rKzcrKysrLS0rKysrKzcrLSsrKysrKysrKysrLSsrKysrKysrKysrKysrK//AABEIALEBHAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBAUH/8QAGBABAQEBAQAAAAAAAAAAAAAAABEBEgL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APiMCoIoQioIKmBUOEECLgiwTBFQQgmCLghBEEXBCCIIuCEEQRcKEEQRcKEEg4IkRIUQEDgAgYAgYAgYAgZAAAg0hxfJ8txqIh8r5PlYRnyI15PkixlyOWvI5IRlyfLTk+VhGXI5a8jkgy5HLXk+SEY8jltyXJCMuS5bclyQjGFuNd8luEIy3CjSFuJERCi4IQRBFQQgiCLgiREQRcEIIgioIQTBFQQgiBUESDq5Plpnk+XSNxnyfLTk+Vgz5PlpyIsVnyOWsEIRnyOWkHJCM+Ry0ghCM+Ry1ghBlyOWkEIMt8luNYW4QY7hbjXcTuERluJjXcTuEGcEXChBEEXBEiREEXChCIgi4IQiIIuCEIiFFwQhEQo0hRIR3w4qHG42iHFQ4sEwRUEBMEVDgJgioICYIqAEwRUAIgiiBO4ncXqdURqdxep0EbhbitIiIgiiSCYIoEEwRUEIJhRQIJgioIQTBFQQiIgioIkHfDhhpogYAgYAAGBAwBAwBEYAkq0tBOp1Wp0E6nV6nQSStSBEolCBgCAAhAwBAwgQMAQhgHcDAoAAAAwIHABHDggEIcEAoSoICNwtXE7gI1OtNxO4DPSjTcTARCi4IDOCLhQEQRUEUSSoICQcAERgCBgCAAO8GEADhwCghw4gUEVDgJgi4cBEEXBARCjSCAziY2hcgxhb5bb5TyDHko25LkGXKeW/Jcgx5KNuS5BjyW425LfKjGFGu+U75BnCjSFAZwKhRRIOACAAPRgiocZEw8xUOAmHmKhwEw4vMOIqIcXDgIgi4cBnBGkEQZwuWsKKjLkuW0LkGXJctuS5BjyOW3Jcgx5LltyXIMN8lvlvvlO+QYb5Tvl0b5TvlRz75Tvl0b5RvkGO4ncbb5TvlRlExruJ3AQS9woo9OHmLhxhUZh5i4eYCcw8xUPMQTDiocBMOHDgJhw4cBMEVBATBFQQEQRcKAmFFwQEQo0ggM4UaQoIz5LfLWFAY75TvltuFvlRhvlO+W++U75Bz75TvlvvlO+VHPvlO+W++U75BhuFGu+S5UenDiocYVMOHmHAKCKggFDMIEYMCBkABgCBgCBgCAMCIwBQQwCYIoAiFFwtxRnuJ3y1hbgjHfKd8ttxO+QYb5TvlvvlO+VGG+U8t98p5Ud0OGGFKGAAAMCMAAAAAAAAAAAAAAAAAAAAAAAEYAgZAUKKAIhbiyijPcLfLSFuCMt8ly1hQGwARTGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAEAALQFCIAR//2Q==";
    }

    const containerStyle = {
        backgroundImage: `url(${burl})`,
        opacity: 0.9, // Increase the opacity to make the background darker
        filter: "contrast(1.2) saturate(90%) brightness(25%)", // Decrease the brightness and adjust the contrast to make the text more visible
      };
    const mainstyle = {
        opacity: 1,
        filter: "contrast(1.0) saturate(100%) brightness(100%)",
    };

    const variants = {
        hidden: { x: '-100%' }, // Offscreen to the left
        visible: { x: 0 },      // Slide in from the left to the center
      };
    
      // Define the transition settings
      const transition = {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      };
    // console.log(backdrop)



    return (
        <Fragment>
            <div
                className={`max-w-full bg-black h-screen   w-full -z-40 text-white absolute top-0 bg-cover bg-center shadow-slate-950 shadow-2xl bg-no-repeat `}
                style={containerStyle}
            >
                <button
                    className="text-white float-right p-4 font-bold font-serif"
                    onClick={closeModalHandler}
                >
                    X
                </button>
            </div>



            <motion.div

                initial="hidden"
                animate="visible"
                variants={variants}
                transition={transition}
                
                className="block lg:h-[60%] md:bottom-[40vh] md:w-[40%] md:left-[30%] absolute lg:bottom-20 h-[50%] bottom-[30vh] left-[20%] right-[20%] w-[60%] lg:w-[20%] lg:left-[4%]"
            >
                <img
                    src={book[0]["bookimg"]}
                    className="h-[100%] bottom-12 md:bottom-3  absolute left-[3%]  w-[110%]  md:left-[4%]"
                    alt={book[0]["bookname"]}
                    style={mainstyle}
                />

            </motion.div>
        </Fragment>
    );
};

export default Modal;
