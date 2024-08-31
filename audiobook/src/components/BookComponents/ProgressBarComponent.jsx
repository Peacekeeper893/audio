

import React from 'react'
import { motion } from 'framer-motion';

const ProgressBarComponent = ({ now }) => {
    const fixedNow = now.toFixed(2)
    return (
        <div className="w-full h-4 bg-gray-200 dark:bg-gray-500  overflow-hidden text-center mb-0.5 sticky top-0">
            <motion.div 
                className="h-full bg-green-300 dark:bg-d-primary-300 text-sm rounded-lg" 
                style={{ width: `${now}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${now}%` }}
                transition={{ duration: 1 }}
            >
                <p className='relative bottom-[2.2px] dark:text-white font-semibold px-2'>{fixedNow}%</p>
            </motion.div>
        </div>
    )
}

export default ProgressBarComponent