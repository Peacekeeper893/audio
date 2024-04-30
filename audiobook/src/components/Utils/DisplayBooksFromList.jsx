import React from 'react'
import { useState, useEffect } from 'react'
import CollectionScrollableWrapper from '../HomePageComponents/CollectionScrollableWrapper';

const API_BASE = "https://audioapi-euhq.vercel.app";

const DisplayBooksFromList = ({ contents , fetching }) => {
    
    const [items, setItems] = useState([])
    console.log(contents , fetching);

    useEffect(() => {

        const fetchBooks = () => {
            const fetchPromises = [];
            contents.forEach((bookName) => {
                const fetchPromise = fetch(API_BASE + "/book/" + bookName)
                    .then((res) => res.json())
                    .then((res) => res[0])
                    .catch((err) => console.error(err));
                fetchPromises.push(fetchPromise);
            });

            Promise.all(fetchPromises)
                .then((newItems) => {
                    setItems(newItems);
                })
                .catch((err) => console.error(err));  
        };
        
        fetchBooks();

    }, [contents])

  return (
      <div>
            <CollectionScrollableWrapper isLoading={fetching} heading="Recommendations for you" displayBooks={items} numbering={true} />
    </div>
  )
}

export default DisplayBooksFromList