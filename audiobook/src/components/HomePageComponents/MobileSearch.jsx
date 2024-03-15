import React from "react";
import { useState } from "react";
import SearchModal from "./SearchModal";
import { IoSearch } from "react-icons/io5";
import { CiMenuFries } from "react-icons/ci";
import MenuModal from "./MenuModal";

const MobileSearch = () => {
    const [searchmodal, setSearchmodal] = useState(false);
    const [query, setQuery] = useState("");
    const [menu, setMenu] = useState(false);

    const handleSearch = () => {
        setSearchmodal(true);
    };

    const handleBlur = () => {
        setTimeout(() => setSearchmodal(false), 250);
    };

    const handleOpenMenu = () => {
        setMenu((prev) => !prev);
    };

    return (
        <div className=" md:hidden text-black  dark:text-d-primary-400 bg-zinc-50 dark:bg-d-bg-100 pt-5 pb-3 px-5 ">
            <div className="flex w-full items-center">
                <div className="mr-3 -ml-2 font-bold cursor-pointer ">
                    <CiMenuFries
                        size={25}
                        scale={15}
                        onClick={handleOpenMenu}
                    />

                    {menu && <MenuModal setMenu={setMenu} menu={menu} />}
                </div>
                <input
                    type="text"
                    name="searchq"
                    id="searchq"
                    placeholder={`Search an Audiobook... `}
                    className="p-2 border-gray-300 border-[4px] w-full dark:bg-d-bg-200 rounded-xl border-r-0 rounded-r-none hifull"
                    onFocus={handleSearch}
                    onBlur={handleBlur}
                    value={query}
                    onChange={(e) => {
                        setQuery(() => e.target.value);
                    }}
                    autoComplete="off"

                    // turn off predictive search
                />
                <div className="p-3 pt-3 border-gray-300 border-[4px] border-l-0 dark:bg-d-bg-200 rounded-xl rounded-l-none -ml-0.5 h-full">
                    <IoSearch />
                </div>
            </div>
            {searchmodal && <SearchModal query={query} />}
        </div>
    );
};

export default MobileSearch;
