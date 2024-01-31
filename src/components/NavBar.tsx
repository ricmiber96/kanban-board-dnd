import React from 'react'
import { Button } from './ui/button'
import PlusIcon from '@/icons/PlusIcon'
import MoreIcon from '@/icons/MoreIcon'
import LogoIcon from '@/icons/LogIcon'

interface Props {
  // TODO: Define the component props
}

export const Navbar: React.FC<Props> = () => {
  return (
    <header className='flex flex-row w-full h-[90px] max-h-[90px] min-h-[90px] bg-columnBackgroundColor items-center gap-4 p-8 fixed'>
      <div className='flex flex-row w-full items-center gap-10'>
        <LogoIcon/>
        <h2 className='text-white font-bold text-3xl'>Kanban Dev</h2>
        <h3 className='text-white font-bold ml-10 text-xl'>Board</h3>
      </div>
      <div className='flex items-center justify-items-end justify-end gap-4'>
        <Button className='gap-2'>
          <PlusIcon/>
          Add Column
        </Button>
        <Button variant="secondary" className='gap-2'>
          <MoreIcon/>
          More Options
        </Button>
      </div>
    </header>
  )
}

export default Navbar
