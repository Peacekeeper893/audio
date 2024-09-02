import { getAuth } from "firebase/auth";
import { IoLogOut } from "react-icons/io5";
// import { Link } from "react-router-dom";
import NovelSounds from "../Utils/NovelSounds";
import logo from "../../data/logo.png"

// const Menu = ({ setMenu, menu }) => {

//     const auth = getAuth();
//     const user = auth.currentUser;

//     useEffect(() => {
//         if (menu) {
//             // scroll to the top
//             window.scrollTo(0, 0);
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "unset";
//         }

//         // Clean up function
//         return () => {
//             document.body.style.overflow = "unset";
//         };
//     }, [menu]);

//     return (
//         <div className="flex justify-start">
//             <div
//                 className={`md:w-72 w-56 md:top-0 top-[10vh] absolute z-20 left-0 h-[90vh] md:h-full transition-transform duration-1000 ease-in-out bg-d-bg-200 text-white overflow-auto ${
//                     menu ? "translate-x-0" : "-translate-x-full "
//                 }`}
//             >
//                 <button
//                     className="p-4 pt-6  text-white   right-0 absolute text-2xl"
//                     onClick={() => setMenu(false)}
//                 >
//                     <IoCloseSharp />
//                 </button>

//                 <div className="md:text-2xl flex items-center py-4 pl-0  text-lg font-bold font-eczar">{<img src={logo} alt="" height={50} width={45} className="mr-3" /> }Hi {user.displayName}  👋</div>
//                 <div className="border"></div>
//                 <Link to="/" className="block p-4 hover:bg-d-primary-500 border-b-[1px]">
//                     Home
//                 </Link>
//                 <Link to="/library" className="block p-4 hover:bg-d-primary-500 border-b-[1px]">
//                     Library
//                 </Link>
//                 <Link to="/books" className="block p-4 hover:bg-d-primary-500 border-b-[1px]">
//                     Explore
//                 </Link>
//                 <Link to="/profile" className="block p-4 hover:bg-d-primary-500 border-b-[1px]">
//                     Profile
//                 </Link>

//                 <button
//                     className="p-4  text-white bottom-0   right-0 absolute text-2xl"
//                     onClick={() => setMenu(false)}
//                 >
//                     <div className="flex items-center   gap-2 ">
//                         <span className="font-eczar text-sm self-auto pt-[3px]">Not {user.displayName.split(" ")[0]}?</span>
//                     <span className="py-1  text-xl font-eczar"> Logout </span>
//                     <span>    <IoLogOut /></span>
//                     </div>

//                 </button>
//             </div>

//             <div
//                 className=" bg-stone-600 opacity-50  h-full absolute md:top-0 top-[10vh] md:left-72 left-56 z-20 md:w-[calc(100vw-288px)] w-[calc(100vw-224px)]  "
//                 onClick={() => setMenu(false)}
//             ></div>
//         </div>
//     );
// };

// export default Menu;

import React, { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MenuModal = ({ menu, setMenu }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (menu) {
            // scroll to the top
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            });

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
            <AnimatePresence>
                {menu && (
                    <motion.div key="menu">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: menu ? "0%" : "-100%" }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", stiffness: 110 }}
                            className={`md:w-72 w-56 top-0 h-[101vh] absolute z-40 left-0 md:h-full bg-slate-100 dark:bg-d-bg-200 dark:text-white overflow-auto shadow-xl rounded-r-lg text-xl`}
                        >
                            <button
                                className="md:p-4 p-2 md:top-0.5 top-5  text-red-500  right-0 absolute text-2xl"
                                onClick={() => setMenu(false)}
                            >
                                <IoCloseSharp />
                            </button>

                            {/* <div className="md:text-2xl flex items-center py-4 pl-4 text-lg font-bold font-eczar">
                                Hi {user.displayName} 👋
                            </div> */}

                            <div className="md:text-2xl flex items-center py-4 pl-4  text-lg font-bold font-eczar">
                               
                                Hi {user.displayName}👋
                            </div>
                            <div className="border"></div>
                            <Link
                                to="/"
                                className="block p-4 hover:bg-d-primary-500 border-b-[1px]"
                            >
                                Home
                            </Link>

                            <Link
                                to="/library"
                                className="block p-4 hover:bg-d-primary-500 border-b-[1px]"
                            >
                                Library
                            </Link>

                            <Link
                                to="/books"
                                className="block p-4 hover:bg-d-primary-500 border-b-[1px]"
                            >
                                Explore
                            </Link>
                            <Link
                                to="/profile"
                                className="block p-4 hover:bg-d-primary-500 border-b-[1px]"
                            >
                                Profile
                            </Link>

                            <button
                                className="p-4  dark:text-white bottom-0   right-0 absolute text-2xl"
                                onClick={() => setMenu(false)}
                            >
                                <div className="flex items-center   gap-2 ">
                                    <span className="font-eczar text-sm self-auto pt-[3px]">
                                        Not {user.displayName.split(" ")[0]}?
                                    </span>
                                    <span className="py-1  text-xl font-eczar">
                                        Logout
                                    </span>
                                    <span>
                                        <IoLogOut />
                                    </span>
                                </div>
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: menu ? 0.4 : 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 20,
                            }}
                            className="bg-stone-700 md:h-full h-[101vh] absolute top-0  md:left-72 left-56 z-20 md:w-[calc(100vw-288px)] w-[calc(100vw-220px)]"
                            onClick={() => setMenu(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MenuModal;
