import React from 'react'
import Shelf from './Shelf'
import Recent from './Recent'

const ProfileContent = () => {
  return (
      <div className='dark:text-white p-8'>
          
          {/* <h2 className='text-3xl font-semibold font-eczar'>Your Shelf</h2> */}
          <Shelf />
          <Recent />
          
    </div>
  )
}

export default ProfileContent