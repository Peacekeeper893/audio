import React from 'react'
import logo from '../../data/logo.png'
import { Link } from 'react-router-dom'

const NovelSounds = () => {
  return (
    <Link to={"/"}>
      <div className='flex md:gap-4 gap-1'>
          
          <p className="md:text-4xl text-2xl self-center font-semibold font-eczar pt-1">NovelSounds</p>
      </div>
      </Link>
  )
}

export default NovelSounds