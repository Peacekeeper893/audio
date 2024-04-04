import React from "react";
import { useState, useEffect } from "react";
import AllBooksCollection from "../AllBooksComponents/AllBooksCollection";
import FilterBar from "./FilterBar";
import { auth } from './../../firebase';

const API_BASE = "https://audioapi-euhq.vercel.app";

const Explore = ({genreParam , authorParam}) => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [bookLoading, setBookLoading] = useState(true);
    const [loading, setIsLoading] = useState(true);
    const [options, setOptions] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState();

    // console.log("Genre Param: ", genreParam);
    // console.log("Author Param: ", authorParam);

    const GetBooks = () => {
        fetch(API_BASE + "/books")
            .then((res) => res.json())
            .then((data) => {
                let opt = [];
                let authorsList = [];
                data.forEach((book) => {
                    book.genres.forEach((genre) => {
                        if (!opt.includes(genre)) {
                            opt.push(genre);
                        }
                    });

                    if(!authorsList.includes(book.author)){
                        authorsList.push(book.author);
                    }
                });
                setBooks(data);
                setFilteredBooks(data);
                setOptions(opt);
                setAuthors(authorsList);
                setBookLoading(false);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        GetBooks();
    }, []);

    const onFilterChange = (filters) => {
        setIsLoading(true);
        console.log("Filters changed");
        console.log(filters);

        if (filters.length === 0) {
            setFilteredBooks(books);
            setIsLoading(false);
        } else {
            const filteredBooksResult = books.filter((book) =>
                filters.every((filter) => book.genres.includes(filter))
            );

            setFilteredBooks(filteredBooksResult);
            setIsLoading(false);
            console.log(filteredBooksResult);
        }
    };

    const onAuthorChange = (chosenAuthor) => {
        setIsLoading(true);
        console.log("Author changed");
        console.log(chosenAuthor);

        if (chosenAuthor === null) {
            setFilteredBooks(books);
            setIsLoading(false);
        } else {
            const filteredBooksbyAuthor = books.filter((book) =>
            chosenAuthor === book.author
            );

            // console.log(filteredBooksbyAuthor , chosenAuthor ,books);

            setFilteredBooks(filteredBooksbyAuthor);
            setIsLoading(false);
        }

    }



    return (
        <div className="min-h-[100vw] flex">
            <div className="flex-[25%] md:pt-[5vh] md:pl-6 ">
                <FilterBar
                    bookLoading={bookLoading}
                    loading={loading && bookLoading}
                    options={options}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    onFilterChange={onFilterChange}
                    authors={authors}
                    selectedAuthor={selectedAuthor}
                    setSelectedAuthor={setSelectedAuthor}
                    onAuthorChange={onAuthorChange}
                    genreParam={genreParam}
                    authorParam={authorParam}
                />
            </div>
            <div className="flex-[75%]">
                <AllBooksCollection loading={loading && bookLoading} books={filteredBooks} selectedFilters={selectedFilters} />
            </div>
        </div>
    );
};

export default Explore;
