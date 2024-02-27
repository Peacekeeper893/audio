import React from 'react'
import logo from '../../data/logo.png'

const NovelSounds = () => {
  return (
      <div className='flex md:gap-4 gap-1'>
          <img src={logo} alt="" height={100} width={75} />
          <p className="md:text-5xl text-2xl self-center font-eczar pt-1">NovelSounds</p>
    </div>
  )
}

export default NovelSounds