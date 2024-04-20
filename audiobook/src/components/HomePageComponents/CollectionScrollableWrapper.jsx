import React from 'react'
import { Fragment } from 'react'
import ScrollCollection from '../Utils/ScrollCollection'


const CollectionScrollableWrapper = ({isLoading , heading , displayBooks , numbering}) => {
  return (
    <div className="bg-zinc-50 dark:bg-d-bg-100 dark:text-white  w-full max-w-full md:px-5 md:py-3 p-2">
    {isLoading === true ? (
        <div className="flex flex-wrap   p-4 gap-6 md:gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="lg:h-[533px] lg:w-[250px] w-[140px] h-[315px] md:h[425] md:w-[200] lg:mx-5 md:mx-2 mx-1"
                >
                    <div className="h-[75%]  bg-gray-200 dark:bg-d-bg-200 rounded-xl"></div>
                </div>
            ))}
        </div>
    ) : (
        <Fragment>
            <div className="flex ">
                <div className="md:text-4xl text-3xl font-semibold pointer-events-none p-4 dark:text-d-bg-600 font-eczar">
                    {heading}
                </div>

                <div className="hidden md:block bg-stone-300 rounded-full h-5 w-5 text-center mt-2 cursor-pointer dark:text-black text-sm">
                    ?
                </div>

                </div>
                
                <ScrollCollection mostPopularBooks={displayBooks} numbering={numbering} />


        </Fragment>
    )}
</div>
  )
}

export default CollectionScrollableWrapper