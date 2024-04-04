import React from 'react'

const Button = ({ handleTask, desc, color }) => {
  
  console.log(color)
  return (
    <div className="my-2 md:w-[80%] w-full ">
    <button
        className={` ${color !== undefined ? `bg-[${color}]` : "bg-d-bg-300"} font-eczar  font-semibold py-2 rounded border-2 px-8 w-full dark:text-white dark:bg-d-bg-300 `}
        onClick={handleTask}
    >
        {desc}
    </button>
</div>
  )
}

export default Button