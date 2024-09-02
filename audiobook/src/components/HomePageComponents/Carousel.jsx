// Carousel.js
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {

    PlayCircleOutlineTwoTone

} from "@mui/icons-material";


const images = [
    {
        url: "https://cdn.magicawakened.com/app/uploads/2023/04/18143024/WBG_Mystical_Wallpapers_Hogwarts_16x9_03_LA-1200x900.png",
        name: "Harry Potter",
        link: "book/Harry%20Potter%20and%20the%20Philosopher's%20Stone",
    },
    {
        url: "https://images8.alphacoders.com/601/601329.jpg",
        name: "A song of Ice and Fire",
        link: "book/A%20Game%20of%20Thrones",
    },
    {
        url: "https://wallpapers.com/images/hd/girl-on-fire-the-hunger-games-x6sxdf7zd05tgr54.jpg",
        name: "The Hunger Games",
        link: "book/The%20Hunger%20Games",
    },
    {
        url: "https://images5.alphacoders.com/614/614690.jpg",
        name: "The Lord of the Rings",
        link: "book/The%20Lord%20of%20the%20Rings%20-%20Fellowship%20of%20the%20Ring",
    },
    {
        url: "https://streamcoimg-a.akamaihd.net/000/568/85/56885-Banner-L1-bd85dee1726fca0e75713ba0e84a75a1.jpg?resize=1440px:*&quality=85",
        name: "Normal People",
        link: "book/Normal%20People",
    }
];

const Carousel = ({ books }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500, // Adjust the speed (in milliseconds) to change images
        // centerMode: true,
    };

    return (
        <div className=" dark:bg-d-bg-100  w-[92%] bg-stone-300 rounded-md ">
            <Slider {...settings}>
                {images.map((book, index) => (

                    <div key={index} className="relative w-screen group rounded-md">
                        <img
                            src={book["url"]}
                            alt={`Slide ${index + 1}`}
                            className="w-screen md:h-[80vh] h-[32vh] object-fill hover:scale-[1.04] transition duration-1000 ease-in-out rounded-md"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t hover:scale-[1.04] transition duration-1000 ease-in-out from-black opacity-50 group-hover:opacity-20"></div>
                        
                        <p className="absolute bottom-5 left-2 p-4 text-[#ececec] text-3xl md:text-6xl group-hover:text-[4rem] font-bold font-sans transition-all duration-300 ease-in-out">
                            {book["name"]}
                        </p>
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 font-extralight -translate-y-1/2 text-zinc-200 text-8xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Link to={`/${book["link"]}`} key={index} className="relative w-screen group">
                            <PlayCircleOutlineTwoTone fontSize="" />
                        </Link>
                        </p>
                        </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
