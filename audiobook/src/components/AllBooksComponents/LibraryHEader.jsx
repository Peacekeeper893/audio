import React from "react";
import { getAuth } from "firebase/auth";

const LibraryHEader = ({ selected, setSelected }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    let displayName = "User";
    let email = "User";

    if (user !== null) {
        displayName = user.displayName.split(" ")[0];
        email = user.email;
    }

    return (
        <div className="min-h-[20vh]">
            <div className="flex flex-col py-10 lg:px-20 pl-4 pr-1 gap-8 dark:text-white">
                <div className="">
                    <h1 className="lg:text-4xl text-3xl font-eczar ">
                        {displayName}'s Library
                    </h1>
                </div>

                <div className="flex lg:gap-10 gap-4 lg:text-2xl text-base font-semibold cursor-pointer items-center">
                    <div className={`${selected === "Shelf" && "border-b-2 border-d-primary-500 lg:text-4xl text-xl"}`}
                        onClick={() => {
                            setSelected("Shelf");
                        }}
                    >
                        Shelf
                    </div>
                    <div className={`${selected === "Recents" && "border-b-2 border-d-primary-500 lg:text-4xl text-xl"}`}
                        onClick={() => {
                            setSelected("Recents");
                        }}
                    >
                        Recents
                    </div>
                    <div className={`${selected === "Bookmarks" && "border-b-2 border-d-primary-500 lg:text-4xl text-xl"}`}
                        onClick={() => {
                            setSelected("Bookmarks");
                        }}
                    >
                        Bookmarks
                    </div>
                    <div className={`${selected === "History" && "border-b-2 border-d-primary-500 lg:text-4xl text-xl"}`}
                        onClick={() => {
                            setSelected("History");
                        }}
                    >
                        Listen History
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LibraryHEader;
