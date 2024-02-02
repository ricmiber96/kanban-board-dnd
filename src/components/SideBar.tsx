import React, { useState } from 'react'
import DialogNewBoard from './DialogNewBoard'
import SwitchMode from './SwitchMode'
import { ArrowRight } from 'lucide-react'
import ArrowRightIcon from '@/icons/ArrowRightIcon'
import HideIcon from '@/icons/HideIcon'

interface Props {
  // TODO: Define the component props
}

export const Sidebar: React.FC<Props> = ({ }) => {
  const [isClose, setIsClose] = useState(false)

  return (
    <>
      <aside className={`${isClose ? '-translate-x-full' : 'w-64 h-full '} fixed inset-y-0 left-0 transform transition-transform ease-in-out duration-500  sidebar  top-20  bg-white dark:bg-columnBackgroundColor z-10`}>
        <div className='px-4 py-2'>
          <div className='flex flex-col items-center justify-center h-14 gap-4 mt-24'>
            <div className='text-lg font-bold text-gray-800  dark:text-white'>All Boards (0)</div>
            <DialogNewBoard/>
            <div className='flex flex-col fixed bottom-24 w-full'>
              <SwitchMode/>
              <button className='mr-8 h-10 flex flex-row items-center justify-center  rounded-r-2xl  text-black dark:text-white hover:bg-gray-400 hover:dark:bg-gray-700 p-6 gap-4' onClick={() => { setIsClose(!isClose) }}>
                <HideIcon />  Hide Sidebar
              </button>
            </div>
          </div>
        </div>
      </aside>
      {isClose && <div className='absolute bottom-4 -left-1 cursor-pointer ' onClick={() => { setIsClose(!isClose) }}>
        <button className='toggle-sidebar w-[70px] flex items-center justify-center p-4 rounded-md border-2 rounded-r-xl border-gray-800 border-lg bg-gray-200 dark:bg-purple-700 hover:dark:bg-purple-500'>
          <HideIcon />
        </button>
      </div>}
    </>
  )
}

export default Sidebar
