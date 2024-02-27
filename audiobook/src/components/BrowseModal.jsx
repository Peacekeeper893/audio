import React from 'react'

const BrowseModal = () => {
  return (
    <div className='absolute h-fit w-44 min-h-[5rem] opacity-[0.99] rounded-lg bg-white text-cyan-500 font-semibold left-24 top-[20vh] p-4 grid gap-4 underline dark:bg-d-bg-200 dark:text-d-primary-500 z-20 transition duration-500 ease-in'>
      <div><a href="#hp">Harry Potter</a></div>
      <div><a href="#asoif">Game of Thrones</a></div>
      <div><a href="#hunger-games">Hunger Games</a></div>
    </div>
  )
}

export default BrowseModal