import React from "react";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import LoadingScreen from "../Utils/LoadingScreen";
import Collection from "../HomePageComponents/Collection";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";

const API_BASE = "https://audioapi-euhq.vercel.app";

const AllBooksCollection = ({books , loading , selectedFilters}) => {


    let heading = "All Books"

    if (selectedFilters.length > 0) {

        heading = " Showing Titles in  : "

        selectedFilters.forEach((filter, index) => {
            heading += filter
            if (index !== selectedFilters.length - 1) {
                heading += " + "
            }
        })
    }

    // console.log("AllBooksCollection: ", books);



    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const offset = currentPage * itemsPerPage;

    return (
        <div className="min-h-[150vh] pt-[5vh]">
            {loading ? (
                <LoadingScreen />
            ) : (
                <div className="w-[75vw]">
                    <Collection
                        contents={books.slice(offset, offset + itemsPerPage)}
                        isLoading={loading}
                        heading={heading}
                        progress={false}
                        isHome={false}
                    />

                    <ReactPaginate
                        className="react-paginate mt-[15vh] "
                        previousLabel={"<- Previous"}
                        nextLabel={"Next ->"}
                        pageCount={Math.ceil(books.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
                </div>
            )}
        </div>
    );
};

export default AllBooksCollection;
