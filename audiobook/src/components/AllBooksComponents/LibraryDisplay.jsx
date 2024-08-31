import React from "react";
import Shelf from "../ProfileComponents/Shelf";
import Recent from "../ProfileComponents/Recent";
import LibraryBookmarks from "./LibraryBookmarks";
import { LibraryHistory } from "./LibraryHistory";
const LibraryDisplay = ({ selected }) => {
    return (
        <div className="md:py-5 lg:pl-10 md:px-3 md:min-h-[50vh] py-3 ">
            {selected === "Shelf" && <Shelf />}
            {selected === "Recents" && <Recent size={5} />}
            {selected === "Bookmarks" && <LibraryBookmarks />}
            {selected === "History" && <LibraryHistory/>}
        </div>
    );
};

export default LibraryDisplay;
