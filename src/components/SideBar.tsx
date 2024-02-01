import React from 'react'
import DialogNewBoard from './DialogNewBoard'
import SwitchMode from './SwitchMode'

interface Props {
  // TODO: Define the component props
}

export const Sidebar: React.FC<Props> = ({ }) => {
  return (
    <div className='sidebar fixed top-20 left-0 w-64 bg-white dark:bg-columnBackgroundColor h-full z-10'>
      <div className='px-4 py-2'>
        <div className='flex flex-col items-center justify-center h-14 gap-4 mt-8'>
          <div className='text-lg font-bold text-gray-800  dark:text-white'>All Boards (0)</div>
          <DialogNewBoard/>
          <SwitchMode/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
