import React from 'react'
import { Button } from './ui/button'
import PlusIcon from '@/icons/PlusIcon'

interface Props {
  // TODO: Define the component props
}

export const Sidebar: React.FC<Props> = ({ }) => {
  return (
    <div className='sidebar fixed top-20 left-0 w-64 bg-columnBackgroundColor h-full z-10'>
      <div className='px-4 py-2'>
        <div className='flex flex-col items-center justify-center h-14'>
          <div className='text-lg font-bold text-white'>All Boards (0)</div>
        </div>
        <Button className='w-full space-x-2'>
          <PlusIcon/>
        Add Board
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
