import React from 'react';

import { motion } from "framer-motion";

const BookDisplayScrollable = ({ name, author, bookimg, numbering, idx }) => {

    return (
        <div>
            
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                onTap={{ scale: 0.95 }}
                className="hidden md:block lg:h-[78vh] lg:w-[280px] w-[140px] h-[315px] md:h-[425px] md:w-[200px] my-3 hover:shadow-lg  shadow-slate-900 dark:shadow-d-bg-400 hover:px-3 group p-4 rounded-xl"
            >
                <div className="h-[80%] mb-4 relative">
                {numbering && (
                        <div className="absolute bottom-1 right-1  p-2 bg-black  font-bold text-2xl rounded-md text-[#FFD700]">
                            {idx+1}
                        </div>
                    )}
                    <img
                        src={bookimg}
                        alt="img"
                        className="object-fill w-full h-full "
                    />
                </div>
                <div className="h-[20%] flex flex-col hover:gap-1">
                    <p className=" flex-[40%] overflow-clip  hover:overflow-visible overflow-ellipsis whitespace-nowrap  hover:whitespace-normal lg:text-lg md:text-md text-md  font-semibold hover:text-cyan-400 dark:hover:text-d-primary-500">
                        {name}
                    </p>
                    <p className="flex-[60%]  text-sm dark:text-d-bg-600">{author}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default BookDisplayScrollable;
