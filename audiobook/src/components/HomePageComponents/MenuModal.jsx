import React, { useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { getAuth } from "firebase/auth";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import NovelSounds from "../Utils/NovelSounds";
import logo from "../../data/logo.png"


const Menu = ({ setMenu, menu }) => {

    const auth = getAuth();
    const user = auth.currentUser;


    useEffect(() => {
        if (menu) {
            // scroll to the top
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        // Clean up function
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [menu]);

    return (
        <div className="flex justify-start">
            <div
                className={`md:w-72 w-56 md:top-0 top-[10vh] absolute z-20 left-0 h-[90vh] md:h-full transition-transform duration-1000 ease-in-out bg-d-bg-200 text-white overflow-auto ${
                    menu ? "translate-x-0" : "-translate-x-full "
                }`}
            >
                <button
                    className="p-4 pt-6  text-white   right-0 absolute text-2xl"
                    onClick={() => setMenu(false)}
                >
                    <IoCloseSharp />
                </button>

                <div className="md:text-2xl flex items-center py-4 pl-0  text-lg font-bold font-eczar">{<img src={logo} alt="" height={50} width={45} className="mr-3" /> }Hi {user.displayName}  👋</div>
                <div className="border"></div>
                <Link to="/" className="block p-4 hover:bg-d-primary-500 border-b-[1px]">
                    Home
                </Link>
                <Link to="/library" className="block p-4 hover:bg-d-primary-500 border-b-[1px]">
                    Library
                </Link>
                <Link to="/books" className="block p-4 hover:bg-d-primary-500 border-b-[1px]">
                    Explore
                </Link>
                <Link to="/profile" className="block p-4 hover:bg-d-primary-500 border-b-[1px]">
                    Profile
                </Link>


                <button
                    className="p-4  text-white bottom-0   right-0 absolute text-2xl"
                    onClick={() => setMenu(false)}
                >
                    <div className="flex items-center   gap-2 ">
                        <span className="font-eczar text-sm self-auto pt-[3px]">Not {user.displayName.split(" ")[0]}?</span>
                    <span className="py-1  text-xl font-eczar"> Logout </span>
                    <span>    <IoLogOut /></span>
                    </div>

                </button>
            </div>

            <div
                className=" bg-stone-600 opacity-50  h-full absolute md:top-0 top-[10vh] md:left-72 left-56 z-20 md:w-[calc(100vw-288px)] w-[calc(100vw-224px)]  "
                onClick={() => setMenu(false)}
            ></div>
        </div>
    );
};

export default Menu;
