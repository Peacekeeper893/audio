import React, { Fragment, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import NovelSounds from "./Utils/NovelSounds";
import BrowseModal from "./HomePageComponents/BrowseModal";
import { Link } from "react-router-dom";
import Switcher from "../Switcher";
import SearchModal from "./HomePageComponents/SearchModal";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { IoLogOutOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import MenuModal from "./HomePageComponents/MenuModal";
import { createPortal } from "react-dom";

const Navbar = ({ loggedIn, home }) => {
    const [browse, setBrowse] = useState(false);
    const [searchmodal, setSearchmodal] = useState(false);
    const [query, setQuery] = useState("");
    const [menu, setMenu] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const handleSearch = () => {
        setSearchmodal(true);
    };

    const handleBlur = () => {
        setTimeout(() => setSearchmodal(false), 250);
    };

    const handleOpenMenu = () => {
        setMenu((prev) => !prev);
    };

    let displayName = "User";

    if (user !== null) {
        displayName = user.displayName;
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate("/");
                console.log("Signed out successfully");
            })
            .catch((error) => {
                // An error happened.
            });
    };

    const handleFocus = () => {
        console.log(browse);
        setBrowse((prev) => !prev);
    };
    return (
        <Fragment>
            <div className="hidden md:flex  md:h-[14vh] min-h-[10vh]  justify-between md:px-7 dark:bg-d-bg-100 dark:text-white pl-2 pr-1 py-3 items-center">
                <div className="mr-0  md:text-3xl flex items-center gap-6">
                    <RiMenu3Fill
                        onClick={handleOpenMenu}
                        className="cursor-pointer hover:animate-pulse logo_animate"
                    />

                    {menu && <MenuModal setMenu={setMenu} menu={menu} />}
                    <NovelSounds />
                </div>
                <div className={`transition-all duration-300 ${searchmodal ? 'w-[60%]' : 'w-[40%]'} w-[50%] text-black  dark:text-d-primary-400   `}>
                            <div className="flex">
                                <input
                                    type="search"
                                    name="searchq"
                                    id="searchq"
                                    placeholder="Search for an Audiobook..."
                            className={`px-4 py-2 border-gray-300 dark:border-gray-700 ${searchmodal ? 'border-[3px] ' : 'border-[1.5px]'} w-full dark:bg-d-bg-200 rounded-lg h-full`}
                                    onFocus={handleSearch}
                                    onBlur={handleBlur}
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(() => e.target.value);
                                    }}
                                />
                                <FaSearch className="-left-6 relative top-[0.8rem]" />
                            </div>

                            {searchmodal && <SearchModal query={query} />}
                </div>

                <div className="flex md:gap-8 gap-5 items-center">
                    <div className=" " title="Switch Theme">
                        <Switcher />
                    </div>
                    {loggedIn && (
                        <div
                            className=" text-md font-semibold md:text-lg dark:bg-d-bg-300 px-4 py-2  rounded-full hover:scale-105 bg-d-bg-500 text-white dark:text-d-primary-400"
                            title={`Hello ${displayName}`}
                        >
                            <Link to={"/profile"}>
                                {displayName.substring(0, 1)}
                            </Link>
                        </div>
                    )}
                    {!loggedIn && (
                        <div className="self-center text-md md:text-lg dark:bg-d-bg-300 md:px-5 md:py-2 px-3 py-2 rounded-xl hover:scale-105 bg-d-bg-500 text-white">
                            <Link to={"/login"}>Login</Link>
                        </div>
                    )}
                    {/* {loggedIn && (
                        <div
                            className="self-center text-4xl hover:cursor-pointer"
                            title="Logout"
                        >
                            <IoLogOutOutline onClick={handleLogout} />
                        </div>
                    )} */}
                </div>
            </div>

            {/* Second Action Bar */}

            {
            /* {home && (
                <>
                    <div className="bg-slate-600 w-full text-white justify-between gap-6 py-[0.6rem] dark:bg-d-bg-300 items-center hidden md:flex">
                        <div className="md:ml-8 ml-6 flex justify-start content-center items-center gap-6 text-lg">
                            <div className="mr-4">
                                <RiMenu3Fill
                                    onClick={handleOpenMenu}
                                    className="cursor-pointer  hover:animate-pulse"
                                />

                                {menu && (

                                    
                                    <MenuModal setMenu={setMenu} menu={menu} />
                                )}
                            </div>
                            <span className="hover:underline">
                                <Link to={"/library"}>Library</Link>
                            </span>
                            <span className="hover:underline">
                                <Link to={"/books"}>Explore</Link>
                            </span>

                            <div className=" flex " onClick={handleFocus}>
                                <span className="hover:text-blue-400  ">
                                    Browse
                                </span>

                                {browse && <BrowseModal />}
                                <span className="p-1">
                                    <MdExpandMore />
                                </span>
                            </div>
                        </div>

                        <div className=" w-[30%] text-black  dark:text-d-primary-400 px-4  ">
                            <div className="flex">
                                <input
                                    type="search"
                                    name="searchq"
                                    id="searchq"
                                    placeholder="Search for an Audiobook..."
                                    className="px-4 py-1 border-gray-300 border-[3px] w-full dark:bg-d-bg-200 rounded-lg"
                                    onFocus={handleSearch}
                                    onBlur={handleBlur}
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(() => e.target.value);
                                    }}
                                />
                                <FaSearch className="-left-6 relative top-[0.6rem]" />
                            </div>

                            {searchmodal && <SearchModal query={query} />}
                        </div>
                    </div>
                    <div className=" border-b-[0.5px] dark:border-d-primary-500"></div>
                </>
            )} */
            }
        </Fragment>
    );
};

export default Navbar;
