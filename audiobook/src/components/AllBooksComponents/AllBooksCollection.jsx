import React from "react";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import LoadingScreen from "../Utils/LoadingScreen";
import Collection from "../HomePageComponents/Collection";
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";


const API_BASE = "https://audioapi-euhq.vercel.app";

const AllBooksCollection = ({}) => {
    const [books, setBooks] = useState([]);
    const [loading, setIsLoading] = useState(true);

    const GetBooks = () => {
        fetch(API_BASE + "/books")
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                setIsLoading(false);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        GetBooks();
    }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

  const offset = currentPage * itemsPerPage;


    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
            <div>
                   <Collection contents={books.slice(offset, offset + itemsPerPage)} isLoading={loading} heading={"All Books"} progress={false} />

              <ReactPaginate
                className="react-paginate"
                        previousLabel={"⏮️ Previous"}
                        nextLabel={"Next ⏭️"}
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
        </>
    );
};

export default AllBooksCollection;
