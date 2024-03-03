import React from 'react'

const Button = ({handleTask , desc}) => {
  return (
    <div className="my-2 w-[80%] ">
    <button
        className="bg-d-bg-300 font-eczar text-white font-semibold py-2  rounded  border-2 px-8  w-full"
        onClick={handleTask}
    >
        {desc}
    </button>
</div>
  )
}

export default Button