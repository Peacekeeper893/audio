import React from 'react'

const ShortcutDisplay = ({book}) => {
  return (
    <div className='text-cyan-400 dark:text-d-primary-400 dark:hover:text-d-primary-500 hover:underline font-semibold '>{book["name"]}</div>
  )
}

export default ShortcutDisplay