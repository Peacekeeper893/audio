import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingScreen from './Utils/LoadingScreen';
import AllBooksCollection from './AllBooksComponents/AllBooksCollection';
import Navbar from './Navbar';

const API_BASE = "https://audioapi-euhq.vercel.app";



const GenreBooks = ({loggedIn , loading}) => {

  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [bookLoading, setBookLoading] = useState(true);
  
  const GetBooks = () => {
    fetch(API_BASE + "/books")
      .then((res) => res.json())
      .then((data) => {

        let genreBooks = data.filter((book) => {
          return book.genres.includes(genre.charAt(0).toUpperCase() + genre.slice(1));
        });

        setBooks(genreBooks);
      }).then(() => {
        setBookLoading(false);
        console.log("Books retrieved" , books);

      })
};

useEffect(() => {
    GetBooks();
}, []);
    return (
      
      <>
      {loading ? (
          <LoadingScreen />
      ) : (
          <>
              {!loggedIn ? (
                  <div className="flex items-center justify-center h-screen flex-col">
                      <h1 className="text-4xl font-bold text-red-500">
                          You are not logged in
                      </h1>
                      <br></br>
                      <h1 className="text-4xl font-bold text-red-500">
                          Redirecting to home page...
                      </h1>
                  </div>
              ) : (
                  
                  <>
                  
                <Navbar loggedIn={loggedIn} home={true} />
                  
                <AllBooksCollection loading={loading && bookLoading} books={books} selectedFilters={[genre]} />
                  </>

                  
              )}
          </>
      )}
  </>
  )
}

export default GenreBooks