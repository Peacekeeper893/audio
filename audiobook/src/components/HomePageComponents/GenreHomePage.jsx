import React from "react";
import {useEffect , useState} from "react";

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
                <div className=" text-4xl font-semibold pointer-events-none p-4 dark:text-d-bg-600 font-eczar md:mb-2">
                    Browse Audiobooks By Category
                </div>

                <div className="flex flex-wrap p-4 gap-3 md:gap-3">

                    { loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div className="w-[32%] bg-gray-400 text-center py-4"></div>
                        ))
                    ) : (
                        popularGenres.map((genre , index) => (
                            <div className={`md:w-[32%] w-[29%] ${gradients[index]} dark:${darkgradients[index]} text-center font-semibold font-mono hover:scale-[1.015] cursor-pointer duration-300 py-4 md:text-xl`}>{genre}</div>
                        ))
                    )}

 




                </div>



            </div>
        </div>
    );
};

export default GenreHomePage;
