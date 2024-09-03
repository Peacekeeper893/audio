import React from 'react'
import cover from '../../data/cover2.png'
import Footer from './../HomePageComponents/Footer';
import {Services} from './Services';

const Body = () => {
  return (
      <div className='min-h-screen bg-d-bg-100'>
          
          <div>
              <img src={cover} alt="" />
      </div>
      <Services/>
      <Footer/>
          
    </div>
  )
}

export default Body