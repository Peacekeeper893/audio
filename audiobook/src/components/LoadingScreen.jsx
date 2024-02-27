import React from 'react'

const LoadingScreen = () => {
    return (
        <div className='flex justify-center items-center h-screen dark:bg-d-bg-200'>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
  )
}

export default LoadingScreen