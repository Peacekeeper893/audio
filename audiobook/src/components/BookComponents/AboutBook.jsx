import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
// import ePub from 'epubjs';
// import { Link } from "react-router-dom";

// import hp3test from '../../data/hp3test.epub'
const API_BASE = "https://audioapi-euhq.vercel.app";

const AboutBook = ({ about, bookName , bookTag }) => {
  
  const [similar, setsimilar] = useState([]);

  useEffect(() => {
    fetchSimilar();
  }, []);

  const fetchSimilar = () => {

    fetch(API_BASE + "/books/" + bookTag)
      .then((res) => res.json())
      .then((data) => {
        setsimilar(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }
    
  

  

  

  return (

    <Fragment>
    <div className=' md:px-12 md:py-12 min-h-[40vh] dark:bg-d-bg-200 dark:text-white text-justify px-6 py-6'>
      {about}
      </div>
      
      <div className="text-2xl font-semibold font-serif text-center mb-5">Similar Books</div>
      <div className="flex overflow-x-auto gap-8 px-8">
        {similar.map((book) => {
          return (
            <div className="flex flex-col items-center gap-2 mb-5 flex-shrink-0">
               {/* <Link to={`/book/${book.name}`} > */}
              <div className="h-120 w-80 flex-[85%] justify-center overflow-hidden rounded-lg cursor-pointer"  onClick={() => window.location.href = `/book/${book.name}`}>
                <img
                  src={book.bookimg}
                  alt="book cover"
                  className="w-full h-full"
                />
              </div>
               {/* </Link> */}
              <div className="text-left font-semibold text-lg flex-[15%]">{book.name}</div>
              </div>
          );
        })}
      </div>



      </Fragment>
  )
}

// fetch details of book from google books api


export default AboutBook