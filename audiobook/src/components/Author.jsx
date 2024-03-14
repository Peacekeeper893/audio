import React from 'react'
import LoadingScreen from './Utils/LoadingScreen'
import Navbar from './Navbar'
import Footer from './HomePageComponents/Footer'
import { useParams } from 'react-router-dom'
import AuthorBook from './AllBooksComponents/AuthorBook'

const Author = ({ loggedIn, loading }) => {
    
    const { author_name } = useParams();
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
                <div className="min-h-screen flex flex-col">
                                  <Navbar loggedIn={loggedIn} home={true} />
                                  
                                  <AuthorBook author_name={author_name} />


                    <div className="flex-grow"></div>
                    <Footer />
                </div>
            )}
        </>
    )}
</>
  )
}

export default Author