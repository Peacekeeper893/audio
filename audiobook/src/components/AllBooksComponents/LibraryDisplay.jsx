import React from "react";
import Shelf from "../ProfileComponents/Shelf";
import Recent from "../ProfileComponents/Recent";
import LibraryBookmarks from "./LibraryBookmarks";
import { LibraryHistory } from "./LibraryHistory";
const LibraryDisplay = ({ selected }) => {
    return (
        <div className="py-5 lg:pl-10 px-3 min-h-[50vh]">
            {selected === "Shelf" && <Shelf />}
            {selected === "Recents" && <Recent size={5} />}
            {selected === "Bookmarks" && <LibraryBookmarks />}
            {selected === "History" && <LibraryHistory/>}
        </div>
    );
};

export default LibraryDisplay;
