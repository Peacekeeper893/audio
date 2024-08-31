import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GenreHomePage = ({ genres, isLoading }) => {
    
    const [loading, setLoading] = useState(true);
    const [popularGenres, setPopularGenres] = useState([])
    
    useEffect(() => {

        // find the most popular genres from genres list
        console.log(genres);
        let genreCount = {};
        genres.forEach(genre => {
            if (genreCount[genre]) {
                genreCount[genre] += 1;
            } else {
                genreCount[genre] = 1;
            }
        });

        let sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);

        setPopularGenres(sortedGenres.slice(0, 6));

        console.log(sortedGenres);


        if(!isLoading)
            setLoading(false);
    }, [genres, isLoading]);

    const gradients = [
        'bg-gradient-to-r from-teal-300 to-teal-500',
        'bg-gradient-to-r from-indigo-300 to-indigo-500',
        'bg-gradient-to-r from-purple-300 to-purple-500',
        'bg-gradient-to-r from-pink-300 to-pink-500',
        'bg-gradient-to-r from-red-300 to-red-500',
        'bg-gradient-to-r from-orange-300 to-orange-500'
    ];
    
    const darkgradients = [
        'dark:bg-gradient-to-r dark:from-blue-700 dark:to-blue-800',
        'dark:bg-gradient-to-r dark:from-green-700 dark:to-green-800',
        'dark:bg-gradient-to-r dark:from-yellow-700 dark:to-yellow-800',
        'dark:bg-gradient-to-r dark:from-red-700 dark:to-red-800',
        'dark:bg-gradient-to-r dark:from-indigo-700 dark:to-indigo-800',
        'dark:bg-gradient-to-r dark:from-pink-700 dark:to-pink-800'
      ];

    return (
        <div className="dark:text-white ">
            <div className=" bg-zinc-50 dark:bg-d-bg-100 dark:text-white  w-full max-w-full md:px-5 md:py-3 md:my-2 md:mb-8 p-2">
                <div className=" md:text-4xl text-3xl font-semibold pointer-events-none p-4 dark:text-d-bg-600 font-eczar md:mb-2">
                    Browse Audiobooks By Category
                </div>

                <div className="flex flex-wrap pl-4 py-4 gap-3 md:gap-4">

                    { loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div className="w-[33%] bg-gray-400 text-center py-4"></div>
                        ))
                    ) : (
                        popularGenres.map((genre , index) => (
                            <div className={`md:w-[32%] w-[30%] ${gradients[index]} dark:${darkgradients[index]} text-center font-semibold font-mono hover:scale-[1.015] cursor-pointer duration-300 md:py-4 py-3 md:text-xl`}>
                                <Link to={`/books/${genre}`}>
                                    {genre}
                                </Link>
                            </div>
                        ))
                    )}

 




                </div>



            </div>
        </div>
    );
};

export default GenreHomePage;
