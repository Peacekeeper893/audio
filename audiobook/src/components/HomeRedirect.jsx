import React, { Fragment } from 'react'
import Home from './Home'
import Welcome from './Welcome'
import LoadingScreen from './Utils/LoadingScreen'

const HomeRedirect = ({loggedIn,loading}) => {
  return (
    
      <Fragment>
          
          {
              loading ? (<div><LoadingScreen /></div>) : (!loggedIn ? (<Welcome {...{loggedIn}} />) : (<Home loggedIn={loggedIn} />))
          }

    </Fragment>
  )
}

export default HomeRedirect