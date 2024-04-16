import React from "react";
import Shelf from "./Shelf";
import Recent from "./Recent";

import { useState, useEffect } from "react";
import { LibraryHistory } from "../AllBooksComponents/LibraryHistory";

const ProfileContent = () => {
    const [selected, setSelected] = useState("Shelf");
    return (
        <div className="dark:text-white md:p-3 mt-4">
            {/* <h2 className='text-3xl font-semibold font-eczar'>Your Shelf</h2> */}

            <div className="flex gap-12 md:flex-row flex-col">
                <div className="flex md:flex-col flex-[20%] sticky mt-12 top-12  h-[40vh] shadow-sm  md:justify-center gap-4 md:gap-8 font-semibold md:text-2xl text-lg px-4 ">
                    <div
                        className={`cursor-pointer ${
                            selected === "Shelf" && "font-bold underline"
                        }`}
                        onClick={() => {
                            setSelected("Shelf");
                        }}
                    >
                        Shelf
                    </div>
                    <div
                        className={`cursor-pointer ${
                            selected === "Recents" && "font-bold underline"
                        }`}
                        onClick={() => {
                            setSelected("Recents");
                        }}
                    >
                        Recents
                    </div>
                    <div
                        className={`cursor-pointer ${
                            selected === "History" && "font-bold underline"
                        }`}
                        onClick={() => {
                            setSelected("History");
                        }}
                    >
                        Listen History
                    </div>
                    <div
                        className={`cursor-pointer ${
                            selected === "Account" && "font-bold underline"
                        }`}
                        onClick={() => {
                            setSelected("Account");
                        }}
                    >
                        Account
                    </div>
                </div>
                <div className="flex flex-[78%] min-h-[90vh]">
                    {selected === "Shelf" && <Shelf />}
                    {selected === "Recents" && <Recent size={6} />}
                    {selected === "History" && (
              <div className="w-full">
                <div className="text-2xl px-4 my-12 font-eczar">Your Listen History</div>
                            <LibraryHistory />
                        </div>
                    )}
                </div>
            </div>
            {/* <Shelf />
          <Recent size={4} /> */}
        </div>
    );
};

export default ProfileContent;
