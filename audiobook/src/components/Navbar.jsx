import React, { Fragment, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import NovelSounds from "./Utils/NovelSounds";
import BrowseModal from "./BrowseModal";
import { Link } from "react-router-dom";
import Switcher from "../Switcher";
// import Login from "./Login";

import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { IoLogOutOutline } from "react-icons/io5";

// import {CgProfile} from "react-icons/cg"

const Navbar = ({ loggedIn }) => {
    const [browse, setBrowse] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    let displayName = "User";

    if (user !== null) {
        displayName = user.displayName;
    }

    // console.log(displayName)

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
            <div className="  md:h-[14vh] min-h-[11vh] flex justify-between md:px-7 dark:bg-d-bg-100 dark:text-white pl-2 pr-1">
                <div className="self-center md:text-4xl">
                    <NovelSounds />
                </div>

                <div className="flex md:gap-8 gap-3">
                    <div className="self-center ">
                        <Switcher />
                    </div>
                    {!loggedIn && (
                        <div className="self-center text-md md:text-lg dark:bg-d-bg-300 md:px-5 md:py-2 px-3 py-2 rounded-xl hover:scale-105 bg-d-bg-500 text-white">
                            <Link to={"/login"}>Login</Link>
                        </div>
                    )}
                    {loggedIn && (
                        <div className="self-center text-4xl hover:cursor-pointer">
                            <IoLogOutOutline onClick={handleLogout} />
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-slate-900 w-full text-white flex justify-between gap-6 py-2 dark:bg-d-bg-400">
                <div className="md:ml-12 ml-6 flex justify-start gap-4">
                    <span className="hover:underline">
                        <Link to={"/"}>Home</Link>
                    </span>

                    <div className=" flex " onClick={handleFocus}>
                        <span className="hover:text-blue-400  ">Browse</span>

                        {browse && <BrowseModal />}
                        <span className="p-1">
                            <MdExpandMore />
                        </span>
                    </div>
                </div>

                <div>
                    {loggedIn && (
                        <p className="px-4 font-eczar md:text-lg">
                            Hi {displayName}
                        </p>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default Navbar;
