import React from 'react'
import Navbar from './Navbar'
import LoadingScreen from './Utils/LoadingScreen'
import Footer from './HomePageComponents/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AllBooksCollection from './AllBooksComponents/AllBooksCollection'

const AllBooks = ({ loggedIn, loading }) => {
  
  const navigate = useNavigate();

  useEffect(() => {
      if (!loggedIn) {
          const redirectTimeout = setTimeout(() => {
              navigate("/");
          }, 3000);

          return () => {
              clearTimeout(redirectTimeout);
          };
      }
  }, [loggedIn, navigate]);
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

                    <AllBooksCollection />

                    <div className="flex-grow"></div>
                    <Footer />
                </div>
            )}
        </>
    )}
</>
  )
}

export default AllBooks